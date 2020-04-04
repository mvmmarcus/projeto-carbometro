import React, { useState, useEffect } from 'react'

import { getId } from '../../services/auth';
import authApi from '../../services/authApi';
import api from '../../services/api';

import GlucoseItem from '../../components/GlucoseItem/';
import ModalItem from '../../components/ModalItem/';
import ListFoods from '../../components/ListFoods/ListFoods'

import './LoggedHome.css'

function LoggedHome() {

    const [glucoses, setGlucoses] = useState([""]);
    const [value, setValue] = useState(String);
    const [roda, setRoda] = useState(Boolean);
    const [newValue, setNewValue] = useState(String);

    const [foodType, setFoodType] = useState('');

    const [show, setShow] = useState(false);

    const [showGlucoses, setShowGlucoses] = useState(false);
    const [showCalculate, setShowCalculate] = useState(false);

    const [filter, setFilter] = useState(String);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const id = getId();

    /*useEffect(() => {
        const id = getId();

        async function loadGlucoses() {

            const response = await api.get(`/get_glucose/${id}`);

            setGlucoses(response.data);

        }

        loadGlucoses();

        setRoda(false);

    }, [roda]);*/

    /*async function handleAddCarbTotal(e) {
        e.preventDefault();

        const response = await authApi.post(`/user/add_newFood/${id}`, {
            value,
            foodType
        });

        setValue('');

        setGlucoses([...glucoses, response.data]);

        setRoda(true);

        setShowCalculate(false);

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
                    !showCalculate && !showGlucoses && (
                        <div className="Logged-Home-Functions">

                            <button onClick={() => setShowCalculate(true)} className="Redirect-Btn">
                                <h1>Nova refeição</h1>
                            </button>

                            <button onClick={() => setShowGlucoses(true)} className="Redirect-Btn">
                                <h1>Relatório de glicemias</h1>
                            </button>

                        </div>
                    )
                }

                {
                    showGlucoses && (
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
                    )
                }
            </div>
            <div>
                {
                    showCalculate && !showGlucoses && (
                        <>

                            <div>
                                <label >
                                    Pesquisar Alimento:
                                        <input
                                        placeholder="Busque por um alimento"
                                        className="ModalItem-Field"
                                        value={filter}
                                        onChange={e => setFilter(e.target.value)}
                                    />
                                </label>
                            </div>

                            <ul>
                                <ListFoods foodType={foodType} value={value} filter={filter} />
                            </ul>

                            <div>

                                <label>
                                    Tipo da Refeição:
                                        <select className="ModalItem-Field" value={foodType} onChange={e => setFoodType(e.target.value)}>
                                        <option value=""> Selecione </option>
                                        <option value="breakfastCHO"> Café da Manhã </option>
                                        <option value="lunchCHO"> Almoço </option>
                                        <option value="afternoonSnackCHO"> Lanche da Tarde </option>
                                        <option value="dinnerCHO"> Jantar </option>
                                    </select>
                                </label>
                            </div>
                            <div>
                                <label >
                                    Insira a Glicemia:
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

                            {/*<div>
                                    <button type="submit" className="save-food" >Adicionar Refeição</button>
                                </div> */}

                        </>
                    )
                }
            </div>
            <div>
                <div>
                    <ModalItem show={show} setShow={setShow} handleClose={handleClose} />
                </div>
            </div>
        </>
    )
}


export default LoggedHome;