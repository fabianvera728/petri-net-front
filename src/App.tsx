import "reflect-metadata"
import "/node_modules/primeflex/primeflex.css";
import "primereact/resources/themes/tailwind-light/theme.css"
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import {container} from "./ioc";
import {Provider} from "inversify-react";
import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    Link, NavLink
} from "react-router-dom";
import {lazy, Suspense} from "react";
import {Button} from "primereact/button";
import {Avatar} from "primereact/avatar";

const Home = lazy(() => import('./presentation/public/Home'));
const About = lazy(() => import('./presentation/public/About'));
const PetriNets = lazy(() => import('./presentation/PetriNets/pages/PetriNets'));

const Root = () => {
    return <div style={{backgroundColor: '#fff6f0', minHeight: "100vh"}}>
        <div
            style={{gap: "30%"}}
            className="flex w-full z-5 sticky top-0 flex-row align-content-center justify-content-center bg-gray-100 py-2">
            <div className="flex gap-3 align-items-center">
                <img width={"50rem"} height={"50rem"} src="public/assets/img.webp" alt="Logo Petri Net"/>
            </div>
            <div className="flex flex-row gap-2 align-items-center">
                <NavLink to={""} style={{textDecoration: "none"}}>
                    <Button label="Inicio"
                            className="p-button-sm p-button-outlined p-button-text"/>
                </NavLink>
                <NavLink to={"about"} style={{textDecoration: "none"}}>
                    <Button label="About"
                            className="p-button-sm p-button-outlined p-button-text"/>
                </NavLink>
                <NavLink to={"petri_nets"} style={{textDecoration: "none"}}>
                    <Button label="Petri Nets"
                            className="p-button-sm p-button-outlined p-button-text"/>
                </NavLink>
                <NavLink to={"event_log"} style={{textDecoration: "none"}}>
                    <Button label="Event Log"
                            className="p-button-sm p-button-outlined p-button-text"/>
                </NavLink>

                 {/*<Avatar image="src/assets/fabian_profile_author.png" className="mr-2 ml-1" imageAlt="Avatar del cliente" size="large"
                        style={{backgroundColor: "#9c27b0", color: "#ffffff"}} shape="circle"/>*/}
            </div>
            {/*<div>
                <img style={{borderRadius: "50%"}} width={"5%"} height={"auto"} src={"src/assets/fabian_profile_author.png"}
                     alt={"Avatar del cliente"}/>
            </div>*/}
            {/*<div className="flex gap-3 align-items-center">
                <img width={"15%"} height={"auto"} src="src/assets/img.png" alt="Logo Petri Net"/>
            </div>*/}
        </div>

        <div className="w-full" style={{display: "grid", placeContent: "center"}}>
            <Outlet/>
        </div>
    </div>
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <div>Error 404 not found</div>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "about/",
                element: <About/>,
            },
            {
                path: "petri_nets/",
                element: <PetriNets/>,
            }
        ]
    },
]);


const App = () => {
    return (
        <Provider container={container}>
            <Suspense
                fallback={<div style={{display: "grid", placeContent: "center", height: "100vh"}}>Loading...</div>}>
                <RouterProvider router={router}></RouterProvider>
            </Suspense>
        </Provider>
    )
}

export default App
