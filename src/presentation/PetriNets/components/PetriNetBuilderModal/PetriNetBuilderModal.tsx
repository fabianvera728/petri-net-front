import {useRef} from "react";
import PetriNetContext from "../../context/PetriNetContext";
import {PetriNetForm} from "./PetriNetForm/PetriNetForm";
import {Dialog} from "primereact/dialog";
import {FooterPetriModalCreator} from "../FooterPetriModalCreator";
import {Toast} from "primereact/toast";
import {useInjection} from "inversify-react";
import CreatePetriNet from "../../../../application/usecases/CreatePetriNet";
import usePetriNet from "../../hooks/usePetriNet";

interface PetriNetBuilderModalProps {
    displayBasic: boolean,
    setDisplayBasic: () => void
}

export const PetriNetBuilderModal = (
    {
        displayBasic,
        setDisplayBasic
    }: PetriNetBuilderModalProps) => {

    const {petriNet, addPlace, removePlace, addTransition, removeTransition, addInput, addOutput} = usePetriNet()
    const onHide = () => {
        setDisplayBasic()
    }

    const toastTL = useRef<any>(null);
    const createPetriNetUseCase = useInjection<CreatePetriNet>(CreatePetriNet)

    const onSave = () => {
        createPetriNetUseCase.execute(petriNet).then(
            (response) => {
                toastTL.current.show([
                    {severity: 'info', summary: 'Petri Net', detail: 'Petri Net fue creada', life: 5000},
                ]);
                setDisplayBasic()
            },
            (error) => {
                toastTL.current.show([
                    {severity: 'warning', summary: 'Petri Net', detail: 'No se pudo crear la red de petri', life: 3000},
                ]);
            }
        )

    }
    const renderFooter = FooterPetriModalCreator(onHide, onSave);

    return (
        <PetriNetContext.Provider value={{
            petriNet: petriNet,
            addPlace, removePlace, addTransition, removeTransition, addInput, addOutput
        }}>
            <Toast ref={toastTL} position="bottom-right" className="p-toast-message-icon"/>
            <Dialog visible={displayBasic} header="Crear PETRI" style={{width: '70vw', height: '90%'}}
                    footer={renderFooter}
                    onHide={() => onHide()}>
                <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full pb-0">
                    <PetriNetForm/>
                    {/*<PetriNetPainter/>*/}
                </div>
            </Dialog>
        </PetriNetContext.Provider>
    )

}