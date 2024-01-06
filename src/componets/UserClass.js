import React from "react";
import { json } from "react-router-dom";

class UserClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name:"Dummy",
                location: "Default",
            },
        };
        
    }

    async componentDidMount() {


        const data = await fetch("https://api.github.com/users/sumitnagar1289");
        const json = await data.json();
        

        this.setState({
            userInfo: json,
        });
        console.log(json);
    }

    render () { 
        const { name, location,avatar_url } = this.state.userInfo;
        
        return (
            <div className="user-card">
                <img src={avatar_url} />
            <h2>Name: {name}</h2> 
            <h3>Location: {location}</h3>
            <h4>Contact: sumitnagar363@gmail.com</h4>
        </div>
        );
    }
}

export default UserClass;