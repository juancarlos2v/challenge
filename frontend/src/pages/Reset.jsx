import axios from "axios";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom'

const Reset = () => {
    const baseURL = "http://localhost:8080"
    const navigate=useNavigate();
    const [send, setSend] = useState(false)
    const [user, setUser] = useState("");
    const[success,setSuccess]=useState(false)

    const resetPassword = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/mail/recovery?email=${user}`)
            .then((response) => {
                setSuccess(true)
            })
            .catch((e) => {
                setSuccess(false);
            })
    }

    const handleUser = (event) => {
        setUser(event.target.value);
    };

    return (
        <>
            <h2>Solicitar nueva contraseña</h2>
            <Form onSubmit={resetPassword}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese email" value={user} onChange={handleUser} />
                </Form.Group>
                {success && <p>Contraseña enviada con exito a {user} </p>}
                <Button variant="primary" type="submit" >
                    Enviar
                </Button>
                <Button variant="primary" type="button" onClick={()=>navigate("/login")} >
                    Volver
                </Button>
            </Form>

        </>
    )

}


export default Reset;