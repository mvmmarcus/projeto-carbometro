import React from 'react';

import logoImg from '../../assets/carbLogo.png';
import { Link } from 'react-router-dom';
import { FiLogOut, FiTrash2 } from 'react-icons/fi';

import './Profile.css';

const Profile = () => {

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo Carb" />
                <span>Olá, Marcus</span>

                <Link style={{textDecoration: "none", color: "#fff"}} className="button" to="/foods/new" >Nova refeição</Link>
                <button type="button" >
                    <FiLogOut size={16} color="#D45812" />
                </button>
            </header>

            <h1>Refeições</h1>

            <ul>
                <li>
                    <strong>Nome:</strong>
                    <p>Abacaxi</p>

                    <strong>Unidade de medida:</strong>
                    <p>Fatia média</p>

                    <strong>Peso:</strong>
                    <p>75g</p>

                    <strong>Cho:</strong>
                    <p>10g</p>

                    <button type="button" >
                        <FiTrash2 size={20} color="red" />
                    </button>
                </li>
                <li>
                    <strong>Nome:</strong>
                    <p>Abacaxi</p>

                    <strong>Unidade de medida:</strong>
                    <p>Fatia média</p>

                    <strong>Peso:</strong>
                    <p>75g</p>

                    <strong>Cho:</strong>
                    <p>10g</p>

                    <button type="button" >
                        <FiTrash2 size={20} color="red" />
                    </button>
                </li>
                <li>
                    <strong>Nome:</strong>
                    <p>Abacaxi</p>

                    <strong>Unidade de medida:</strong>
                    <p>Fatia média</p>

                    <strong>Peso:</strong>
                    <p>75g</p>

                    <strong>Cho:</strong>
                    <p>10g</p>

                    <button type="button" >
                        <FiTrash2 size={20} color="red" />
                    </button>
                </li>
                <li>
                    <strong>Nome:</strong>
                    <p>Abacaxi</p>

                    <strong>Unidade de medida:</strong>
                    <p>Fatia média</p>

                    <strong>Peso:</strong>
                    <p>75g</p>

                    <strong>Cho:</strong>
                    <p>10g</p>

                    <button type="button" >
                        <FiTrash2 size={20} color="red" />
                    </button>
                </li>
            </ul>
        </div >
    )
}

export default Profile;