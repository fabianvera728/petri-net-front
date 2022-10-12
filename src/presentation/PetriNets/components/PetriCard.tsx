import {Button} from "primereact/button";
import {PetriNet} from "../../../domain/models/PetriNet";
import {useState} from "react";

interface PetriNetCardProps {
    showModalSimulation: (petriNet: PetriNet) => void
    readonly petriNet: PetriNet;
    graph: string
}

export const PetriCard = ({showModalSimulation, petriNet}: PetriNetCardProps) => {

    const [, setIsVisibleDeleteDialog] = useState(false)

    /*function random_item()
    {
        let items = ['#F79326', '#FFDE59', '#9976FF', '#CA9CCB'];
        return items[Math.floor(Math.random()*items.length)];
    }*/

    return (
        <div>
            <img width={"50rem"} height={"30rem"} src={"assets/img_4.png"} alt={"Preview red de petri"}/>

            <div>
                <Button aria-label={"run transition"} tooltip="Simular" icon="pi pi-play"
                        onClick={() => showModalSimulation(petriNet)}
                        className="p-button-sm" style={{backgroundColor: '#3237ff87', color: "#ffffff"}}/>
                <Button aria-label={"delete transition"} tooltip="Borrar" icon="pi pi-trash"
                        onClick={() => setIsVisibleDeleteDialog(true)}
                        className="ml-2 p-button-sm" style={{backgroundColor: '#4361ee21'}}/>
            </div>
        </div>
    )
}
