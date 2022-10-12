import {Chart} from "primereact/chart";

export function PetriNetEventLogStatistics(props: { data: { datasets: ({ borderColor: string; tension: number; data: number[]; label: string; fill: boolean } | { tension: number; borderColor: string; data: number[]; label: string; fill: boolean })[]; labels: string[] } }) {
    return <div className="grid gap-4 grid-nogutter p-0" style={{placeContent: "center"}}>
        <div className="col">
            <h5>Comparativa de procesos</h5>
            <Chart width="20rem" type="line" data={props.data}/>
        </div>
        <div className="col">
            <h5>Multi Axis</h5>
            <Chart type="line" data={props.data}/>
        </div>
        <div className="col ">
            <h5>Multi Axis</h5>
            <Chart type="line" data={props.data}/>
        </div>
        <div className="col ">
            <h5>Multi Axis</h5>
            <Chart type="line" data={props.data}/>
        </div>
        <div className="col">
            <h5>Multi Axis</h5>
            <Chart type="line" data={props.data}/>
        </div>
        <div className="col ">
            <h5>Multi Axis</h5>
            <Chart type="line" data={props.data}/>
        </div>
        <div className="col ">
            <h5>Multi Axis</h5>
            <Chart type="line" data={props.data}/>
        </div>
    </div>;
}