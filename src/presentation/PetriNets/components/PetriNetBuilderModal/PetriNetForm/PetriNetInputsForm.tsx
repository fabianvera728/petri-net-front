import {ChangeEvent, useContext, useState} from "react";
import petriNetContext from "../../../context/PetriNetContext";
import {Dropdown, DropdownChangeParams} from "primereact/dropdown";
import {Button} from "primereact/button";
import {Input} from "../../../../../domain/models/Input";
import {InputText} from "primereact/inputtext";

const PetriNetInputsForm = () => {
    const {petriNet, addInput} = useContext(petriNetContext)
    const [inputData, setInputData] = useState<Input>({
        transition: '',
        place: '',
        number_of_inputs: 1
    })

    const onChangeInputPlace = (event: DropdownChangeParams | ChangeEvent<HTMLInputElement>) => {
        setInputData({
            ...inputData,
            [event.target.id]: event.target.id === 'number_of_inputs' ? parseInt(event.target.value) : event.target.value
        })
    }

    const addNewInput = () => {
        addInput(inputData)
        setInputData(({
            transition: '',
            place: '',
            number_of_inputs: 1
        }))
    }

    return (
        <div>
            <div className="flex justify-content-between align-items-center">
                <div className="flex flex-row gap-2">
                    <Dropdown className="w-full"
                              options={Object.values(petriNet?.placesHash || {}).map((place) => place)}
                              onChange={(e) => onChangeInputPlace(e)}
                              optionValue="id"
                              id="place"
                              value={inputData.place}
                              optionLabel="name" placeholder="Selecionar lugar"/>
                    <Dropdown className="w-full"
                              options={Object.values(petriNet?.transitions || {}).map((transition) => transition)}
                              value={inputData.transition}
                              id="transition"
                              onChange={(e) => onChangeInputPlace(e)}
                              optionValue="id"
                              optionLabel="name" placeholder="Selecionar transicion"/>
                    <InputText id="number_of_inputs" type="number"
                               value={inputData.number_of_inputs}
                               placeholder="N. Entradas"
                               onChange={(event) => onChangeInputPlace(event)}
                               className="w-8rem"/>
                    <Button onClick={addNewInput} tooltip="Nueva entrada"
                            className="p-button-rounded p-button-text p-button-sm pr-3"
                            icon="pi pi-plus"/>
                </div>
            </div>
            <div className="pt-4 grid gap-2 grid-nogutter">
                {
                    petriNet!.inputs.map((input, index) =>
                        <div key={`input${index}`} className="col">
                            <div className="flex col flex-row border-round-xl pl-2
                                bg-gray-200 justify-content-between align-items-center">
                                <h5 className="pl-1 w-full">
                                    {petriNet?.placesHash[input.place].name} &#8594;
                                    {petriNet?.transitionsHash[input.transition].name}
                                </h5>
                                <span className="pl-1 pr-2">{input.number_of_inputs}</span>
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

export default PetriNetInputsForm