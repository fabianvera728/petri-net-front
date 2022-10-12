import {Place} from "../../../domain/models/Place";
import {
    ACTIONS_TYPES,
} from "../constants";
import {Transition} from "../../../domain/models/Transition";
import {Input} from "../../../domain/models/Input";

export const actions = (dispatch: any) => ({
    addPlace: (place: Place) => dispatch({type: ACTIONS_TYPES.ADD_PLACE, payload: place}),
    removePlace: (place: number) => dispatch({type: ACTIONS_TYPES.REMOVE_PLACE, payload: place}),
    addTransition: (transition: Transition) => dispatch({type: ACTIONS_TYPES.ADD_TRANSITION, payload: transition}),
    removeTransition: (transition: number) => dispatch({type: ACTIONS_TYPES.REMOVE_TRANSITION, payload: transition}),
    addInput: (input: Input) => dispatch({type: ACTIONS_TYPES.ADD_INPUT, payload: input}),
    removeInput: (input: number) => dispatch({type: ACTIONS_TYPES.REMOVE_INPUT, payload: input}),
    addOutput: (transition: number) => dispatch({type: ACTIONS_TYPES.ADD_OUTPUT, payload: transition}),
    removeOutput: (transition: number) => dispatch({type: ACTIONS_TYPES.REMOVE_OUTPUT, payload: transition}),
    reset: () => dispatch({type: ACTIONS_TYPES.RESET}),
})