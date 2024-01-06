import { useEffect, useState } from "react";

const User = (props) => {
    const [count] = useState(0);

    useEffect (() => {
        //Make API call
    }, []);

    
    return (
        <div className="user-card">
            <h2>Name: {props.name}</h2>
            <h3>Location: Pune</h3>
            <h1>count = {count}</h1>
            <h4>Contact: prajwalbopalkar24@gmail.com</h4>
        </div>
    );
};

export default User;