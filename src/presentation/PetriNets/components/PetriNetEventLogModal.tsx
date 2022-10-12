import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {TabPanel, TabView} from "primereact/tabview";
import {ScrollPanel} from "primereact/scrollpanel";
import {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Graphviz} from "graphviz-react";
import {useInjection} from "inversify-react";
import {GeneratePetriNetGraph} from "../../../application/usecases/GeneratePetriNetGraph";
import {PetriNetEventLogStatistics} from "./PetriNetEventLogStatistics";

interface DrawPetriModalProps {
    isVisible: boolean
    toggleModalState: any
}

export const PetriNetEventLogModal = ({isVisible, toggleModalState}: DrawPetriModalProps) => {

    const [importedCols, setImportedCols] = useState([{field: '', header: 'Header'}]);
    const [importedData, setImportedData] = useState<any[]>([]);
    const [selectedImportedData, setSelectedImportedData] = useState<any[]>([]);
    const [petriNets, setPetriNets] = useState<any[]>([])

    // #CA9CCB

    const [multiAxisData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Dataset 1',
            fill: false,
            tension: .4,
            borderColor: '#F79326',
            data: [65, 59, 80, 81, 56, 55, 10]
        }, {
            label: 'Dataset 2',
            fill: false,
            borderColor: '#FFDE59',
            tension: .4,
            data: [28, 48, 40, 19, 86, 27, 90]
        }, {
            label: 'Dataset 3',
            fill: true,
            tension: .4,
            borderColor: '#9976FF',
            data: [38, 100, 10, 19, 36, 67, 10]
        }]
    });

    const generatePetriNetGraph = useInjection<GeneratePetriNetGraph>(GeneratePetriNetGraph)


    const onChangeInputFile = (e: any) => {
        const file = e.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const csv = e.target.result;
            const data = csv.split('\n');
            const cols = data[0].replace(/['"]+/g, '').split(';');
            console.log(cols)
            data.shift();
            let _importedCols = cols.map((col: any) => ({field: col, header: col}));
            let _importedData = data.map((d: any) => {
                d = d.split(';');
                return cols.reduce((obj: any, c: any, i: any) => {
                    obj[c] = d[i];
                    return obj;
                }, {});
            });
            setImportedCols(_importedCols);
            setImportedData(_importedData);
        };

        reader.readAsText(file, 'UTF-8');
    }


    const onHide = () => {
        toggleModalState(false)
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={() => onHide()} className="p-button-text"/>
                <Button label="Guardar" icon="pi pi-check" onClick={() => onHide()} autoFocus/>
            </div>
        );
    }

    useEffect(() => {
        /*if (!isVisible) {
            return
        }*/
        fetch('http://127.0.0.1:8000/api/petri_nets/event_log', {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            }
        }).then(
            (response) => response.json(),
            (error) => Promise.reject(error)
        ).then(
            (data) => {
                setPetriNets(data.map((petri: any) => {
                    return {...petri, graph: generatePetriNetGraph.execute(petri)}
                }))
            }
        )
    }, [])


    return (
        <Dialog visible={isVisible} header="Event Log" style={{width: '75vw', height: '90%'}}
                footer={renderFooter()}
                onHide={() => onHide()}>
            <div className="flex flex-column xl:flex xl:flex-row gap-4 w-full">
                <div className="border-gray-300 w-full">
                    <div className="flex-row flex align-items-center pl-2 gap-3 pb-2">
                        <h4>Herramientas </h4>
                        <input className="mt-2 bg-gray-100 p-3" style={{borderRadius: "0.5rem"}} type={"file"}
                               accept={".csv"}
                               onChange={(event) => onChangeInputFile(event.target)}/>
                    </div>
                    <TabView>
                        <TabPanel header="Event Log">
                            <ScrollPanel style={{width: '100%', height: '55vh'}}>
                                <DataTable rowsPerPageOptions={[10, 20, 50]} sortMode="multiple" value={importedData}
                                           emptyMessage="No hay datos" paginator
                                           rows={10} alwaysShowPaginator={false} responsiveLayout="scroll"
                                           selectionMode="multiple" selection={selectedImportedData}>
                                    {
                                        importedCols.map((col, index) => <Column key={index} field={col.field}
                                                                                 header={col.header} sortable/>)
                                    }
                                </DataTable>
                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="Variantes">
                            <ScrollPanel style={{width: '100%', height: '55vh'}}>
                                <div className="grid grid-nogutter gap-3">
                                    {
                                        petriNets.map((petriNet, index) =>
                                            <div key={`petri-graph-state-variants-${index}`}
                                                 className="col w-full border-round-2xl border-dashed p-1 border-1"
                                                 style={{placeContent: "center", display: "grid"}}>
                                                <span><strong>Case Id: </strong>{petriNet.name}</span>
                                                <Graphviz
                                                    className="w-full"
                                                    dot={petriNet.graph}
                                                    options={{
                                                        height: 500,
                                                        width: 1200,
                                                        fit: true,
                                                        zoom: true,
                                                        useWorker: true
                                                    }}/>
                                            </div>
                                        )
                                    }
                                </div>
                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="Analisis">
                            <ScrollPanel className="p-0" style={{width: '100%', height: '55vh'}}>
                                <PetriNetEventLogStatistics data={multiAxisData}/>
                            </ScrollPanel>
                        </TabPanel>
                        <TabPanel header="Datos de las variantes">
                            <ScrollPanel style={{width: '60vh', height: '55vh'}}>
                                <pre>
                                    {JSON.stringify(petriNets, null, 4)}
                                </pre>
                            </ScrollPanel>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </Dialog>
    )
}