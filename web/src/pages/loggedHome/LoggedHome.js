import React, { useState, useEffect } from 'react'

import { getId } from '../../services/auth';
import authApi from '../../services/authApi';
import api from '../../services/api';

import GlucoseItem from '../../components/GlucoseItem/';
import ModalItem from '../../components/ModalItem/';

import './LoggedHome.css'

function LoggedHome() {

    const [glucoses, setGlucoses] = useState([""]);
    const [value, setValue] = useState(String);
    const [roda, setRoda] = useState(Boolean);
    const [newValue, setNewValue] = useState(String);

    const [carbTotal, setCarbTotal] = useState('');
    const [foodType, setFoodType] = useState('');

    const [show, setShow] = useState(false);

    const [showGlucoses, setShowGlucoses] = useState(false);
    const [showCalculate, setShowCalculate] = useState(false);


    const [filter, setFilter] = useState("");
    const [list, setList] = useState([]);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function loadFoods() {

        await api.get('/food')
            .then(responseData => {
                console.log(responseData.data)
                setList(responseData.data)
            })

    }

    useEffect(() => {

        loadFoods();
    },

        []);

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
            foodType
        });

        setValue('');

        setGlucoses([...glucoses, response.data]);

        setRoda(true);

        setCarbTotal('');

        setShowCalculate(false);

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
                            <>

                                <div>
                                    <ul>
                                        {
                                            !showCalculate && (
                                                list.map(food => {
                                                    if (filter.length !== 0) {
                                                        const name = food.name;
                                                        if (name.toLowerCase().startsWith(filter.toLowerCase())) {
                                                            return (
                                                                <li>
                                                                    <h2 id="foodName" >{food.name}</h2>
                                                                </li>
                                                            )
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                    return null
                                                })
                                            )
                                        }
                                    </ul>

                                </div>
                            </>
                        )
                }
            </div>
            <div>
                {
                    showCalculate && !showGlucoses && (
                        <>
                            <form onSubmit={handleAddCarbTotal}>
                                <div id="app" >
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
                                    <div>
                                        <label>
                                            Carb Total da Refeição:
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
                                    <div>
                                        <label >
                                            Busque pelo alimento:
                                            <input
                                                placeholder="Buscar alimento"
                                                className="ModalItem-Field"
                                                value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                            />
                                        </label>
                                        <ul>
                                            {
                                                list.map(food => {
                                                    if (filter.length !== 0) {
                                                        const name = food.name;
                                                        if (name.toLowerCase().startsWith(filter.toLowerCase())) {
                                                            return (
                                                                <div className="Table">
                                                                    <table className="table table-hover">
                                                                        <thead>
                                                                            <tr>
                                                                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>Nome</th>
                                                                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>Medida</th>
                                                                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>g ou ml</th>
                                                                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>CHO</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr style={{ textAlign: 'center', backgroundColor: 'rgba(223, 221, 221, 0.959)' }}>
                                                                                <td>{food.name}</td><td>{food.measure}</td><td>{food.unitGram}</td><td>{food.cho}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            )
                                                        } else {
                                                            return null;
                                                        }
                                                    }
                                                    return null
                                                })

                                            }
                                        </ul>
                                    </div>
                                    <button type="submit" className="save-food" >Adicionar Refeição</button>
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