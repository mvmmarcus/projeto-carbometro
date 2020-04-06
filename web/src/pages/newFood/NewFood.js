import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiArrowLeft, FiX, FiCheck } from 'react-icons/fi';

import logoImg from '../../assets/carbLogo.png';

import './NewFood.css';
import api from '../../services/api';
import ListFoods from '../../components/ListFoods/ListFoods';
import { setFoodId } from '../../services/auth';
import EditFood from '../../components/ListFoods/EditFood/EditFood';

export default function NewFood() {

    const [filter, setFilter] = useState('');
    const [foodType, setFoodType] = useState('');
    const [bloodGlucose, setBloodGlucose] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [list, setList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [editFoods, setEditFoods] = useState([]);
    const [unitGram, setUnitGram] = useState('');
    const [selectedFoodId, setSelectedFoodId] = useState('');

    useEffect(() => {
        getFoods();
    }, [])

    async function getFoods() {

        await api.get('/foods')
            .then(response => {
                setList(response.data);
            })
            .catch(err => console.log(err));

    }

    function addFood(foodId) {

        setShowModal(true);
        setFilter('');
        setSelectedFoodId(foodId);

        list.map(food => {
            if (food._id === foodId) {
                setUnitGram(food.unitGram);
                setSelectedList([...selectedList, food]);
            }
            return null
        })

    }

    const hideModal = () => {
        setShowModal(false);
    }

    const handleEditFood = (gram) => {
        setFilter('');
        setShowModal(false);
        console.log(selectedList)
        console.log(gram)
        selectedList.map(food => {
            if (food._id === selectedFoodId) {
                let newCho = ((gram * food.cho) / food.unitGram)
                setEditFoods([
                    ...editFoods,
                    { _id: food._id, name: food.name, measure: food.measure, addGram: gram, choCal: newCho }
                ])

                console.log(newCho)
            }

            return null
        })

    }

    return (
        <div className="new-food-container" >
            <header>
                <img src={logoImg} alt="Logo Carb" />

                <button type="button" >
                    <FiLogOut size={16} color="#D45812" />
                </button>
            </header>
            <div className="content" >

                {
                    (editFoods.length > 0) && (
                        <div className="selected-foods" >

                            <EditFood editFoods={editFoods} />

                        </div>
                    )
                }

                <div className="form-group" >
                    <section >

                        <h1>Cadastrar nova refeição</h1>

                    </section>
                    <form >
                        <input
                            placeholder="Glicemia atual"
                            value={bloodGlucose}
                            onChange={e => setBloodGlucose(e.target.value)}
                        />
                        <select value={foodType} onChange={e => setFoodType(e.target.value)}>
                            <option value=""> Tipo da Refeição: </option>
                            <option value="breakfastCHO"> Café da Manhã </option>
                            <option value="lunchCHO"> Almoço </option>
                            <option value="afternoonSnackCHO"> Lanche da Tarde </option>
                            <option value="dinnerCHO"> Jantar </option>
                        </select>
                        {
                            showModal ? (
                                <>
                                    <label>Insira o peso (g ou ml):</label>
                                    <input
                                        placeholder="Peso (g ou ml)"
                                        value={unitGram}
                                        onChange={e => setUnitGram(e.target.value)}
                                    />
                                    <div style={{ justifyContent: "center", display: "flex" }} >
                                        <FiX style={{ marginRight: 40 }} cursor="pointer" onClick={hideModal} size={24} color="red" />
                                        <FiCheck style={{ marginLeft: 40 }} cursor="pointer" onClick={() => handleEditFood(unitGram)} size={24} color="green" />
                                    </div>

                                </>
                            ) : (
                                    <>
                                        <div className="search-group" >
                                            <input
                                                placeholder="Pesquise pelo alimento..."
                                                value={filter}
                                                onChange={e => setFilter(e.target.value)}
                                            />
                                            <button onClick={() => setFilter('')} type="button" >
                                                <FiX color="#333" size={18} />
                                            </button>
                                        </div>
                                    </>
                                )
                        }
                        <div className="listbox-container">
                            <ListFoods addFood={addFood} filter={filter} list={list} setList={setList} />
                        </div>

                        <button type="submit" className="button" >Cadastrar</button>
                    </form>
                    <Link style={{ marginRight: "auto" }} className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#D45812" />
                        Voltar para home
                    </Link>
                </div>

            </div>
        </div>
    )
}
