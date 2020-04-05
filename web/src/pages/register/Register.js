import React, { useState } from 'react'
import { Redirect, Link } from 'react-router-dom';
import logoImg from '../../assets/carbLogo.png';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './Register.css';

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
        return <Redirect to="/" />
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="" />

                    <h1>Cadastre-se</h1>
                    <p>Faça seu cadastro e tenha controle da sua diabete!</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#D45812" />
                        Voltar para login
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Name *"
                        name="name"
                        required value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        placeholder="Email *"
                        name="email"
                        required value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password *"
                        name="password"
                        required value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;




/*
import React, {useState} from 'react'
import api from '../../services/api';
import {Redirect} from 'react-router-dom';

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

export default Register;
*/
