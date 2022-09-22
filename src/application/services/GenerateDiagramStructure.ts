import * as go from "gojs";

const $ = go.GraphObject.make;

function validateTokenNumber(textblock: any, oldstr: any, newstr: any) {
    try {
        return parseInt(newstr) >= 0;
    } catch (e) {
        return  false
    }
}

export function generateDiagramStructure(diagram: go.Diagram) {
    let lightText = 'whitesmoke';

    diagram.nodeTemplateMap.add("Place",
        $(go.Node, "Spot", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Shape, "Circle",
                    {
                        minSize: new go.Size(60, 60),
                        fill: "#6366F1",
                        stroke: null,
                        fromLinkableDuplicates: true,
                        toLinkableDuplicates: true
                    }),
                $(go.Panel, "Vertical",
                    $(go.TextBlock,
                        {
                            font: " 11pt Helvetica, Arial, sans-serif",
                            stroke: lightText,
                            margin: 8,
                            wrap: go.TextBlock.WrapFit,
                            editable: true
                        },
                        new go.Binding("text", "text1").makeTwoWay()
                    ),
                    $(go.TextBlock,
                        {
                            font: " 11pt Helvetica, Arial, sans-serif",
                            stroke: lightText,
                            editable: true,
                            margin: 8,
                            isMultiline: false,
                            textValidation: validateTokenNumber
                        },
                        new go.Binding("text", "text2").makeTwoWay()
                    )
                )
            ),
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true)
        )
    );

    diagram.nodeTemplateMap.add("Transition",
        $(go.Node, "Spot", nodeStyle(),
            $(go.Panel, "Auto",
                $(go.Shape, "RoundedRectangle",
                    {
                        minSize: new go.Size(40, 40),
                        fill: "#000000",
                        stroke: null,
                        fromLinkableDuplicates: true,
                        toLinkableDuplicates: true
                    }),
                $(go.TextBlock,
                    {
                        font: " 11pt Helvetica, Arial, sans-serif",
                        stroke: lightText,
                        margin: 8,
                        wrap: go.TextBlock.WrapFit,
                        editable: true
                    },
                    new go.Binding("text").makeTwoWay()
                )
            ),
            makePort("T", go.Spot.Top, true, true),
            makePort("L", go.Spot.Left, true, true),
            makePort("R", go.Spot.Right, true, true),
            makePort("B", go.Spot.Bottom, true, true)
        )
    );


    diagram.linkTemplate =
        $(go.Link,
            {
                /*
                                routing: go.Link.AvoidsNodes,
                */
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

    myPalette.nodeTemplate =
        $(go.Node, "Vertical",
            {locationObjectName: "TB", locationSpot: go.Spot.Center},
            $(go.Shape,
                {width: 20, height: 20, fill: "white"},
                new go.Binding("fill", "color")),
            $(go.TextBlock, {name: "TB"},
                new go.Binding("text", "color"))
        );

    myPalette.model = new go.Model(
        [
            {key: "Blue", color: "Blue"},
            {key: "Red", color: "Red"}
        ]
    )
    return myPalette
}