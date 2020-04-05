/*
import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../services/auth'

const Header = ({ logado, setLogado, children }) => {


    async function handleLogout(e) {
        e.preventDefault()

        logout();

        setLogado(false)

    }


    return (
        <>
            <div className="ui secondary pointing menu">
                <header className="Home-header">
                    <div className="Carb-title">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <h1>Carbometro</h1>
                        </Link>
                    </div>
                    {
                        !logado ? (
                            <div className="Btn-header">
                                <Link to="/login" className="Btn-login" style={{ textDecoration: 'none' }}>
                                    Fazer login
                                </Link>
                                <Link to="/register" className="Btn-register" style={{ textDecoration: 'none' }}>
                                    Cadastrar-se
                                </Link>
                            </div>
                        ) : (
                                <div className="Btn-header">
                                    <Link onClick={handleLogout} to="/login" className="Btn-logout" style={{ textDecoration: 'none' }}>
                                        Fazer logout
                                </Link>
                                </div>
                            )
                    }
                </header>
            </div>
            {children}
        </>
    );
};

export default Header;
*/