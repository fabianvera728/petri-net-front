import { Fragment, useEffect, useRef, useState} from "react";
import {PetriCard} from "../components/PetriCard";
import {DrawPetriModal} from "../components/DrawPetriModal";
import {PetriModalSimulation} from "../components/PetriModalSimulation";
import {PetriNetBuilderModal} from "../components/PetriNetBuilderModal/PetriNetBuilderModal";
import {useInjection} from "inversify-react";
import ListPetriNetsUseCase from "../../../application/usecases/ListPetriNetsUseCase";
import {PetriNet} from "../../../domain/models/PetriNet";
import {GeneratePetriNetGraph} from "../../../application/usecases/GeneratePetriNetGraph";
import './PetriNets.css'
import {Toast} from "primereact/toast";
import {PetriNetEventLogModal} from "../components/PetriNetEventLogModal";

const PetriNets = () => {
    const listPetriNet = useInjection<ListPetriNetsUseCase>(ListPetriNetsUseCase)
    const generatePetriNetGraph = useInjection<GeneratePetriNetGraph>(GeneratePetriNetGraph)
    const [modalCreatePetri, setModalCreatePetri] = useState(false)

    const [modalDrawPetri, setModalDrawPetri] = useState(false)
    const [modalPetriSimulation, setModalPetriSimulation] = useState(false)
    const [modalEventLog, setModalEventLog] = useState(false)
    const [petriNetsSaved, setPetriNetsSaved] = useState<PetriNet[]>([])
    const [petriNetSelected, setPetriNetSelected] = useState<PetriNet>()

    const showModalSimulation = (petriNetSelectedData: PetriNet) => {
        setPetriNetSelected({...petriNetSelectedData})
        setModalPetriSimulation(true)
    }
    const notification = useRef<any>(null);

    const getPetriesData = () => {
        listPetriNet.execute().then(
            (petriNets) => {
                notification.current.show([
                    {
                        severity: 'info',
                        summary: 'Petri Net',
                        detail: 'Redes de petri cargadas',
                        life: 3000
                    },
                ]);
                setPetriNetsSaved([...petriNets])
            },
            (error) => {
                notification.current.show([
                    {
                        severity: 'warn',
                        summary: 'Petri Net',
                        detail: 'No se pudieron cargar las redes de petri',
                        life: 3000
                    },
                ]);
            }
        )
    }

    const updatePetriNetsAfterCreatePetriNet = () => {
        setModalCreatePetri(false)
        getPetriesData()
    }


    useEffect(() => {
        if (petriNetsSaved.length === 0) {
            getPetriesData();
        }
    }, [])

    return (
        <Fragment>
            <div style={{backgroundColor: '#ffcdb21c'}} className="pb-6">
                <Toast ref={notification} position="bottom-right" className="overflow-hidden p-toast-message-icon"/>
                <div className="m-0 p-0">
                    <div className="flex pt-6 flex-column align-items-center justify-center pt-6">
                        {/*<div className="animation__emoji"
                             style={{position: "absolute", left: "1rem", zIndex: "1", rotate: "30deg"}}>
                            <img src="src/assets/emoji_sunglasses.svg"/>
                        </div>*/}
                        {/*<div style={{
                            position: "absolute",
                            bottom: "4rem",
                            zIndex: "1",
                            right: "3rem",
                            rotate: "30deg"
                        }}>
                            <img src="src/assets/stars.png"/>
                        </div>*/}
                        <div style={{width: '70%'}}>
                            {/*<*TabView panelContainerStyle={{}}
                                     style={{
                                         borderTopLeftRadius: '1rem',
                                         borderTopRightRadius: '1rem',
                                         backgroundColor: '#4361ee21'
                                     }} className="bg-white">
                                <TabPanel header="Petri Nets">*/}

                            <div className="grid gap-3 mb-6 petri-net-list__placecontent_center">
                                {
                                    petriNetsSaved.map((petriNet, index) =>
                                        <PetriCard key={`petri_card${index}`}
                                                   petriNet={{...petriNet}}
                                                   graph={generatePetriNetGraph.execute(petriNet)}
                                                   showModalSimulation={showModalSimulation}/>
                                    )
                                }
                            </div>
                            {/*</TabPanel>
                                <TabPanel header="Event logs">
                                    <Authors/>
                                </TabPanel>
                            </TabView>*/}
                        </div>
                    </div>
                    <div>
                        <PetriNetBuilderModal isVisible={modalCreatePetri}
                                              toggleModalState={updatePetriNetsAfterCreatePetriNet}/>
                        <DrawPetriModal isVisible={modalDrawPetri} toggleModalState={setModalDrawPetri}/>
                        <PetriNetEventLogModal isVisible={modalEventLog} toggleModalState={setModalEventLog}/>
                        {
                            petriNetSelected && modalPetriSimulation &&
                            <PetriModalSimulation petriNet={petriNetSelected} isVisible={modalPetriSimulation}
                                                  toggleModalState={setModalPetriSimulation}/>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default PetriNets;
