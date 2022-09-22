import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";

export function Navbar(props: { onClick: () => void, onClick1: () => void }) {
    return <div
        className="flex w-full z-5 sticky top-0 flex-row gap-2 align-content-between justify-content-between bg-gray-100 px-8 py-2">
        <div className="flex gap-3 align-items-center">
            <Button label="Petri" icon="pi pi-pencil" className="p-button-sm"
                    onClick={props.onClick}/>
        </div>
        <div className="flex flex-row gap-3 align-items-center">
            <Button label="Crear petri" icon="pi pi-pencil" className="p-button-sm"
                    onClick={props.onClick}/>
            <Button label="Dibujar Petri" icon="pi pi-pencil" className="p-button-sm p-button-outlined"
                    onClick={props.onClick1}/>
            <Avatar label="U" className="mr-2" size="large"
                    style={{backgroundColor: "#9c27b0", color: "#ffffff"}} shape="circle"/>
        </div>
    </div>;
}