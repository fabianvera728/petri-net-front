import {useReducer} from "react";
import {reducer} from "../reducers/petriNetReducer";
import {PetriNet} from "../../../domain/models/PetriNet";
import {actions} from "../actions";

export const initialState: PetriNet = {
    name: '',
    description: '',
    places: [],
    transitions: [],
    inputs: [],
    outputs: [],
    placesHash: {},
    transitionsHash: {},
}

const usePetriNet = () => {
    const [petriNet, dispatch] = useReducer(reducer, initialState);

    const {
        addPlace,
        removePlace,
        addTransition,
        removeTransition,
        addInput,
        addOutput,
        removeInput,
        removeOutput,
        reset,
    } = actions(dispatch)

    return {
        petriNet,
        addPlace,
        removePlace,
        addTransition,
        removeTransition,
        addInput,
        addOutput,
        removeInput,
        removeOutput,
        reset
    }

}

export default usePetriNet;