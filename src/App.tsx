import "reflect-metadata"
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/tailwind-light/theme.css"
/*
import "primereact/resources/themes/fluent-light/theme.css"
import "primereact/resources/themes/lara-light-indigo/theme.css";
*/
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {PetriNets} from "./presentation/PetriNets/pages/PetriNets";
import {container} from "./ioc";
import {Provider} from "inversify-react";

const App = () => {
    return (
        <Provider container={container}>
            <div className="m-0 p-0">
                <PetriNets/>
            </div>
        </Provider>
    )
}

export default App
