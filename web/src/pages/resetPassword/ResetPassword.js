import React from 'react'
import { useState } from "react";
import api from '../../services/api';
import { Redirect } from 'react-router';

import './ResetPassword.css'

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [token, setToken] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/reset_password', {
            email,
            token,
            newPassword
        })
            .then(response => {
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
                <h1>Preencha as informações abaixo</h1>
                <p>Ps: no campo token, informe o token que recebeu por email</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label id="inputTitle" htmlFor="email" ></label>
                        <input
                            placeholder="Email *"
                            className="ResetPassword-Field"
                            name="email"
                            id="email"
                            required value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="token" ></label>
                        <input
                            placeholder="Token *"
                            className="ResetPassword-Field"
                            name="token"
                            id="token"
                            required value={token}
                            onChange={e => setToken(e.target.value)}
                        />
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="newPassword" ></label>
                        <input
                            placeholder="New Password *"
                            className="ResetPassword-Field"
                            name="newPassword"
                            id="newPassword"
                            required value={newPassword}
                            onChange={e => setnewPassword(e.target.value)}
                        />
                    </div>
                    <button className="ResetPassword-Btn" type="submit">Redefinir Senha</button>
                </form>
            </aside>
        </div>
    )
}

export default ResetPassword
