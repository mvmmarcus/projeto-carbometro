import React, { useState, useEffect } from 'react'

import { getId } from '../../services/auth';
import authApi from '../../services/authApi';
import api from '../../services/api';

import '../../pages/login/Login.css'

import GlucoseItem from '../../components/GlucoseItem/';
import ModalItem from '../../components/ModalItem/';

import './LoggedHome.css'

function LoggedHome() {

    const [glucoses, setGlucoses] = useState([]);
    const [value, setValue] = useState(String);
    const [roda, setRoda] = useState(Boolean);
    const [newValue, setNewValue] = useState(String);

    const [carbTotal, setCarbTotal] = useState('');
    const [b, setB] = useState('');

    const [show, setShow] = useState(false);

    const [showGlucoses, setShowGlucoses] = useState(false);
    const [showCalculate, setShowCalculate] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = getId();

    useEffect(() => {
        const id = getId();

        async function loadGlucoses() {

            const response = await api.get(`/get_glucose/${id}`);

            setGlucoses(response.data);

        }

        loadGlucoses();

        setRoda(false);

    }, [roda]);

    async function handleAddCarbTotal(e) {
        e.preventDefault();

        const response = await authApi.post(`/user/add_newFood/${id}`, {
            value,
            carbTotal,
            b
        });

        setValue('');

        setGlucoses([...glucoses, response.data]);

        setRoda(true);

        setCarbTotal('');

        setShowCalculate(false);

    }

    /*async function handleAddGlucose(e) {
        e.preventDefault();

        const response = await authApi.post(`/insert_glucose/${id}`, {
            value
        });

        setValue('');

        setGlucoses([...glucoses, response.data]);

        setRoda(true)

    }*/

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
        <>
            <div id="app" >
                <div className="config-field" >
                    <button title="concluir o cadastro" className="Btn-config" onClick={handleShow}>
                        <i className="material-icons" >build</i>
                    </button>
                </div>
                {
                    showGlucoses ? (
                        <div>
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
                    ) : (

                            <header>
                                <button onClick={() => setShowGlucoses(true)} >Listar Glicemias</button>
                                <button onClick={() => setShowCalculate(true)} >Nova refeição</button>
                            </header>

                        )
                }
            </div>
            <div>
                {
                    showCalculate && (
                        <>
                            <form onSubmit={handleAddCarbTotal}>
                                <div id="app" >
                                <div>
                                        <label >
                                            Insira o Tipo da Refeição
                                        <input
                                                placeholder="Tipo da Refeição"
                                                className="ModalItem-Field"
                                                name="glucose"
                                                id="glucose"
                                                value={b}
                                                onChange={e => setB(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label >
                                            Insira a Glicemia
                                        <input
                                                placeholder="Glicemia *"
                                                className="ModalItem-Field"
                                                name="glucose"
                                                id="glucose"
                                                value={value}
                                                onChange={e => setValue(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            Carb Total da Refeição :
                                        <input
                                                placeholder="Carb Total (g)"
                                                className="ModalItem-Field"
                                                name="carb_total"
                                                id="carb_total"
                                                required value={carbTotal}
                                                onChange={(e) => setCarbTotal(e.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <button type="submit" >Salvar</button>
                                </div>
                            </form>

                        </>
                    )
                }
            </div>
            <div>
                <div>
                    <ModalItem show={show} setShow={handleClose} handleClose={handleClose} />
                </div>
            </div>
        </>
    )
}


export default LoggedHome;