import React, { useState, useEffect } from 'react'

//import api from '../../services/api';
import { getId } from '../../services/auth';
import authApi from '../../services/authApi';
//import api from '../../services/api';

import GlucoseItem from '../../components/GlucoseItem/index'
import api from '../../services/api';

const LoggedHome = () => {

    const [glucoses, setGlucoses] = useState([]);
    const [value, setValue] = useState('')
    const [roda, setRoda] = useState(false)

    const id = getId();

    //let i = 0;

    useEffect(() => {
        const id = getId();
        async function loadGlucoses() {


            const response = await api.get(`/get_glucose/${id}`);

            console.log(response.data)

            setGlucoses(response.data);

        }

        loadGlucoses()

        setRoda(false)

    }, [roda]);

    async function handleAddGlucose(e) {
        e.preventDefault();

        const response = await authApi.post(`/insert_glucose/${id}`, {
            value
        });

        // i++;

        setValue('');

        setGlucoses([...glucoses, response.data]);

        setRoda(true)


    }

    async function updateTask({target}, glucoseId) {

        const response = await authApi.put(`/update_glucose/${id}/${glucoseId}`, {
            valor: target.value
        })
            setGlucoses(response.data);
            
            //setRoda(true)
    }


    async function deleteTask(glucoseId) {

        glucoses.splice(glucoseId, 1);
        const response = await authApi.delete(`/delete_glucose/${id}/${glucoseId}`)

        setGlucoses(response.data)

        setRoda(true);

    }

    return (
        <div id="app">
            <aside>
                <h1>Informe a Glicemia</h1>
                <form onSubmit={handleAddGlucose}>
                    <div id="boot" >
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="glucose" ></label>
                        <input
                            placeholder="Glicemia *"
                            className="Login-Field"
                            name="glucose"
                            id="glucose"
                            required value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Adicionar</button>
                </form>
            </aside>
            <ul>
                {
                    glucoses.map((item) => {
                        return <GlucoseItem
                            key={Object.values(item)}
                            glucose={item}
                            onChange={(event) => updateTask(event, item._id)}
                            onDelete={() => deleteTask(item._id)}
                        />
                    })
                }
            </ul>
        </div>
    )

}

export default LoggedHome;
