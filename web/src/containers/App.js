import React, { useState, useEffect } from 'react';
import Routes from '../components/Routes';

import '../global.css';

const App = () => {

    const [logado, setLogado] = useState(false)

    useEffect(() => {

        if (localStorage.getItem("user-token")) {
            setLogado(true)
        } else {
            setLogado(false)
        }

    }, [])

    return (
        <Routes setLogado={setLogado} logado={logado} />
    )

}
export default App;


/*
import React, { useState, useEffect } from 'react';
import Routes from '../components/Routes'

import './App.css'

const App = () => {

    const [logado, setLogado] = useState(false)

    useEffect(() => {

        if (localStorage.getItem("user-token")) {
            setLogado(true)
        } else {
            setLogado(false)
        }

    }, [])

    return (
        <main className="App">
            <Routes setLogado={setLogado} logado={logado} />
        </main>
    )

}
export default App;
*/