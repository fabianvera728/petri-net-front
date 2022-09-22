import {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {FooterPetriModalCreator} from "./FooterPetriModalCreator";
import {Dialog} from "primereact/dialog";
import {ScrollPanel} from "primereact/scrollpanel";
import {TabPanel, TabView} from "primereact/tabview";
import {Timeline} from "primereact/timeline";
import {Button} from "primereact/button";
import {MultiSelect, MultiSelectChangeParams} from "primereact/multiselect";
import {PetriNet} from "../../../domain/models/PetriNet";
import {Graphviz} from "graphviz-react";
import {useInjection} from "inversify-react";
import {GeneratePetriNetGraph} from "../../../application/usecases/GeneratePetriNetGraph";
import GetPetriNetTransitionsEnabled from "../../../application/usecases/GetPetriNetTransitionsEnabled";
import RunPetriNetTransitions from "../../../application/usecases/RunPetriNetTransitions";
import {Transition} from "../../../domain/models/Transition";
import {StepsFirePetriNetContext} from "../pages/PetriNets";

interface PetriModalProps {
    displayBasic: boolean
    setDisplayBasic: Dispatch<SetStateAction<boolean>>
    petriNet?: PetriNet
}

export const PetriModalSimulation = ({displayBasic, setDisplayBasic, petriNet}: PetriModalProps) => {
    const {history, setHistory} = useContext(StepsFirePetriNetContext)
/*
    const [petriNetStates, setPetriNetStates] = useState<PetriNet[]>([]);
*/
    const [transitionsEnabled, setTransitionsEnabled] = useState<Transition[]>([])
    const [transitionsSelected, setTransitionsSelected] = useState<string[]>([])

    const getPetriNetTransitionsEnabled = useInjection<GetPetriNetTransitionsEnabled>(GetPetriNetTransitionsEnabled)
    const runPetriNetTransitions = useInjection<RunPetriNetTransitions>(RunPetriNetTransitions)
    const generatePetriNetGraph = useInjection<GeneratePetriNetGraph>(GeneratePetriNetGraph)

    const onHide = () => {
/*
        setPetriNetStates([])
*/
        setHistory([])
        setDisplayBasic(false)
    }

    const onSave = () => {
        onHide()
    }

    const customizedContent = (pnetNet: PetriNet) => {
        return (
            <Graphviz className="bg-gray-50 border-round-2xl border-gray-500 p-2"
                      dot={generatePetriNetGraph.execute(pnetNet)}
                      options={{width: 400, height: 270, zoom: true, useWorker: false}}/>
        );
    };

    const getTransitionsEnabled = (petriNetValue: PetriNet) => {
        getPetriNetTransitionsEnabled.execute(petriNetValue).then(
            (transitions) => {
                setTransitionsEnabled(transitions)
            },
            (error) => {
                console.log("Error al traer los datos")
            }
        )
    }

    const fireNextTransition = () => {
        runPetriNetTransitions.execute({...history[history.length - 1]}, transitionsSelected[0]).then(
            (newPetriNetState) => {
                setHistory([...history, {...newPetriNetState}])
                getTransitionsEnabled(newPetriNetState)
                setTransitionsSelected([])
                console.log(history)
            },
            (error) => {
                console.log("Error al disparar la transicion")
            }
        )
    }

    const onChangeTransitionsSelected = (e: MultiSelectChangeParams) => {
        setTransitionsSelected(e.target.value)
    }

    const renderFooter = FooterPetriModalCreator(onHide, onSave);

    useEffect(() => {
        /*if (history[0].transitions.length > 0 && history[0].transitions.length > 0 && [0].length == 0){*/
/*
            setHistory([...history, Object.assign({},{...petriNet})])
*/
            console.log("ejecutando el efect")
            getTransitionsEnabled(history[0])
            console.log(history[0])
        /*}*/
    }, [])

    return (
        <Dialog visible={displayBasic} className="pb-1" header="Simular PETRI" style={{width: '80vw', height: '90%'}}
                footer={renderFooter}
                onHide={() => onHide()}>
            <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full h-full">
                <ScrollPanel>
                    <h3 className="w-16rem">Herramientas</h3>
                    <div className="pt-2 flex flex-column gap-3">
                        <div>
                            <span>Transiciones habilitadas</span>
                            <MultiSelect className="w-full mt-2" maxSelectedLabels={2}
                                         value={transitionsSelected}
                                         options={transitionsEnabled}
                                         disabled={transitionsEnabled.length == 0}
                                         optionValue="id"
                                         onChange={(e) => onChangeTransitionsSelected(e)}
                                         optionLabel="name" placeholder="Selecionar transiciones"/>
                        </div>
                        <Button disabled={transitionsEnabled.length == 0} icon="pi pi-play" className="active:border-0  w-full p-button-sm p-button-outlined"
                                label="Transicion" onClick={fireNextTransition}/>
                    </div>
                </ScrollPanel>
                <div className="border-left-2 border-gray-300 w-full h-full">
                    <TabView className="tabview-header-icon">
                        <TabPanel rightIcon="pi pi-book" header="Resumen">
                            <ScrollPanel className="pl-6" style={{width: '96%', height: '60vh'}}>
                                <div className="card">
                                    <Timeline value={history} align="alternate" className="customized-timeline"
                                              content={customizedContent}/>
                                </div>
                                {/*<pre>
                                    {JSON.stringify(history, null, 4)}
                                </pre>*/}
                            </ScrollPanel>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </Dialog>
    )
}