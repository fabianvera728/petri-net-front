import React, {Dispatch, SetStateAction} from "react";
import {PetriNet} from "../../../domain/models/PetriNet";

interface PetriNetContextProps {
    addPlace?: any,
    petriNet?: PetriNet
    removePlace?: any,
    addTransition?: any,
    removeTransition?: any,
    addInput?: any
    addOutput?: any
}

const PetriNetContext = React.createContext<PetriNetContextProps>({})

export default PetriNetContext;