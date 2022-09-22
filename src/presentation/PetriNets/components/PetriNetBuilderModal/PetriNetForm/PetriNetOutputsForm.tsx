import {ChangeEvent, useContext, useState} from "react";
import PetriNetContext from "../../../context/PetriNetContext";
import {Dropdown, DropdownChangeParams} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Output} from "../../../../../domain/models/Output";
import {InputText} from "primereact/inputtext";

const PetriNetOutputsForm = () => {
    const {petriNet, addOutput} = useContext(PetriNetContext)

    const [outputData, setOutputData] = useState<Output>({
        transition: '',
        place: '',
        number_of_outputs: 1
    })

    const onChangeOutputPlace = (event: DropdownChangeParams | ChangeEvent<HTMLInputElement>) => {
        setOutputData({
            ...outputData,
            [event.target.id]: event.target.id === 'number_of_outputs' ? parseInt(event.target.value) : event.target.value
        })
    }

    const addNewOutput = () => {
        addOutput(outputData)
        setOutputData({
            transition: '',
            place: '',
            number_of_outputs: 1
        })
    }

    return (
        <div>
            <div className="flex justify-content-between align-items-center">
                <div className="flex flex-row gap-2">
                    <Dropdown className="w-full"
                              options={petriNet!.transitions}
                              value={outputData.transition}
                              id="transition"
                              onChange={(e) => onChangeOutputPlace(e)}
                              optionValue="id"
                              optionLabel="name" placeholder="Selecionar transicion"/>
                    <Dropdown className="w-full"
                              options={petriNet!.places}
                              onChange={(e) => onChangeOutputPlace(e)}
                              optionValue="id"
                              id="place"
                              value={outputData.place}
                              optionLabel="name" placeholder="Selecionar lugar"/>
                    <InputText id="number_of_outputs" type="number"
                               value={outputData.number_of_outputs}
                               placeholder="N. Salidas"
                               onChange={(event) => onChangeOutputPlace(event)}
                               className="w-8rem"/>
                    <Button onClick={addNewOutput}
                            className="p-button-rounded p-button-text p-button-sm pr-3"
                            icon="pi pi-plus"/>
                </div>
            </div>
            <div className="pt-4 grid gap-2 grid-nogutter">
                {
                    petriNet!.outputs.map((output, index) =>
                        <div key={`input${index}`} className="col">
                            <div className="flex col flex-row border-round-xl pl-2
                                bg-gray-200 justify-content-between align-items-center">
                                <h5 className="pl-1 w-full">
                                    {petriNet?.transitionsHash[output.transition].name} &#8594;
                                    {petriNet?.placesHash[output.place].name}
                                </h5>
                                <span className="pl-1 pr-2">{output.number_of_outputs}</span>
                                <Button onClick={() => {
                                }} tooltip="Editar" icon="pi pi-pencil"
                                        className="p-buttom-sm w-3rem p-button-text p-button-icon-only"/>
                                <Button onClick={() => {
                                }} tooltip="Borrar" icon="pi pi-trash"
                                        className="p-buttom-sm w-3rem p-button-text text-red-700 p-button-icon-only"/>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default PetriNetOutputsForm