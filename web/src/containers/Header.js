import React from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../services/auth'

/** 
 * Analogia
 * 
 * <div>
 *  <p>Teste</p>
 * </div>
 *  
 * O atributo children funciona como uma injeção de conteúdo no componente, que pode ser renderizado 
 * na posição que quiser
 * 
 * <Header>
 *  <div/>
 * </Header>
 * 
 * Nesse exemplo, o atributo children representa a tag div
 * Pode ser renderizado com a interpolação do valor 
 * 
 * {children}
 * 
 * Outra opção seria passando como uma prop
 * 
 * <Header
 *  children={<div/>}
 * />
 * 
 */
const Header = ({ token, setToken, children }) => {

    //const [redirect, setRedirect] = useState(false);

    async function handleLogout(e) {
        e.preventDefault()

        logout();

        setToken(null)

        // Remover, não é necessário por conta do controle de estado com o useState
        // A tela de login retorna reativamente
        //setRedirect(true)

    }

    // Quando o redirect for verdadeiro, o componente Header deixa de renderizar o seu conteúdo
    // Logo após, tenta redirecionar para a rota /login, mas as rotas são mantidas no conteúdo do header
    // Então não irá encontrar a rota e página fica branca
    /*if (redirect) {
        return <Redirect to="/login" />
    }*/


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
                        !token ? (
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
                                    <Link onClick={handleLogout} to="/login" className="Btn-login" style={{ textDecoration: 'none' }}>
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