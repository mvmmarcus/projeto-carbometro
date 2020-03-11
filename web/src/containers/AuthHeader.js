import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../services/auth'

const AuthHeader = () => {

    async function handleLogout(e) {
        e.preventDefault()

       logout();

    }

    return (
        <div className="ui secondary pointing menu">
            <header className="Home-header">
                <div className="Carb-title">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
                <div className="Btn-header">
                    <Link onClick={handleLogout} to="/login" className="Btn-login" style={{ textDecoration: 'none' }}>
                        Fazer logout
                    </Link>
                </div>
            </header>
        </div>
    );
};

export default AuthHeader;