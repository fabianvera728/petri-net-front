import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {TabPanel, TabView} from "primereact/tabview";
import {ScrollPanel} from "primereact/scrollpanel";
import {Image} from "primereact/image";
import {useState} from "react";
import {Petri} from "../core/interfaces/Petri";
import {MultiSelect} from "primereact/multiselect";
import {Dropdown} from "primereact/dropdown";

interface PetriModalProps {
    displayBasic: boolean
    setDisplayBasic: any
}

export const PetriModal = ({displayBasic, setDisplayBasic}: PetriModalProps) => {

    const [petriData, setPetriData] = useState<Petri>({
        name: '',
        description: '',
        places: [
            {
                name: ''
            }
        ],
        transitions: [
            {
                name: ''
            }
        ],
        tokens: [
            {
                name: ''
            }
        ]
    })

    const [inputs, setInputs] = useState(
        [
            {
                transition: '',
                places: []
            }
        ]
    )

    const onChange = (event: any) => {
        setPetriData({...petriData, [`${event.target.id}`]: event.target.value})
    }

    const onChangePlaces = (event: any, index: number) => {
        const newPlaces = petriData.places
        newPlaces[index].name = event.target.value
        setPetriData({...petriData, places: newPlaces})
    }

    const onChangeTransitions = (event: any, index: number) => {
        const newTransitions = petriData.transitions
        newTransitions[index].name = event.target.value
        setPetriData({...petriData, transitions: newTransitions})
    }

    const onChangeInputTransitionName = (event: any, index: number) => {
        const newInputs = inputs
        newInputs[index].transition = event.target.value
        setInputs([...newInputs])
    }

    const onChangeInputPlaces = (event: any, index: number) => {
        const newInputs = inputs
        newInputs[index].places = event.value
        setInputs([...newInputs])
    }

    const pushNewTransition = () => {
        const newTransitions = petriData.transitions
        newTransitions.push({
            name: ''
        })
        setPetriData({...petriData, transitions: newTransitions})
    }

    const pushNewPlace = () => {
        const newPlaces = petriData.places
        newPlaces.push({
            name: ''
        })
        setPetriData({...petriData, places: newPlaces})
    }

    const pushNewInput = () => {
        const newInputs = inputs
        newInputs.push({
            transition: '',
            places: []
        })
        setInputs([...newInputs])
    }

    const [activeIndex, setActiveIndex] = useState(0);

    const onHide = (name: string) => {
        setDisplayBasic(false)
    }

    const renderFooter = (name: string) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" onClick={() => onHide(name)} autoFocus/>
            </div>
        );
    }
    return (
        <Dialog visible={displayBasic} header="Crear PETRI" style={{width: '70vw', height: '80vh'}}
                footer={renderFooter('displayBasic')}
                onHide={() => onHide('displayBasic')}>
            <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full">
                <ScrollPanel style={{height: '62vh'}}>
                    <div className="w-full">
                        <h4>Especificacion de la red</h4>
                        <div className="w-full">
                            <label htmlFor="name" className="block">Nombre</label>
                            <InputText id="name" className="w-full" value={petriData.name}
                                       onChange={(e: any) => onChange(e)}/>
                        </div>
                        <div className="w-full pt-2">
                            <label htmlFor="description" className="block">Descripcion</label>
                            <InputText id="description" className="w-full" value={petriData.description}
                                       onChange={(e: any) => onChange(e)}/>
                        </div>
                        <div className="flex justify-content-between align-items-center">
                            <h4>Lugares</h4>
                            <div>
                                <Button onClick={pushNewPlace}
                                        className="p-button-rounded p-button-text p-button-sm pr-3"
                                        icon="pi pi-plus"/>
                            </div>
                        </div>
                        <ScrollPanel style={{width: '25rem', height: '5rem'}}>
                            <div style={{lineHeight: '1.5', width: '17rem'}} className="p-0 flex align-items-center">
                                {
                                    petriData.places.map((place, index) =>
                                        <div key={`place${index}`} className="w-7rem col block">
                                            <InputText id="name" placeholder={`P${index + 1}`} className="w-6rem block"
                                                       value={place.name}
                                                       onChange={(e: any) => onChangePlaces(e, index)}/>
                                        </div>
                                    )
                                }
                            </div>
                        </ScrollPanel>

                        <div className="flex justify-content-between align-items-center">
                            <h4>Transiciones</h4>
                            <div>
                                <Button onClick={pushNewTransition}
                                        className="p-button-rounded p-button-text p-button-sm pr-3"
                                        icon="pi pi-plus"/>
                            </div>
                        </div>
                        <ScrollPanel style={{width: '25rem', height: '5rem'}}>
                            <div style={{lineHeight: '1.5', width: '17rem'}} className="p-0 flex align-items-center">
                                {
                                    petriData.transitions.map((transition, index) =>
                                        <div key={`transition${index}`} className="w-7rem col block">
                                            <InputText id="name" placeholder={`T${index + 1}`} className="w-6rem block"
                                                       value={transition.name}
                                                       onChange={(e: any) => onChangeTransitions(e, index)}/>
                                        </div>
                                    )
                                }
                            </div>
                        </ScrollPanel>


                        <div className="flex justify-content-between align-items-center">
                            <h4>Entradas</h4>
                            <div>
                                <Button onClick={pushNewInput}
                                        className="p-button-rounded p-button-text p-button-sm pr-3"
                                        icon="pi pi-plus"/>
                            </div>
                        </div>
                        <ScrollPanel style={{width: '25rem', height: '8rem'}}>
                            <div style={{lineHeight: '1.5', width: '17rem'}} className="p-0 flex align-items-center">
                                {
                                    inputs.map((input, index) =>
                                        <div key={`input${index}`} className="w-full col flex-row p-2">
                                            <Dropdown className="w-full" value={input.transition}
                                                      options={petriData.transitions}
                                                      onChange={(e) => onChangeInputTransitionName(e, index)}
                                                      optionLabel="name" placeholder="T1"/>
                                            <MultiSelect className="w-full" maxSelectedLabels={2} value={input.places}
                                                         options={petriData.places}
                                                         onChange={(e) => onChangeInputPlaces(e, index)}
                                                         optionLabel="name" placeholder="P1"/>
                                        </div>
                                    )
                                }
                            </div>
                        </ScrollPanel>

                        <div className="flex justify-content-between align-items-center">
                            <h4>Salidas</h4>
                            <div>
                                <Button onClick={pushNewInput}
                                        className="p-button-rounded p-button-text p-button-sm pr-3"
                                        icon="pi pi-plus"/>
                            </div>
                        </div>
                        <ScrollPanel style={{width: '25rem', height: '8rem'}}>
                            <div style={{lineHeight: '1.5', width: '17rem'}} className="p-0 flex align-items-center">
                                {
                                    inputs.map((input, index) =>
                                        <div key={`input${index}`} className="w-full col flex-row p-2">
                                            <Dropdown className="w-full" value={input.transition}
                                                      options={petriData.transitions}
                                                      onChange={(e) => onChangeInputTransitionName(e, index)}
                                                      optionLabel="name" placeholder="T1"/>
                                            <MultiSelect className="w-full" maxSelectedLabels={2} value={input.places}
                                                         options={petriData.places}
                                                         onChange={(e) => onChangeInputPlaces(e, index)}
                                                         optionLabel="name" placeholder="P1"/>
                                        </div>
                                    )
                                }
                            </div>
                        </ScrollPanel>


                    </div>
                </ScrollPanel>
                <div className="border-left-2 border-gray-300 w-full">
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel header="JSON">
                            <ScrollPanel style={{width: '35vw', height: '50vh'}}>
                                <div>
                                    <pre>{JSON.stringify({petriData, inputs: inputs}, null, 4)}</pre>
                                </div>
                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="Preview">
                            <ScrollPanel style={{width: '100%', height: '45vh'}}>
                                <div className="max-w-full w-20rem">
                                    <Image src=" https://i.stack.imgur.com/dgLR3.png" alt="Image Text"/>
                                </div>
                            </ScrollPanel>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </Dialog>
    )
}