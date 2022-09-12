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


function App() {
    const [modalCreatePetri, setModalCreatePetri] = useState(false)
    const [modalDrawPetri, setModalDrawPetri] = useState(false)
    document.title = "Petri - Simulator"
    return (
        <div className="m-0 p-0">
            <div className="flex w-full flex-row gap-2 align-content-between justify-content-between bg-gray-100 px-8 py-2">
                <div className="flex gap-3 align-items-center">
                    <Button label="Petri" icon="pi pi-pencil" className="p-button-sm"
                            onClick={() => setModalCreatePetri(true)}/>
                </div>
                <div className="flex flex-row gap-3 align-items-center">
                    <Button label="Crear petri" icon="pi pi-pencil" className="p-button-sm"
                            onClick={() => setModalCreatePetri(true)}/>
                    <Button label="Dibujar Petri" icon="pi pi-pencil" className="p-button-sm p-button-outlined"
                            onClick={() => setModalDrawPetri(true)}/>
                    <Avatar label="U" className="mr-2" size="large" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} shape="circle" />
                </div>
            </div>
            <div style={{ width: '100vw' }} className="flex flex-column align-items-center justify-center px-8 py-3">
                <div style={{ width: '60%' }}>
                    <TabView>
                        <TabPanel header="Header I">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </TabPanel>
                        <TabPanel header="Header II">
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>
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
