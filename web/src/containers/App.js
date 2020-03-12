import React, { useState, useEffect } from 'react';
import Routes from '../components/Routes'

import './App.css'

const App = () => {

    const [token, setToken] = useState(false);

    //setToken.bind(this); testar sem

    useEffect(() => {
        setToken(!!localStorage.getItem('user-token'));
    }, [])

    return (
        <main className="App">
            <Routes setToken={setToken} token={token} />
        </main>
    )

}
export default App
