import {Button} from "primereact/button";
import {Card} from "primereact/card";
import {PetriNet} from "../../../domain/models/PetriNet";
import {Graphviz} from "graphviz-react";

interface PetriNetCardProps {
    showModalSimulation: (petriNet: PetriNet) => void
    petriNet: PetriNet;
    graph: string
}

export const PetriCard = ({showModalSimulation, petriNet, graph}: PetriNetCardProps) => {

    const header = () => {
        return (
            <Graphviz className="bg-gray-50 border-round-2xl border-gray-500 p-2" dot={graph}
                      options={{width: 340, height: 200, useWorker: false}}/>
        );
    };

    const footer = (
        <span>
            <Button tooltip="Simular" icon="pi pi-play" onClick={() => showModalSimulation(petriNet)}
                    className="p-button-sm"/>
            <Button tooltip="Borrar" icon="pi pi-trash" onClick={() => showModalSimulation(petriNet)}
                    className="p-button-danger ml-2 p-button-sm"/>
        </span>
    );

    return (
        <div>
            <Card title="Prueba 1 petri" subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!"
                  style={{width: '22em'}} footer={footer} header={header}>
            </Card>
        </div>
    )
}
