import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {TabPanel, TabView} from "primereact/tabview";
import {ScrollPanel} from "primereact/scrollpanel";
import {useState} from "react";
import {ReactDiagram, ReactPalette} from "gojs-react";
import {generateDiagramStructure, generatePalette, showLinkLabel} from "./GenerateDiagramStructure";
import * as go from "gojs";

interface DrawPetriModalProps {
    displayBasic: boolean
    setDisplayBasic: any
}

export const DrawPetriModal = ({displayBasic, setDisplayBasic}: DrawPetriModalProps) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const onHide = () => {
        setDisplayBasic(false)
    }

    const [nodesDiagram, setNodesDiagram] = useState({
            nodes: [
                {key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0'},
                {key: 1, text: 'Beta', color: 'orange', loc: '150 0'},
                {key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150'},
                {key: 3, text: 'Delta', color: 'pink', loc: '150 150'}
            ],
            relations: [
                {key: -1, from: 0, to: 1},
                {key: -2, from: 0, to: 2},
                {key: -3, from: 1, to: 1},
                {key: -4, from: 2, to: 3},
                {key: -5, from: 3, to: 0}
            ]
        }
    )

    const $ = go.GraphObject.make;
    const diagram =
        $(go.Diagram,
            {
                initialContentAlignment: go.Spot.Center,
                allowDrop: true,
                'undoManager.isEnabled': true,  // must be set to allow for model change listening
                // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
                "LinkDrawn": showLinkLabel,  // this DiagramEvent listener is defined below
                "LinkRelinked": showLinkLabel,
                "animationManager.duration": 800, // slightly longer than default (600ms) animation
                model: new go.GraphLinksModel(
                    {
                        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                    }
                )
            }
        );

    function initDiagram() {
        return generateDiagramStructure(diagram);
    }

    const generatePaletteComponent = () => {
        return generatePalette(diagram)
    }

    function handleModelChange(changes: any) {
        console.log(changes)
        console.log(modelData)
        /*
            alert('GoJS model changed!');
        */
    }

    const [modelData, setModelData] = useState<any>(initDiagram)

    const updateNodesDiagram = () => {
        console.log(nodesDiagram)
        const nodes = nodesDiagram.nodes
        nodes.push({key: 1, text: 'Beta', color: 'orange', loc: '150 0'})
        setNodesDiagram({...nodesDiagram, nodes: nodes})
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" onClick={() => onHide()} autoFocus/>
            </div>
        );
    }
    return (
        <Dialog visible={displayBasic} header="Dibujar red de petri" style={{width: '70vw', height: '80vh'}}
                footer={renderFooter()}
                onHide={() => onHide()}>
            <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full">
                <ScrollPanel style={{height: '62vh'}}>
                    <div className="flex-column flex align-items-center pl-2">
                        <h4>Herramientas </h4>
                        <ReactPalette
                            initPalette={generatePaletteComponent}
                            divClassName='palette-component w-10rem h-20rem'
                            style={{backgroundColor: '#eee'}}
                            nodeDataArray={[{key: 0, text: 'Alpha'}]}
                        />
                        {/*<div className="w-full flex flex-column align-items-center justify-content-center gap-3 pl-0">
                            <Button icon="pi pi-circle" onClick={updateNodesDiagram}
                                    className="p-button-rounded p-button-secondary p-button-outlined"
                                    aria-label="Places"/>
                            <Button icon="pi pi-pause" className="p-button-rounded p-button-secondary p-button-outlined"
                                    aria-label="Transitions"/>
                            <Button icon="pi pi-arrow-right"
                                    className="p-button-rounded p-button-secondary p-button-outlined"
                                    aria-label="Arco"/>
                            <Button icon="pi pi-stop-circle"
                                    className="p-button-rounded p-button-secondary p-button-outlined"
                                    aria-label="Arco"/>
                        </div>*/}
                    </div>
                </ScrollPanel>
                <div className="border-left-2 border-gray-300 w-full">
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel header="PETRI">
                            <ScrollPanel style={{width: '100%', height: '55vh'}}>
                                <ReactDiagram
                                    initDiagram={initDiagram}
                                    divClassName="w-full h-full border-0 border-white"
                                    nodeDataArray={nodesDiagram.nodes}
                                    linkDataArray={nodesDiagram.relations}
                                    onModelChange={handleModelChange}
                                />
                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="JSON">
                            <ScrollPanel style={{width: '35vw', height: '50vh'}}>
                                <div>
                                    {/*<pre>{JSON.stringify({petriData, inputs: inputs}, null, 4)}</pre>*/}
                                </div>
                            </ScrollPanel>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </Dialog>
    )
}