import {Fragment} from "react";
import {Authors} from "../PetriNets/pages/Authors";

const Home = () => {
    return <Fragment>
        <div className="w-full flex flex-column justify-content-center align-items-center pt-6 pb-6">
            <div style={{width: "70%"}}>
                <Authors/>
            </div>
        </div>
    </Fragment>
}

export default Home;