import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useContext, useState} from "react";
import PetriNetContext from "../../../context/PetriNetContext";
import {Transition} from "../../../../../domain/models/Transition";

const PetriNetTransitionsForm = () => {
    const {petriNet, addTransition, removeTransition} = useContext(PetriNetContext)

    const [transitionData, setTransitionData] = useState<Transition>(new Transition())

    const addNewTransition = () => {
        addTransition(transitionData)
        setTransitionData(new Transition())
    }

    const removeTransitionClicked = (index: number) => {
        removeTransition(index)
    }

    return (
        <div>
            <div className="flex justify-content-between align-items-center">
                <div className="flex flex-row gap-2 justify-content-between">
                    <InputText id="name" placeholder={`T1`} className="w-6rem block"
                               value={transitionData.name}
                               onChange={(e) => setTransitionData({...transitionData, name: e.target.value})}/>
                    <Button onClick={addNewTransition} tooltip="Nueva transicion"
                            className="p-button-rounded p-button-text p-button-sm pr-3"
                            icon="pi pi-plus"/>
                </div>
            </div>
            <div className="pt-4 grid gap-2 grid-nogutter">
                {
                    petriNet!.transitions.map((transition, index) =>
                        <div key={`place${index}`} className="col">
                            <div className="flex col flex-row border-round-xl pl-2
                                bg-gray-200 justify-content-between align-items-center">
                                <h5 className="pl-1 w-full">{transition.name}</h5>
                                <Button onClick={() => removeTransitionClicked(index)} tooltip="Editar" icon="pi pi-pencil"
                                        className="p-buttom-sm w-3rem p-button-text p-button-icon-only"/>
                                <Button onClick={() => removeTransitionClicked(index)} tooltip="Borrar" icon="pi pi-trash"
                                        className="p-buttom-sm w-3rem p-button-text text-red-700 p-button-icon-only"/>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PetriNetTransitionsForm