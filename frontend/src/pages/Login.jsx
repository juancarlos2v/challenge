import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Row } from "react-bootstrap";
import useAxios from '@hooks/useAxios';


const Login = () => {

    const baseURL = process.env.BASE_URL;
    const navigate = useNavigate();

    const { error, loading, fetchData } = useAxios();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const login = (event) => {
        event.preventDefault();
        fetchData({
            url: `${baseURL}/auth/login`,
            method: 'POST',
            data: user
        });
    }

    return (
        <Form onSubmit={login} noValidate>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder=" " name="email" value={user.email} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="" name='password' value={user.password} onChange={handleChange} />
            </Form.Group>
            <Form.Text>
                {error != null && <p className="text-danger">{error}</p>}
            </Form.Text>
            <Link to="/reset" style={{ textDecoration: 'none' }}>Olvide mi contraseña </Link>
            <Row className="g-3 mt-2">
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Ingresar'}
                </Button>
                <Button variant="dark" type="submit" onClick={() => navigate('/register')}>
                    Registrar
                </Button>
            </Row>
        </Form>
    );
}

export default Login;