import {Authors} from "../PetriNets/pages/Authors";
import {Fragment} from "react";

const About = () => {
    return <Fragment>
        <div className="w-full flex flex-column justify-content-center align-items-center pt-6 pb-6 m-0">
            <div style={{width: "70%"}}>
                <Authors/>
            </div>
        </div>
    </Fragment>
}

export default About;