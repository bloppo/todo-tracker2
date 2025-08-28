import {NavLink} from "react-router";


const About = () => {

    return (
        <div className={"about"}>
            <h1>About</h1>
            <NavLink to = "/what">What</NavLink>
        </div>
    )
}

export default About
