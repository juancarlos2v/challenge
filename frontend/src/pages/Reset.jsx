import axios from "axios";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useNavigate} from 'react-router-dom'
import {Col, Container, Row} from "react-bootstrap";

const Reset = () => {
    const baseURL = "http://localhost:8080"
    const navigate = useNavigate();
    const [send, setSend] = useState(false)
    const [user, setUser] = useState("");
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("");

    const resetPassword = (event) => {
        event.preventDefault();
        axios.post(`${baseURL}/mail/recovery?email=${user}`)
            .then((response) => {
                setSuccess(true)
            })
            .catch((e) => {
                setSuccess(false);
                setError("Email invalido/no registrado")
            })
    }

    const handleUser = (event) => {
        setUser(event.target.value);
    };

    return (
        <>
        <Container className="d-flex flex-column" >
                <h2>Solicitar nueva contraseña</h2>
                <Form onSubmit={resetPassword} noValidate>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Ingresar Email</Form.Label>
                        <Form.Control type="email" placeholder="" value={user} onChange={handleUser}/>
                    </Form.Group>
                    <Row>
                        <Form.Text>
                        {success ? <p className="text-success">Contraseña enviada con exito a {user} </p>:
                                <p className="text-danger">{error}</p>
                        }
                        </Form.Text>
                    </Row>
                    <Row className="align-items-start">
                        <Col className="p-0">
                            <Button className="col-8" variant="primary" type="submit">
                                Enviar
                            </Button>
                        </Col>
                        <Col className="p-0">
                            <Button className="col-8" variant="secondary" type="button"
                                    onClick={() => navigate("/login")}>
                                Volver
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    )

}


export default Reset;