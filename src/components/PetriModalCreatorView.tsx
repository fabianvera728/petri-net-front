import {Petri} from "../core/interfaces/Petri";
import {Dialog} from "primereact/dialog";
import {Toast} from "primereact/toast";
import {ScrollPanel} from "primereact/scrollpanel";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {MultiSelect} from "primereact/multiselect";
import {TabPanel, TabView} from "primereact/tabview";
import {Image} from "primereact/image";

export function PetriModalCreatorView(displayBasic: boolean, renderFooter: () => JSX.Element, onHide: () => void, toastTL: any, petriData: Petri, onChange: (event: any) => void, pushNewPlace: () => void, onChangePlaces: (event: any, index: number) => void, pushNewTransition: () => void, onChangeTransitions: (event: any, index: number) => void, pushNewInput: () => void, onChangeInputTransitionName: (event: any, index: number) => void, onChangeInputPlaces: (event: any, index: number) => void, activeIndex: number, setActiveIndex: (value: (((prevState: number) => number) | number)) => void) {
    return (
        <Dialog visible={displayBasic} header="Crear PETRI" style={{width: '70vw', height: '80vh'}}
                footer={renderFooter}
                onHide={() => onHide()}>
            <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full">
                <Toast ref={toastTL} position="top-left"/>
                <ScrollPanel style={{height: '62vh'}}>
                    <div className="w-full">
                        <h4>Especificacion de la red</h4>
                        <div className="w-full mt-3">
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
                        <ScrollPanel style={{height: '5rem'}}>
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
                        <ScrollPanel style={{height: '5rem'}}>
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
                        <ScrollPanel style={{height: '8rem'}}>
                            <div style={{lineHeight: '1.5', width: '17rem'}} className="p-0 flex align-items-center">
                                {
                                    petriData.inputs.map((input, index) =>
                                        <div key={`input${index}`} className="w-full col flex-row p-2">
                                            <Dropdown className="w-full" value={input.transition}
                                                      options={petriData.transitions}
                                                      onChange={(e) => onChangeInputTransitionName(e, index)}
                                                      optionLabel="name" placeholder="T1"/>
                                            <MultiSelect className="w-full mt-2" maxSelectedLabels={2}
                                                         value={input.places}
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
                        <ScrollPanel style={{height: '8rem'}}>
                            <div style={{lineHeight: '1.5', width: '17rem'}} className="p-0 flex align-items-center">
                                {
                                    petriData.inputs.map((input, index) =>
                                        <div key={`input${index}`} className="w-full col flex-row p-2">
                                            <Dropdown className="w-full" value={input.transition}
                                                      options={petriData.transitions}
                                                      onChange={(e) => onChangeInputTransitionName(e, index)}
                                                      optionLabel="name" placeholder="T1"/>
                                            <MultiSelect className="w-full mt-2" maxSelectedLabels={2}
                                                         value={input.places}
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
                                    <pre>{JSON.stringify(petriData, null, 4)}</pre>
                                </div>
                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="Preview">
                            <ScrollPanel style={{width: '100%', height: '45vh'}}>
                                <div className="max-w-full w-20rem">
                                    <Image src="https://i.stack.imgur.com/dgLR3.png" alt="Image Text"/>
                                </div>
                            </ScrollPanel>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </Dialog>
    )
}