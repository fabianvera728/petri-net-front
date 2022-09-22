import {PetriNet} from "../../../../domain/models/PetriNet";
import {Dispatch, SetStateAction} from "react";
import {Place} from "../../../../domain/models/Place";
import {Transition} from "../../../../domain/models/Transition";

export class PetriNetBuilder {
    constructor(public readonly petriNet: PetriNet, private setPetriNet: Dispatch<SetStateAction<PetriNet>>) {
    }

    public addNewPlace = (place: Place) => {
        this.setPetriNet({
            ...this.petriNet,
            places: [...this.petriNet.places, place]
        })
    }

    public removePlace(placeId: number) {
        if (this.petriNet.places.length - 1 === 0) {
            return
        }
        this.setPetriNet({
            ...this.petriNet,
            places: [
                ...this.petriNet.places.filter((place, index) => {
                    if (index !== placeId) {
                        return place
                    }
                })
            ]
        })
    }

    public addNewTransition(transition: Transition) {
        this.setPetriNet({
            ...this.petriNet,
            transitions: [...this.petriNet.transitions, transition]
        })
    }

    public removeTransition(transitionId: number) {
        if (this.petriNet.transitions.length - 1 === 0) {
            return
        }
        this.setPetriNet({
            ...this.petriNet,
            transitions: [
                ...this.petriNet.transitions.filter((transition, index) => {
                    if (index !== transitionId) {
                        return transition
                    }
                })
            ]
        })
    }


    public setTransitionName() {
        this.setPetriNet({
            ...this.petriNet,
            transitions: [...this.petriNet.transitions, new Transition(this.petriNet.transitions.length)]
        })
    }

    public setTokensPlace(value: number, indexPlace: number) {
        this.setPetriNet({
            ...this.petriNet,
            places: [...this.petriNet.places.map((place, index) => {
                if (index === indexPlace) {
                    place.tokens = value
                }
                return place
            })]
        })
    }

}