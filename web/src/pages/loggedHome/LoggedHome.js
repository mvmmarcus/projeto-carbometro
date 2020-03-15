import React, { useState, useEffect } from 'react'

import { getId } from '../../services/auth';
import authApi from '../../services/authApi';
import api from '../../services/api';

import GlucoseItem from '../../components/GlucoseItem/';
import AddItem from '../../components/AddGlucoseItem';
import ModalItem from '../../components/ModalItem/';

import './LoggedHome.css'

function LoggedHome() {

    const [glucoses, setGlucoses] = useState([]);
    const [value, setValue] = useState(String)
    const [roda, setRoda] = useState(Boolean)
    const [newValue, setNewValue] = useState(String)

    const id = getId();

    useEffect(() => {
        const id = getId();

        async function loadGlucoses() {

            const response = await api.get(`/get_glucose/${id}`);

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

        setValue('');

        setGlucoses([...glucoses, response.data]);

        setRoda(true)

    }

    async function updateTask(glucoseId) {

        await authApi.put(`/update_glucose/${id}/${glucoseId}`, {
            valor: newValue
        })
            .then((response) => {
                console.log(newValue)
                setGlucoses([...glucoses, response.data]);
                console.log(response.data)
                setRoda(true)
                setNewValue('')
            })
            .catch(err => {
                console.log(err)
            })
    }

    async function deleteTask(glucoseId) {

        glucoses.splice(glucoseId, 1);
        const response = await authApi.delete(`/delete_glucose/${id}/${glucoseId}`)

        setGlucoses([...glucoses, response.data]);

        setRoda(true);

    }


    return (
        <div id="app">
            <>
                <div>
                    <div  >
                        <ModalItem/>
                    </div>
                </div>
            </>
            <AddItem
                onChange={e => setValue(e.target.value)}
                value={value}
                handleAdd={handleAddGlucose}
            />
            <div>
                {
                    glucoses.map((item) => (
                        <GlucoseItem
                            key={Object.values(item)}
                            glucose={item}
                            onDelete={() => deleteTask(item._id)}
                            save={() => updateTask(item._id)}
                            onChange={e => setNewValue(e.target.value)}
                            value={newValue}
                        />
                    ))
                }

            </div>
        </div>
    )
}


export default LoggedHome;