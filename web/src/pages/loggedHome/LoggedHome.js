import React from 'react'

import api from '../../services/api';
import { getId } from '../../services/auth';

const LoggedHome = () => {

    async function getUserId() {

        const id = getId();

        console.log(id)

        await api.get(`/users/${id}`)
            .then(response => {
                console.log(response.data)
            })
            .catch (error => {
                console.log(error)
            })
        
    }
    
    getUserId()
    return (
        <>
            <h1>Antes de prosseguir, finalize o seu cadastro</h1>
            <div id="root" >

            </div >
        </>
    )

}

export default LoggedHome
