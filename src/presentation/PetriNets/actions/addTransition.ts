import {PetriNet} from "../../../domain/models/PetriNet";
import {Transition} from "../../../domain/models/Transition";

export function addTransition(state: PetriNet, action: { type: string; payload: Transition }) {
    return {
        ...state,
        transitions: [
            ...state.transitions.map((transition) => transition),
            action.payload
        ],
        transitionsHash: {...state.transitionsHash, [action.payload.id]: {...action.payload}}
    };
}

