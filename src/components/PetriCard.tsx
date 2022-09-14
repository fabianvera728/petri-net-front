import {Button} from "primereact/button";
import {Card} from "primereact/card";

export const PetriCard = () => {

    const header = (
        <img alt="Card" src="https://i.stack.imgur.com/dgLR3.png"
             onError={(e: any) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}/>
    );
    const footer = (
        <span>
            <Button label="Editar" icon="pi pi-pencil" className="p-button-sm"/>
            <Button label="Borrar" icon="pi pi-trash" className="p-button-secondary ml-2 p-button-sm"/>
        </span>
    );

    return (
        <div>
            <Card title="Prueba 1 petri" subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                    quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!"
                  style={{width: '25em'}} footer={footer} header={header}>
            </Card>
        </div>
    )
}