import {useRef, useState} from "react";
import {Petri} from "../core/interfaces/Petri";
import {FooterPetriModalCreator} from "./FooterPetriModalCreator";
import {PetriModalCreatorView} from "./PetriModalCreatorView";
import {generatePetriNetStructure} from "./GeneratePetriNetStructure";

interface PetriModalProps {
    displayBasic: boolean
    setDisplayBasic: any
}

export const PetriModal = ({displayBasic, setDisplayBasic}: PetriModalProps) => {

    const [petriData, setPetriData] = useState<Petri>(generatePetriNetStructure())

    const onChange = (event: any) => {
        setPetriData({...petriData, [`${event.target.id}`]: event.target.value})
    }

    const onChangePlaces = (event: any, index: number) => {
        const newPlaces = petriData.places
        newPlaces[index].name = event.target.value
        setPetriData({...petriData, places: newPlaces})
    }

    const onChangeTransitions = (event: any, index: number) => {
        const newTransitions = petriData.transitions
        newTransitions[index].name = event.target.value
        setPetriData({...petriData, transitions: newTransitions})
    }

    const onChangeInputTransitionName = (event: any, index: number) => {
        const newInputs = petriData.inputs
        newInputs[index].transition = event.target.value
        setPetriData({...petriData, inputs: newInputs})
    }

    const onChangeInputPlaces = (event: any, index: number) => {
        const newInputs = petriData.inputs
        newInputs[index].places = event.value
        setPetriData({...petriData, inputs: newInputs})
    }

    const pushNewTransition = () => {
        const newTransitions = petriData.transitions
        newTransitions.push({
            name: `T${newTransitions.length + 1}`
        })
        setPetriData({...petriData, transitions: newTransitions})
    }

    const pushNewPlace = () => {
        const newPlaces = petriData.places
        newPlaces.push({
            name: `P${newPlaces.length + 1}`
        })
        setPetriData({...petriData, places: newPlaces})
    }

    const pushNewInput = () => {
        const newInputs = petriData.inputs
        newInputs.push({
            transition: {
                name: `T${newInputs.length + 1}`
            },
            places: []
        })
        setPetriData({...petriData, inputs: newInputs})
    }

    const [activeIndex, setActiveIndex] = useState(0);

    const onHide = () => {
        setDisplayBasic(false)
    }
    const toastTL: any = useRef(null);

    const onSave = () => {
        toastTL.current.show({severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000});
        onHide()
    }

    const renderFooter = FooterPetriModalCreator(onHide, onSave);
    return PetriModalCreatorView(displayBasic, renderFooter, onHide, toastTL, petriData, onChange,
        pushNewPlace, onChangePlaces, pushNewTransition, onChangeTransitions, pushNewInput,
        onChangeInputTransitionName, onChangeInputPlaces, activeIndex, setActiveIndex);
}