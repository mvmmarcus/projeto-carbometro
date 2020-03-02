import React, { useState } from 'react'
import api from '../../services/api';
import { Redirect } from 'react-router';

import './Register.css'

const Register = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/register', {
            name,
            email,
            password
        })
            .then(response => {
                setUsers([...users, response.data]);
                setRedirect(true)
                console.log(redirect)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    if (redirect) {
        return <Redirect to="/login" />
    }

    return (
        <div id="app">
            <aside>
                <h1>Cadastre-se</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label id="inputTitle" htmlFor="name" ></label>
                        <input
                            placeholder="Name *"
                            className="Register-Field"
                            name="name"
                            id="name"
                            required value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="email" ></label>
                        <input
                            placeholder="Email *"
                            className="Register-Field"
                            name="email"
                            id="email"
                            required value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="password" ></label>
                        <input
                            placeholder="Password *"
                            className="Register-Field"
                            name="password"
                            id="password"
                            required value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="Register-Btn" type="submit">Registrar</button>
                </form>
            </aside>
        </div>
    )
}

export default Register
