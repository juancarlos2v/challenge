import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";

function Register() {
    const baseURL = "http://localhost:8080";
    const navigate = useNavigate()
    const [error, setError] = useState();
    const [warning, setWarning] = useState(false);
    const [user, setUser] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
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

        <Form onSubmit={register} noValidate className="col-6">
            <Row>
                <Form.Group className="mb-3 d-flex flex-column align-items-start">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="" name="nombre" value={user.nombre}
                                  onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3 d-flex flex-column align-items-start" controlId="formBasicPassword">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="" name="apellido" value={user.apellido}
                                  onChange={handleChange}/>
                </Form.Group>

            </Row>
            <Row>

                <Form.Group className="mb-3 d-flex flex-column align-items-start">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="" name="email" value={user.email}
                                  onChange={handleChange}/>

                </Form.Group>

                <Form.Group className="mb-3 d-flex flex-column align-items-start">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="" name="password" value={user.password}
                                  onChange={handleChange}/>
                    <Form.Text className="text-muted d-flex">
                        Debe contener al menos 8 caracteres, una letra mayúscula, una minúscula y un carácter
                        especial.
                    </Form.Text>
                </Form.Group>

            </Row>
            <Col>
                <Form.Text>
                    {warning && <p className="text-danger">{error}</p>}
                </Form.Text>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Registrar
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="light" onClick={() => navigate('/login')}>
                            Volver
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Form>
    );
}

export default Register;
