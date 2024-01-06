import { Component } from "react/cjs/react.production.min";
import User from "./User";  
import UserClass from "./UserClass";
import React from "react";


class About extends React.Component {

    constructor(props) {
        super(props);

        console.log("parent constructor");
    }
   

    componentDidMount() {
        
        console.log("parent component Did Mount");
    }
    render() {
        console.log("parent render");
        return (
            <div>
                <h1>About</h1>
                <h2>let me make route</h2>
                <UserClass name={"prajwal (class)"} />
            </div>
        );  
    }
}

// const About = () => {
//     return (
//         <div>
//             <h1>About</h1>
//             <h2>let me make route</h2>
//             <UserClass name={"prajwal (class)"} />
//         </div>
//     );
// };

export default About;