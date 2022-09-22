import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {TabPanel, TabView} from "primereact/tabview";
import {ScrollPanel} from "primereact/scrollpanel";
import {useState} from "react";
import {ReactDiagram, ReactPalette} from "gojs-react";
import {generateDiagramStructure, generatePalette, showLinkLabel} from "../../../application/services/GenerateDiagramStructure";
import * as go from "gojs";
import {Place, Transition} from "../../../core/interfaces/Petri";

interface DrawPetriModalProps {
    displayBasic: boolean
    setDisplayBasic: any
}

export const DrawPetriModal = ({displayBasic, setDisplayBasic}: DrawPetriModalProps) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const onHide = () => {
        setDisplayBasic(false)
    }

    const [nodesDiagram, setNodesDiagram] = useState<any>({
            nodes: [],
            relations: []
        }
    )

    function isLinkValid(fromnode: go.Node, fromport: any, tonode: go.Node, toport: go.Node) {
        const initialNodeCategory = diagram.model.getCategoryForNodeData(fromnode.data)
        const finalNodeCategory = diagram.model.getCategoryForNodeData(tonode.data)
        if (initialNodeCategory === 'Place') {
            return finalNodeCategory === 'Transition'
        } else if (initialNodeCategory === 'Transition') {
            return finalNodeCategory === 'Place'
        } else {
            return false
        }
    }

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
                "linkingTool.linkValidation": isLinkValid,
                "relinkingTool.linkValidation": isLinkValid,
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

    function mapperNodeToPlace(node: go.Node) : Place {
        return {
            name: node.data.text1,
            tokens: parseInt(node.data.text2),
            key: node.key,
            outputs: []
        };
    }

    function mapperNodeToTransition(node: go.Node) : Transition {
        return {
            name: node.data.text,
            key: node.key,
            outputs: []
        };
    }

    function handleModelChange(changes: any) {
        let currentPlaces: Place[] = []
        let currentTransitions: Transition[] = []
        diagram.nodes.each((node) => {
            if (node.data.category === 'Place') {
                currentPlaces.push(mapperNodeToPlace(node))
            } else {
                currentTransitions.push(mapperNodeToTransition(node))
            }
        })
        diagram.links.each((link) => {
            const nodeFrom = diagram.nodes.filter((node) => node.key === link.data.from).first()
            const nodeTo = diagram.nodes.filter((node) => node.key === link.data.to).first()
            if (nodeFrom!.data.category === 'Place') {
                currentPlaces.forEach((place) => {
                    if(place.key === link.data.from){
                        place.outputs!.push(nodeTo!.data.key)
                    }
                })
            } else {
                currentTransitions.forEach((transition) => {
                    if(transition.key === link.data.from){
                        transition.outputs!.push(nodeTo!.data.key)
                    }
                })
            }
        })
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
        <Dialog visible={displayBasic} header="Dibujar red de petri" style={{width: '70vw', height: '90%'}}
                footer={renderFooter()}
                onHide={() => onHide()}>
            <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full">
                <ScrollPanel style={{height: '62vh'}}>
                    <div className="flex-column flex align-items-center pl-2">
                        <h4>Herramientas </h4>
                        <ReactPalette
                            initPalette={generatePaletteComponent}
                            divClassName='palette-component w-7rem h-20rem'
                            nodeDataArray={[
                                {category: 'Place', text1: 'Place', text2: '0'},
                                {category: 'Transition', text: 'Transition'}
                            ]}
                        />
                    </div>
                </ScrollPanel>
                <div className="border-left-2 border-gray-300 w-full">
                    <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                        <TabPanel header="PETRI">
                            <ScrollPanel style={{width: '100%', height: '55vh'}}>
                                <ReactDiagram
                                    initDiagram={initDiagram}
                                    divClassName="w-full h-full border-0 border-white"
                                    nodeDataArray={[]}
                                    linkDataArray={[]}
                                    onModelChange={handleModelChange}
                                />
                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="JSON">
                            <ScrollPanel style={{width: '35vw', height: '50vh'}}>
                                {/*<div>
                                    <pre>{JSON.stringify(petriNet, null, 4)}</pre>
                                </div>*/}
                            </ScrollPanel>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </Dialog>
    )
}