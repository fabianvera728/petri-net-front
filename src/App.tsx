import {Button} from 'primereact/button';
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {useState} from 'react';
import {PetriModal} from "./components/PetriModal";
import {DrawPetriModal} from "./components/DrawPetriModal";
import {Avatar} from "primereact/avatar";
import {TabPanel, TabView} from "primereact/tabview";
import {PetriCard} from "./components/PetriCard";


function App() {
    const [modalCreatePetri, setModalCreatePetri] = useState(false)
    const [modalDrawPetri, setModalDrawPetri] = useState(false)
    document.title = "Petri - Simulator"
    return (
        <div className="m-0 p-0">
            <div
                className="flex w-full z-5 sticky top-0 flex-row gap-2 align-content-between justify-content-between bg-gray-100 px-8 py-2">
                <div className="flex gap-3 align-items-center">
                    <Button label="Petri" icon="pi pi-pencil" className="p-button-sm"
                            onClick={() => setModalCreatePetri(true)}/>
                </div>
                <div className="flex flex-row gap-3 align-items-center">
                    <Button label="Crear petri" icon="pi pi-pencil" className="p-button-sm"
                            onClick={() => setModalCreatePetri(true)}/>
                    <Button label="Dibujar Petri" icon="pi pi-pencil" className="p-button-sm p-button-outlined"
                            onClick={() => setModalDrawPetri(true)}/>
                    <Avatar label="U" className="mr-2" size="large"
                            style={{backgroundColor: '#9c27b0', color: '#ffffff'}} shape="circle"/>
                </div>
            </div>
            <div className="flex pt-6 flex-column align-items-center justify-center">
                <div style={{width: '60%'}}>
                    <TabView>
                        <TabPanel header="Recientes">
                            <div className="grid gap-3 mb-6">
                                <PetriCard/>
                                <PetriCard/>
                                <PetriCard/>
                                <PetriCard/>
                                <PetriCard/>
                            </div>
                        </TabPanel>
                        <TabPanel header="Disenos">
                            <div className="grid gap-3 mb-6">
                                <PetriCard/>
                                <PetriCard/>
                                <PetriCard/>
                                <PetriCard/>
                                <PetriCard/>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
            <div>
                <PetriModal displayBasic={modalCreatePetri} setDisplayBasic={setModalCreatePetri}/>
                <DrawPetriModal displayBasic={modalDrawPetri} setDisplayBasic={setModalDrawPetri}/>
            </div>
        </div>
    )
}

export default App
