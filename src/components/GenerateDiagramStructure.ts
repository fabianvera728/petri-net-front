import * as go from "gojs";

export function generateDiagramStructure() {
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
/*
                'clickCreatingTool.archetypeNodeData': {text: 'place', color: 'lightblue'},
*/
                model: new go.GraphLinksModel(
                    {
                        linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
                    })
            });

    function showLinkLabel(e: any) {
        let label = e.subject.findObject("LABEL");
        if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
    }
    // define a simple Node template
    function makePort(name: any, spot: any, output: any, input: any) {
        // the port is basically just a small circle that has a white stroke when it is made visible
        return $(go.Shape, "RoundedRectangle",
            {
                fill: "transparent",
                stroke: null,  // this is changed to "white" in the showPorts function
                desiredSize: new go.Size(8, 8),
                alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
                portId: name,  // declare this object to be a "port"
                fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                cursor: "pointer"  // show a different cursor to indicate potential link point
            });
    }

    function showPorts(node: any, show: any) {
        let diagram = node.diagram;
        if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
        node.ports.each(function (port: any) {
            port.stroke = (show ? "white" : null);
        });
    }

    let lightText = 'whitesmoke';

    diagram.nodeTemplateMap.add("",  // the default category
        $(go.Node, "Spot", nodeStyle(),
            // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
            $(go.Panel, "Auto",
                $(go.Shape, "Circle",
                    {fill: "#00A9C9", stroke: null},
                    new go.Binding("figure", "figure")),
                $(go.TextBlock,
                    {
                        font: "bold 11pt Helvetica, Arial, sans-serif",
                        stroke: lightText,
                        margin: 8,
                        maxSize: new go.Size(160, NaN),
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding("text").makeTwoWay())
            ),
            // four named ports, one on each side:
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true)
        ));

    diagram.nodeTemplateMap.add("Start",
        $(go.Node, "Spot", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Shape, "Circle",
                    {minSize: new go.Size(40, 40), fill: "#79C900", stroke: null}),
                $(go.TextBlock, "Start",
                    {font: "bold 11pt Helvetica, Arial, sans-serif", stroke: lightText},
                    new go.Binding("text"))
            ),
            // three named ports, one on each side except the top, all output only:
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true)
        ));

    /*diagram.nodeTemplate =
        $(go.Node, 'Auto',  // the Shape will go around the TextBlock
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                mouseEnter: (e, obj) => showPorts(obj.part, true),
                mouseLeave: (e, obj) => showPorts(obj.part, false)
            },
            $(go.Shape, 'RoundedRectangle',
                {
                    name: 'SHAPE',
                    fill: 'white',
                    strokeWidth: 0,
                    fromLinkable: true,
                    toLinkable: true
                },
                // Shape.fill is bound to Node.data.color
                new go.Binding('fill', 'color')),
            $(go.TextBlock,
                {
                    margin: 8,
                    editable: true
                },  // some room around the text
                new go.Binding('text').makeTwoWay(),
            ),
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true)
        );*/
    diagram.linkTemplate =
        $(go.Link,
            {
                /*
                                    routing: go.Link.AvoidsNodes,
                                    corner: 10,
                */
                curve: go.Link.Bezier,
                relinkableFrom: true,
                relinkableTo: true,
                reshapable: true,
                resegmentable: true,
            },
            new go.Binding('relinkableFrom', 'canRelink').ofModel(),
            new go.Binding('relinkableTo', 'canRelink').ofModel(),
            $(go.Shape),
            $(go.Shape, {toArrow: 'Standard'})
        );

    function nodeStyle() {
        return [
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                locationSpot: go.Spot.Center,
                //isShadowed: true,
                //shadowColor: "#888",
                // handle mouse enter/leave events to show/hide the ports
                mouseEnter: function (e: any, obj: any) {
                    showPorts(obj.part, true);
                },
                mouseLeave: function (e: any, obj: any) {
                    showPorts(obj.part, false);
                }
            }
        ];
    }

    return diagram;
}


export function generatePalette() {
    const $ = go.GraphObject.make;
    return $(go.Palette,  // must name or refer to the DIV HTML element
        {
            "animationManager.duration": 800, // slightly longer than default (600ms) animation
            nodeTemplateMap: generateDiagramStructure().nodeTemplateMap,  // share the templates used by myDiagram
            model: new go.GraphLinksModel([  // specify the contents of the Palette
                {category: "Start", text: ""},
                {text: "Step"},
                {text: "???", figure: "Diamond"},
                {category: "End", text: "End"},
                {category: "Comment", text: "Comment"}
            ])
        })
}