import {PetriNet} from "../../../domain/models/PetriNet";
import {useEffect, useRef, useState} from "react";
import {Transition} from "../../../domain/models/Transition";
import {useInjection} from "inversify-react";
import GetPetriNetTransitionsEnabled from "../../../application/usecases/GetPetriNetTransitionsEnabled";
import RunPetriNetTransitions from "../../../application/usecases/RunPetriNetTransitions";
import {MultiSelectChangeParams} from "primereact/multiselect";
import {FooterPetriModalCreator} from "../components/FooterPetriModalCreator";
import {GeneratePetriNetGraph} from "../../../application/usecases/GeneratePetriNetGraph";
import {Place} from "../../../domain/models/Place";

export const useModalSimulation = (petriNet: PetriNet, toggleModalState: (value: (((prevState: boolean) => boolean) | boolean)) => void) => {
    const [statesPlaces, setStatesPlaces] = useState<Place[][]>([petriNet.places])
    const [transitionsEnabled, setTransitionsEnabled] = useState<Transition[]>([])
    const [transitionsEnabledForState, setTransitionsEnabledForState] = useState<Transition[][]>([])
    const [transitionsSelected, setTransitionsSelected] = useState<string[]>([])

    const getPetriNetTransitionsEnabled = useInjection<GetPetriNetTransitionsEnabled>(GetPetriNetTransitionsEnabled)
    const runPetriNetTransitions = useInjection<RunPetriNetTransitions>(RunPetriNetTransitions)
    const generatePetriNetGraph = useInjection<GeneratePetriNetGraph>(GeneratePetriNetGraph)
    const notification = useRef<any>(null)

    const onHide = () => {
        setStatesPlaces([])
        toggleModalState(false)
    }

    const onSave = () => {
        onHide()
    }

    const getTransitionsEnabled = (petriNetValue: PetriNet) => {
        getPetriNetTransitionsEnabled.execute(petriNetValue).then(
            (transitions) => {
                setTransitionsEnabledForState([...transitionsEnabledForState, transitions])
                setTransitionsEnabled(transitions)
                notification!.current!.show([
                    {
                        severity: 'info',
                        summary: 'Petri Net',
                        detail: 'Transiciones habilidadas actualizadas',
                        life: 3000
                    },
                ]);
            },
            (error) => {
                notification!.current!.show([
                    {
                        severity: 'info',
                        summary: 'Petri Net',
                        detail: 'No se pudieron obtener las transiciones habilidadas',
                        life: 3000
                    },
                ]);
            }
        )
    }

    const fireNextTransition = () => {
        if (transitionsSelected.length == 0) {
            notification!.current!.show([
                {severity: 'warn', summary: 'Petri Net', detail: 'No hay transiciones seleccionadas', life: 3000},
            ]);
            return
        }
        runPetriNetTransitions.execute(
            {...petriNet, places: statesPlaces[statesPlaces.length - 1]}, transitionsSelected).then(
            (nextPetriPlacesState) => {
                setStatesPlaces([...statesPlaces, [...nextPetriPlacesState]])
                const currentPetriNet = {...petriNet, places: nextPetriPlacesState}
                getTransitionsEnabled(currentPetriNet)
                setTransitionsSelected([])
                notification!.current!.show([
                    {severity: 'info', summary: 'Petri Net', detail: 'Transicion ejecutada', life: 3000},
                ]);
            },
            (error) => {
                notification!.current!.show([
                    {severity: 'warn', summary: 'Petri Net', detail: 'No se pudo ejecutar la transicion', life: 3000},
                ]);
            }
        )
    }

    const onChangeTransitionsSelected = (e: MultiSelectChangeParams) => {
        setTransitionsSelected(e.target.value)
    }

    const renderFooter = FooterPetriModalCreator(onHide, onSave);

    useEffect(() => {
        if (statesPlaces.length == 1) {
            getTransitionsEnabled(petriNet)
        }
    }, [])
    return {
        statesPlaces,
        transitionsEnabled,
        transitionsSelected,
        generatePetriNetGraph,
        onHide,
        fireNextTransition,
        transitionsEnabledForState,
        notification,
        onChangeTransitionsSelected,
        renderFooter
    };
}