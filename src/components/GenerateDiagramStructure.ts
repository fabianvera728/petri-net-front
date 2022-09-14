import * as go from "gojs";

const $ = go.GraphObject.make;


export function generateDiagramStructure(diagram: go.Diagram) {
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

/*
    diagram.nodeTemplate = $(
        go.Node,
        'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
            go.Point.stringify
        ),
        $(
            go.Shape,
            'RoundedRectangle',
            {name: 'SHAPE', fill: 'lightgreen', strokeWidth: 1},
            new go.Binding('fill', 'color')
        ),
        $(
            go.TextBlock,
            {margin: 8, editable: true},
            new go.Binding('text').makeTwoWay()
        )
    );
*/

    diagram.nodeTemplateMap.add("Start",
        $(go.Node, "Spot", {desiredSize: new go.Size(75, 75)},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, "Circle",
                {
                    fill: "#52ce60", /* green */
                    stroke: null,
                    portId: "",
                    fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                    toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                    cursor: "pointer"
                }),
            $(go.TextBlock, "Start",
                {
                    font: "bold 16pt helvetica, bold arial, sans-serif",
                    stroke: "whitesmoke"
                })
        )
    );
    /*
        diagram.nodeTemplate = $(
            go.Node,
            'Auto',
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(
                go.Point.stringify
            ),
            $(
                go.Shape,
                'RoundedRectangle',
                {name: 'SHAPE', fill: 'lightgreen', strokeWidth: 1},
                new go.Binding('fill', 'color')
            ),
            $(
                go.TextBlock,
                {margin: 8, editable: true},
                new go.Binding('text').makeTwoWay()
            )
        );
    */

    /*
        diagram.nodeTemplateMap.add(
            '',
            $(
                go.Node,
                'Table',
                nodeStyle(),
                $(
                    go.Panel,
                    'Auto',
                    $(
                        go.Shape,
                        'Rectangle',
                        {fill: '#91d5ff', stroke: '#000000', strokeWidth: 1},
                        new go.Binding('figure', 'figure')
                    ),
                    $(
                        go.TextBlock,
                        {
                            margin: 8,
                            maxSize: new go.Size(200, NaN),
                            wrap: go.TextBlock.WrapFit,
                            editable: true
                        },
                        new go.Binding('text').makeTwoWay()
                    )
                ),
                makePort("T", go.Spot.Top, true, true),
                makePort("L", go.Spot.Left, true, true),
                makePort("R", go.Spot.Right, true, true),
                makePort("B", go.Spot.Bottom, true, true)
            )
        );
    */


    /*
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
    */

    diagram.nodeTemplateMap.add("Start",
        $(go.Node, "Spot", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Shape, "Circle",
                    {minSize: new go.Size(40, 40), fill: "#79C900", stroke: null}),
                $(go.TextBlock, "Start",
                    {font: "bold 11pt Helvetica, Arial, sans-serif", stroke: lightText},
                    new go.Binding("text"))
            ),
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true)
        ));
    /*
        diagram.nodeTemplateMap.add(
            '',
            $(
                go.Node,
                'Table',
                nodeStyle(),
                $(
                    go.Panel,
                    'Spot',
                    $(go.Shape, 'Circle', {
                        desiredSize: new go.Size(60, 60),
                        fill: '#91d5ff',
                        stroke: '#000000',
                        strokeWidth: 1
                    }),
                    $(go.TextBlock, 'End', new go.Binding('text'))
                ),
                makePort('T', go.Spot.Top, true, true),
                makePort('L', go.Spot.Left, true, true),
                makePort('R', go.Spot.Right, true, true)
            )
        );
    */
    /*
        diagram.nodeTemplateMap.add("End",
            $(go.Node, "Spot", {desiredSize: new go.Size(75, 75)},
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, "Circle",
                    {
                        fill: "maroon",
                        stroke: null,
                        portId: "",
                        fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true,
                        cursor: "pointer"
                    }),
                $(go.Shape, "Circle", {fill: null, desiredSize: new go.Size(65, 65), strokeWidth: 2, stroke: "whitesmoke"}),
                $(go.TextBlock, "End",
                    {
                        font: "bold 16pt helvetica, bold arial, sans-serif",
                        stroke: "whitesmoke"
                    })
            )
        );
    */
    diagram.linkTemplate =
        $(go.Link,
            {
                routing: go.Link.AvoidsNodes,
                corner: 10,
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

    return diagram;
}

export function showLinkLabel(e: any) {
    let label = e.subject.findObject("LABEL");
    if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
}

export function generatePalette(diagram: go.Diagram) {
    const animateFadeDown = (e: any) => {
        const animation = new go.Animation();
        animation.isViewportUnconstrained = true;
        animation.easing = go.Animation.EaseOutExpo;
        animation.duration = 900;
        animation.add(
            e.diagram,
            'position',
            e.diagram.position.copy().offset(0, 200),
            e.diagram.position
        );
        animation.add(e.diagram, 'opacity', 0, 1);
        animation.start();
    };
    const myPalette = $(go.Palette,  // must name or refer to the DIV HTML element
        {
            'animationManager.initialAnimationStyle': go.AnimationManager.None,
            "animationManager.duration": 800, // slightly longer than default (600ms) animation
            InitialAnimationStarting: animateFadeDown,
            nodeTemplateMap: diagram.nodeTemplateMap,
            model: new go.GraphLinksModel([  // specify the contents of the Palette
                {category: "Start", text: ""},
                {text: "Step"},
                {text: "???", figure: "Diamond"},
                {category: "End", text: "End"},
                {category: "Comment", text: "Comment"}
            ])
        })

    diagram.nodeTemplateMap.map((e) => {
        myPalette.nodeTemplateMap.add(e.key, e.value)
    })

    /*
        myPalette.nodeTemplate =
            $(go.Node, "Horizontal",
                $(go.Shape,
                    {width: 14, height: 14, fill: "white"},
                    new go.Binding("fill", "color")),
                $(go.TextBlock,
                    new go.Binding("text", "color"))
            );
    */

    /*myPalette.model.nodeDataArray = [
        {key: 1, category: "first"},
        {key: 2, category: "second"},
        {key: 3, category: "third"}
    ]*/

    /*
        myPalette.nodeTemplate = $(go.Node,
            'Vertical',
            $(go.Shape, {fill: 'red'}, new go.Binding('fill', 'color')),
            $(go.TextBlock, {stroke: 'black'}, new go.Binding('text').makeTwoWay())
        )
    */
    myPalette.nodeTemplate =
        $(go.Node, "Vertical",
            {locationObjectName: "TB", locationSpot: go.Spot.Center},
            $(go.Shape,
                {width: 20, height: 20, fill: "white"},
                new go.Binding("fill", "color")),
            $(go.TextBlock, {name: "TB"},
                new go.Binding("text", "color"))
        );

// the list of data to show in the Palette
    myPalette.model.nodeDataArray = [
        {key: "IR", color: "indianred"},
        {key: "LC", color: "lightcoral"},
        {key: "S", color: "salmon"},
        {key: "DS", color: "darksalmon"},
        {key: "LS", color: "lightsalmon"}
    ];
    return myPalette
}