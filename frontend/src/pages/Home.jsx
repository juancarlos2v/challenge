import Register from "./Register.jsx";
import {useState} from "react";
import Login from "./Login.jsx";

function Home() {
    const [login, setLogin] = useState(true)
    return <>
        <Login/>
    </>
}

export default Home;