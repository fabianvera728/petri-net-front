import {PetriNet} from "../../../domain/models/PetriNet";
import {
    ACTIONS_TYPES,
} from "../constants";
import {addPlace} from "../actions/addPlace";
import {addTransition} from "../actions/addTransition";
import {removePlace} from "../actions/removePlace";
import {removeTransition} from "../actions/removeTransition";
import {initialState} from "../hooks/usePetriNet";
import {addInput} from "../actions/addInput";
import {addOutput} from "../actions/addOutput";


export const reducer = (state: PetriNet, action: { type: string, payload: any }) => {
    switch (action.type) {
        case ACTIONS_TYPES.RESET:
            return initialState
        case ACTIONS_TYPES.ADD_PLACE:
            return addPlace(state, action)
        case ACTIONS_TYPES.REMOVE_PLACE:
            return removePlace(state, action)
        case ACTIONS_TYPES.ADD_TRANSITION:
            return addTransition(state, action)
        case ACTIONS_TYPES.REMOVE_TRANSITION:
            return removeTransition(state, action)
        case ACTIONS_TYPES.ADD_INPUT:
            return addInput(state, action)
        case ACTIONS_TYPES.REMOVE_INPUT:
            return removeTransition(state, action)
        case ACTIONS_TYPES.ADD_OUTPUT:
            return addOutput(state, action)
        case ACTIONS_TYPES.REMOVE_OUTPUT:
            return removeTransition(state, action)
        default:
            return state
    }
}
