import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { logout, isAuthenticated } from '../services/auth'

const Header = () => {

    const [redirect, setRedirect] = useState(false);

    async function handleLogout(e) {
        e.preventDefault()

        logout();

        setRedirect(true)

    }

    if (redirect) {
        return <Redirect to="/login" />
    }


    return (
        <div className="ui secondary pointing menu">
            <header className="Home-header">
                <div className="Carb-title">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
                {
                    !isAuthenticated() ? (
                        <div className="Btn-header">
                            <Link to="/login" className="Btn-login" style={{ textDecoration: 'none' }}>
                                Fazer login
                            </Link>
                            <Link to="/register" className="Btn-register" style={{ textDecoration: 'none' }}>
                                Cadastrar-se
                            </Link>
                        </div>
                    ):(
                        <div className="Btn-header">
                            <Link onClick={handleLogout} to="/login" className="Btn-login" style={{ textDecoration: 'none' }}>
                                Fazer logout
                            </Link>
                        </div>
                    )
                }

            </header>
        </div>
    );
};

export default Header;