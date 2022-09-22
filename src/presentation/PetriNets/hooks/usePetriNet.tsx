import {useReducer} from "react";
import {actions, reducer} from "../reducers/petriNetReducer";
import {PetriNet} from "../../../domain/models/PetriNet";

const initialState = new PetriNet()

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
        removeOutput
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
        removeOutput
    }

}

export default usePetriNet;