import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {Col, Row} from "react-bootstrap";

const Login = () => {

    const baseURL = "http://localhost:8080"
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [warning, setWarning] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const datos = {
        email: user,
        password: password
    };

    const handleUser = (event) => {
        setUser(event.target.value);
    };
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };


    const login = (event) => {
        event.preventDefault();
        console.log(datos)
        axios.post(`${baseURL}/auth/login`, datos)
            .then((response) => {
                console.log('Respuesta recibida:', response.data);
                setWarning(false)
            })
            .catch((e) => {
                setError(e.response.data.response)
                setWarning(true);
                console.log(e.response.data.response)
            })
    }

    return (
        <Form onSubmit={login} noValidate>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder=" " value={user} onChange={handleUser}/>
                {/**<Form.Text className="text-muted">
                 We'll never share your email with anyone else.
                 </Form.Text>**/}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="" value={password} onChange={handlePassword}/>
            </Form.Group>
            <Form.Text>
                {warning && <p className="text-danger">{error}</p>}
            </Form.Text>
            <Link to="/reset" style={{textDecoration: 'none'}}>Olvide mi contraseña </Link>

            <Row className="g-3 mt-2">
                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
                <Button variant="dark" type="submit" onClick={() => navigate('/register')}>
                    Registrar
                </Button>
            </Row>
        </Form>
    );
}

export default Login;