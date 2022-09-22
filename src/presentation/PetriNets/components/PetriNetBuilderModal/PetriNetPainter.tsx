import {TabPanel, TabView} from "primereact/tabview";
import {ScrollPanel} from "primereact/scrollpanel";
import {Graphviz} from "graphviz-react";
import {useContext} from "react";
import PetriNetContext from "../../context/PetriNetContext";
import {GeneratePetriNetGraph} from "../../../../application/usecases/GeneratePetriNetGraph";
import {useInjection} from "inversify-react";

const PetriNetPainter = () => {
    const {petriNet} = useContext(PetriNetContext)
    const generatePetriNet = useInjection<GeneratePetriNetGraph>(GeneratePetriNetGraph)
    return (
        <div className="border-left-2 border-gray-300" style={{width: '100%'}}>
            <TabView className="tabview-header-icon">
                <TabPanel rightIcon="pi pi-eye" header="Preview">
                    {
                        petriNet && (
                            <ScrollPanel className="p-0" style={{width: '20vw', height: '40vh'}}>
                                <Graphviz dot={generatePetriNet.execute(petriNet)}
                                          options={{zoom: true, height: 350, width: 350, fit: true, useWorker: false}}/>
                            </ScrollPanel>
                        )
                    }
                </TabPanel>
                <TabPanel header="JSON">
                    <ScrollPanel style={{width: '20vw', height: '40vh'}}>
                        <div>
                            <pre>{JSON.stringify(petriNet, null, 4)}</pre>
                        </div>
                    </ScrollPanel>
                </TabPanel>
            </TabView>
        </div>
    )
}

export default PetriNetPainter