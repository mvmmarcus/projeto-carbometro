import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <header className="Home-header">
                <div className="Carb-title">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h1>Carbometro</h1>
                    </Link>
                </div>
                <div className="Btn-header">
                    <Link to="/login" className="Btn-login" style={{ textDecoration: 'none' }}>
                        Fazer login
                </Link>
                    <Link to="/register" className="Btn-register" style={{ textDecoration: 'none' }}>
                        Cadastrar-se
                </Link>
                </div>
            </header>
        </div>
    );
};

export default Header;