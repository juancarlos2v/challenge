import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const baseURL = "http://localhost:8080";
    const navigate = useNavigate()
    const [error,setError]=useState();
    const [warning,setWarning]=useState(false);
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const register = (event) => {
        event.preventDefault();
        const datos = {
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            password: user.password
        };
        console.log(datos);
        axios.post(`${baseURL}/auth/register`, datos)
            .then((response) => {
                console.log('Respuesta recibida:', response.data);
            })
            .catch((e) => {
                setError(e.response.data.response)
                setWarning(true);
                console.log(e.response.data.response)
            })
    };

    return (
        <Form onSubmit={register} noValidate>
            <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Nombre" name="nombre" value={user.nombre} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" placeholder="Apellido" name="apellido" value={user.apellido} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email" name="email" value={user.email} onChange={handleChange} />
                <Form.Text className="text-muted">
                    Debe contener al menos 8 caracteres, una letra mayúscula, una minúscula y un carácter especial.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" name="password" value={user.password} onChange={handleChange} />
            </Form.Group>
            {warning&&<p>{error}</p>}
            <Button variant="primary" type="submit">
                Registrar
            </Button>
            <Button variant="primary" onClick={()=>navigate('/login')}>
                Volver
            </Button>
        </Form>
    );
}

export default Register;
