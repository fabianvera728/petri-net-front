import {InputText} from "primereact/inputtext";
import {ScrollPanel} from "primereact/scrollpanel";
import {ChangeEvent, useContext} from "react";
import PetriNetTransitionsForm from "./PetriNetTransitionsForm";
import {PetriNetPlacesForm} from "./PetriNetPlacesForm";
import PetriNetContext from "../../../context/PetriNetContext";
import PetriNetInputsForm from "./PetriNetInputsForm";
import PetriNetOutputsForm from "./PetriNetOutputsForm";
import {TabPanel, TabView} from "primereact/tabview";
import PetriNetPainter from "../PetriNetPainter";

export const PetriNetForm = () => {
    const {petriNet} = useContext(PetriNetContext)

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        /*
                setPetriNet({...petriNet, [`${event.target.id}`]: event.target.value})
        */
    }

    return (
        <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full pb-0">
            <ScrollPanel className="pr-0" style={{height: '72vh', width: '40%'}}>
                <div className="w-full">
                    <h4>Especificacion de la red</h4>
                    <div className="w-full mt-3">
                        <label htmlFor="name" className="block">Nombre</label>
                        <InputText id="name" className="w-full" value={petriNet!.name}
                                   onChange={(e: any) => onChange(e)}/>
                    </div>
                    <div className="w-full pt-2">
                        <label htmlFor="description" className="block">Descripcion</label>
                        <InputText id="description" className="w-full" value={petriNet!.description}
                                   onChange={(e: any) => onChange(e)}/>
                    </div>
                </div>
                <PetriNetPainter/>
            </ScrollPanel>
            <div className="w-full">
                <TabView>
                    <TabPanel header="Lugares">
                        <PetriNetPlacesForm/>
                    </TabPanel>
                    <TabPanel header="Transiciones">
                        <PetriNetTransitionsForm/>
                    </TabPanel>
                    <TabPanel header="Entradas">
                        <PetriNetInputsForm/>
                    </TabPanel>
                    <TabPanel header="Salidas">
                        <PetriNetOutputsForm/>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    )
}