import {PetriNet} from "../../../domain/models/PetriNet";
import {Place} from "../../../domain/models/Place";
import {
    ADD_INPUT,
    ADD_OUTPUT,
    ADD_PLACE,
    ADD_TRANSITION,
    REMOVE_INPUT,
    REMOVE_OUTPUT,
    REMOVE_PLACE,
    REMOVE_TRANSITION
} from "../constants";
import {Transition} from "../../../domain/models/Transition";
import {Input} from "../../../domain/models/Input";
import {addPlace} from "./addPlace";
import {addTransition} from "./addTransition";
import {removePlace} from "./removePlace";
import {removeTransition} from "./removeTransition";
import {Output} from "../../../domain/models/Output";

const addInput = (state: PetriNet, action: {type: string, payload: Input}) => {
    return {
        ...state,
        inputs: [
            ...state.inputs.map((input) => input),
            action.payload
        ]
    };
}

const addOutput = (state: PetriNet, action: {type: string, payload: Output}) => {
    return {
        ...state,
        outputs: [
            ...state.outputs.map((output) => output),
            action.payload
        ]
    };
}


export const reducer = (state: PetriNet, action: { type: string, payload: any }) => {
    switch (action.type) {
        case ADD_PLACE:
            return addPlace(state, action)
        case REMOVE_PLACE:
            return removePlace(state, action)
        case ADD_TRANSITION:
            return addTransition(state, action)
        case REMOVE_TRANSITION:
            return removeTransition(state, action)
        case ADD_INPUT:
            return addInput(state, action)
        case REMOVE_INPUT:
            return removeTransition(state, action)
        case ADD_OUTPUT:
            return addOutput(state, action)
        case REMOVE_OUTPUT:
            return removeTransition(state, action)
        default:
            return state
    }
}

export const actions = (dispatch: any) => ({
    addPlace: (place: Place) => dispatch({type: ADD_PLACE, payload: place}),
    removePlace: (place: number) => dispatch({type: REMOVE_PLACE, payload: place}),
    addTransition: (transition: Transition) => dispatch({type: ADD_TRANSITION, payload: transition}),
    removeTransition: (transition: number) => dispatch({type: REMOVE_TRANSITION, payload: transition}),
    addInput: (input: Input) => dispatch({type: ADD_INPUT, payload: input}),
    removeInput: (input: number) => dispatch({type: REMOVE_INPUT, payload: input}),
    addOutput: (transition: number) => dispatch({type: ADD_OUTPUT, payload: transition}),
    removeOutput: (transition: number) => dispatch({type: REMOVE_OUTPUT, payload: transition}),
})
