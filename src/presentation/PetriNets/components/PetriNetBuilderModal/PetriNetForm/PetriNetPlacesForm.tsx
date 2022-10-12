import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {ChangeEvent, useContext, useState} from "react";
import PetriNetContext from "../../../context/PetriNetContext";
import {Place} from "../../../../../domain/models/Place";

export const PetriNetPlacesForm = () => {
    const {petriNet, addPlace, removePlace} = useContext(PetriNetContext)
    const [placeData, setPlaceData] = useState<Place>(new Place())

    const addNewPlace = () => {
        addPlace(placeData)
        setPlaceData(new Place())
    }

    const removePlaceClicked = (index: number) => {
        removePlace(index)
    }

    const onChangePlace = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.id === 'tokens') {
            try {
                parseInt(event.target.value)
            } catch (e) {
                return
            }
        }
        setPlaceData({
            ...placeData,
            [event.target.id]: event.target.id === 'tokens' ? parseInt(event.target.value) : event.target.value
        })
    }

    return (
        <div>
            <div className="flex justify-content-between flex flex-column align-items-start">
                <div key={`place`} className="flex flex-row justify-content-start gap-2 w-full">
                    <InputText id="name" placeholder={`Place`} className="w-7rem"
                               value={placeData.name}
                               onChange={(event) => onChangePlace(event)}/>
                    <InputText id="tokens" type="number" placeholder="Tokens"
                               onChange={(event) => onChangePlace(event)}
                               className="w-7rem" value={placeData.tokens}/>
                    <Button onClick={addNewPlace} tooltip="Nuevo lugar"
                            className="p-button-rounded p-button-text p-button-sm pr-3"
                            icon="pi pi-plus"/>
                </div>
            </div>
            <div className="pt-4 grid gap-2 grid-nogutter ">
                {
                    Object.values(petriNet?.placesHash || {}).map((place, index) => {
                        return <div key={`place${index}`} className="col">
                            <div className="flex col flex-row border-round-xl pl-2
                        bg-gray-200 justify-content-between align-items-center">
                                <h5 className="pl-1 w-full">{place.name}</h5>
                                <span className="pl-3 w-3rem pr-2">{place.tokens}</span>
                                <Button onClick={() => removePlaceClicked(index)} icon="pi pi-pencil" tooltip="Editar"
                                        className="p-buttom-sm w-3rem p-button-text p-button-icon-only"/>
                                <Button onClick={() => removePlaceClicked(index)} icon="pi pi-trash" tooltip="Borrar"
                                        className="p-buttom-sm w-3rem p-button-text text-red-700 p-button-icon-only"/>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}