import React, { useState } from 'react'
import { logout } from '../../services/auth'
import { Redirect } from 'react-router';

const LoggedHome = () => {

    const [redirect, setRedirect] = useState(false);

    async function handleLogout(e) {
        e.preventDefault()

        logout();

        setRedirect(true);
    }

    if (redirect) return <Redirect to="/" />

    return (
        <div id="root" >
            <button onClick={handleLogout} >Logout</button>
        </div >
    )

}

export default LoggedHome
