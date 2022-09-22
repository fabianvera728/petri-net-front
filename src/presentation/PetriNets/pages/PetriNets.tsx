import {createContext, useEffect, useState} from "react";
import {Navbar} from "../../shared/components/Navbar";
import {TabPanel, TabView} from "primereact/tabview";
import {PetriCard} from "../components/PetriCard";
import {DrawPetriModal} from "../components/DrawPetriModal";
import {PetriModalSimulation} from "../components/PetriModalSimulation";
import {PetriNetBuilderModal} from "../components/PetriNetBuilderModal/PetriNetBuilderModal";
import {useInjection} from "inversify-react";
import ListPetriNetsUseCase from "../../../application/usecases/ListPetriNetsUseCase";
import {PetriNet} from "../../../domain/models/PetriNet";
import {Button} from "primereact/button";
import {GeneratePetriNetGraph} from "../../../application/usecases/GeneratePetriNetGraph";

export const StepsFirePetriNetContext = createContext<any>({})


export const PetriNets = () => {
    const listPetriNet = useInjection<ListPetriNetsUseCase>(ListPetriNetsUseCase)
    const generatePetriNetGraph = useInjection<GeneratePetriNetGraph>(GeneratePetriNetGraph)

    const [modalCreatePetri, setModalCreatePetri] = useState(false)
    const [modalDrawPetri, setModalDrawPetri] = useState(false)
    const [modalPetriSimulation, setModalPetriSimulation] = useState(false)
    const [petriNetsSaved, setPetriNetsSaved] = useState<PetriNet[]>([])
    const [petriNetSelected, setPetriNetSelected] = useState<PetriNet | null>(null)
    const [history, setHistory] = useState<PetriNet[]>([])

    const showModalSimulation = (petriNetSelectedData: PetriNet) => {
        setHistory([petriNetSelectedData])
        setPetriNetSelected(petriNetSelectedData)
        setModalPetriSimulation(true)
    }

    const getPetriesData = () => {
        listPetriNet.execute().then(
            (petriNets) => {
                setPetriNetsSaved(petriNets)
            },
            (error) => {
                console.log("Error no se pudo resolver la promesa: ", error)
            }
        )
    }

    const updatePetriNetsAfterCreatePetriNet = () => {
        setModalCreatePetri(false)
        getPetriesData()
    }

    useEffect(() => {
        if (history.length === 0) {
            getPetriesData();
        }
        console.log("Ejecutando.......")
    }, [])

    return (
        <StepsFirePetriNetContext.Provider value={{history, setHistory}}>
            <div className="m-0 p-0">
                <Navbar onClick={() => setModalCreatePetri(true)} onClick1={() => setModalDrawPetri(true)}/>
                <div className="flex pt-6 flex-column align-items-center justify-center">
                    <Button label="Actualizar" onClick={getPetriesData}/>
                    <div style={{width: '60%'}}>
                        <TabView>
                            <TabPanel header="Recientes">
                                <div className="grid gap-3 mb-6">
                                    {
                                        petriNetsSaved.slice(0, 5).map((petriNet, index) =>
                                            <PetriCard key={`petri_card${index}`}
                                                       petriNet={petriNet}
                                                       graph={generatePetriNetGraph.execute(petriNet)}
                                                       showModalSimulation={showModalSimulation}/>
                                        )
                                    }
                                </div>
                            </TabPanel>
                            <TabPanel header="Disenos">
                                <div className="grid gap-3 mb-6">
                                    {
                                        petriNetsSaved.map((petriNetValue, index) =>
                                            <PetriCard key={`petri_card${index}`}
                                                       petriNet={petriNetValue}
                                                       graph={generatePetriNetGraph.execute(petriNetValue)}
                                                       showModalSimulation={showModalSimulation}/>
                                        )
                                    }
                                </div>
                            </TabPanel>
                        </TabView>
                    </div>
                </div>
                <div>
                    <PetriNetBuilderModal displayBasic={modalCreatePetri}
                                          setDisplayBasic={updatePetriNetsAfterCreatePetriNet}/>
                    <DrawPetriModal displayBasic={modalDrawPetri} setDisplayBasic={setModalDrawPetri}/>
                    {
                        petriNetSelected && modalPetriSimulation && history &&
                        <PetriModalSimulation petriNet={petriNetSelected} displayBasic={modalPetriSimulation}
                                              setDisplayBasic={setModalPetriSimulation}/>
                    }

                </div>
            </div>
        </StepsFirePetriNetContext.Provider>
    )
}