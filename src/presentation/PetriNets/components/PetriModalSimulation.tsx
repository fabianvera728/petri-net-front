import {Dispatch, SetStateAction} from "react";
import {Dialog} from "primereact/dialog";
import {ScrollPanel} from "primereact/scrollpanel";
import {TabPanel, TabView} from "primereact/tabview";
import {Button} from "primereact/button";
import {MultiSelect} from "primereact/multiselect";
import {PetriNet} from "../../../domain/models/PetriNet";
import {useModalSimulation} from "../hooks/useModalSimulation";
import {Graphviz} from "graphviz-react";
import {Toast} from "primereact/toast";

interface PetriModalProps {
    isVisible: boolean
    toggleModalState: Dispatch<SetStateAction<boolean>>
    petriNet: PetriNet
}

export const PetriModalSimulation = ({isVisible, toggleModalState, petriNet}: PetriModalProps) => {
    const {
        transitionsEnabled,
        transitionsSelected,
        statesPlaces,
        generatePetriNetGraph,
        onHide,
        fireNextTransition,
        transitionsEnabledForState,
        onChangeTransitionsSelected,
        renderFooter,
        notification
    } = useModalSimulation(petriNet, toggleModalState);

    return (
        <Dialog visible={isVisible} className="pb-1" header="Simular PETRI" style={{width: '80vw', height: '90%'}}
                footer={renderFooter}
                onHide={() => onHide()}>
            <Toast ref={notification} position="bottom-right" className="overflow-hidden p-toast-message-icon"/>
            <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full h-full">
                <ScrollPanel>
                    <h3 className="w-16rem">Herramientas</h3>
                    <div className="pt-2 flex flex-column gap-3">
                        <div className="w-16rem">
                            <span>Transiciones habilitadas</span>
                            <MultiSelect className="w-full mt-2" maxSelectedLabels={2}
                                         value={transitionsSelected}
                                         options={transitionsEnabled}
                                         disabled={transitionsEnabled.length == 0}
                                         optionValue="id"
                                         onChange={(e) => onChangeTransitionsSelected(e)}
                                         optionLabel="name" placeholder="Selecionar transiciones"/>
                        </div>
                        <Button disabled={transitionsEnabled.length == 0} icon="pi pi-play"
                                className="active:border-0 w-16rem  p-button-sm p-button-outlined"
                                label="Transicion" onClick={fireNextTransition}/>
                    </div>
                </ScrollPanel>
                <div className="border-left-2 border-gray-300 w-full h-full">
                    <TabView className="tabview-header-icon">
                        <TabPanel rightIcon="pi pi-book" header="Resumen">
                            <ScrollPanel className="pl-6" style={{width: '96%', height: '60vh'}}>
                                <div className="grid grid-nogutter gap-3">
                                    {
                                        statesPlaces.map((statePlaces, index) =>
                                            <div key={`petri-graph-state-${index}`}
                                                 className="col w-full border-round-2xl border-dashed p-1 border-1"
                                                 style={{placeContent: "center", display: "grid"}}>
                                                <Graphviz
                                                    className=""
                                                    dot={generatePetriNetGraph.execute({
                                                        ...petriNet,
                                                        places: statePlaces
                                                    }, transitionsEnabledForState[index])}
                                                    options={{
                                                        height: 280,
                                                        width: 420,
                                                        fit: true,
                                                        zoom: true,
                                                        useWorker: false
                                                    }}/>
                                            </div>
                                        )
                                    }
                                </div>
                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="Parámetros de lectura">
                            
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </Dialog>
    )
}
