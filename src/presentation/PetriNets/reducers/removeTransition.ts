import {PetriNet} from "../../../domain/models/PetriNet";

export function removeTransition(state: PetriNet, action: { type: string; payload: any }) {
    if (state.transitions.length - 1 === 0) {
        return state
    }
    return {
        ...state,
        transitions: [
            ...state.transitions.filter((transition, index) => {
                if (index !== action.payload) {
                    return transition
                }
            })
        ]
    };
}