import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";

export function Navbar(props: { onClick: () => void, onClick1: () => void, showModalEventLog: () => void }) {
    return <div
        style={{ gap: "35%"}}
        className="flex w-full z-5 sticky top-0 flex-row align-content-center justify-content-center bg-gray-100 py-2">
        <div className="flex gap-3 align-items-center">
            <img width="15%" src="src/assets/img.png"/>
            {/*<Button label="Petri" icon="pi pi-pencil" className="p-button-sm"
                    onClick={props.onClick}/>*/}
        </div>
        <div className="flex flex-row gap-2 align-items-center">
            <Button label="Crear petri" icon="pi pi-plus" className="p-button-sm p-button-outlined p-button-text"
                    onClick={props.onClick}/>
            <Button label="Dibujar Petri" icon="pi pi-pencil" className="p-button-sm p-button-outlined p-button-text"
                    onClick={props.onClick1}/>
            <Button label="Event log" icon="pi pi-database" className="p-button-sm p-button-outlined p-button-text"
                    onClick={props.showModalEventLog}/>
            <Avatar image="src/assets/fabian_profile_author.png" className="mr-2 ml-1" size="large"
                    style={{backgroundColor: "#9c27b0", color: "#ffffff"}} shape="circle"/>
        </div>
    </div>;
}