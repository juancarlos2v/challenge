import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

const Login = () => {

    const baseURL="http://localhost:8080"
    const navigate = useNavigate();
    const [error,setError]=useState();
    const [warning,setWarning]=useState(false);
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



    const login=(event)=>{
        event.preventDefault();
        axios.post(`${baseURL}/auth/login`,datos )
            .then((response) => {
                console.log('Respuesta recibida:', response.data);
            })
            .catch((e) => {
                setError(e.response.data.response)
                setWarning(true);
                console.log(e.response.data.response)
            })
    }

    return (
        <Form onSubmit={login} noValidate >
            <Form.Group className="mb-3" controlId="formBasicEmail"   >
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={user} onChange={handleUser} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword}/>
            </Form.Group>
            <button type="button" onClick={() => navigate('/reset')}  >
            Olvide mi contraseña
            </button>
                    {warning && <p>{error}</p>}

                    <Button variant="primary" type="submit">
                        Ingresar
                    </Button>
                    <Button variant="primary" type="submit" onClick={() => navigate('/register')}>
                        Register
                    </Button>
        </Form>
    );
}

export default Login;