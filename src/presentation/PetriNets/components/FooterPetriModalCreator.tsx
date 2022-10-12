import {Button} from "primereact/button";

export const FooterPetriModalCreator = (onHide: () => void, onSave: () => void) => {
    return () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" onClick={() => onSave()} autoFocus/>
            </div>
        );
    };
}
