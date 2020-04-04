import React, { useState, useEffect } from 'react';

import '../../pages/loggedHome/LoggedHome.css'
import api from '../../services/api';
import EditFood from './EditFood/EditFood';
import { setFoodId } from '../../services/auth';

export default function ListFoods(props) {

    const [list, setList] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [show, setShow] = useState(false);
    const [glicemia, setGlicemia] = useState(Number);
    const [foodType, setFoodType] = useState('');


    useEffect(() => {
        setGlicemia(props.value);
        setFoodType(props.foodType);
    }, [props.value, props.foodType]);

    useEffect(() => {
        getFoods();
    }, [])

    async function getFoods() {

        await api.get('/foods')
            .then(response => {
                setList(response.data)
            })
            .catch(err => console.log(err))

    }

    function handleAdd(foodId) {
        
        setFoodId(foodId);
        setShow(true);

        function showSelected() {

            list.map(food => {
                if (food._id === foodId) {
                    setSelectedList([...selectedList, food])
                }
                return null
            })
        }

        showSelected();

    }

    return (
        <>
            <div>
                <EditFood
                    selectedList={selectedList}
                    setSelectedList={setSelectedList}
                    show={show}
                    setShow={setShow}
                    close={() => setShow(false)}
                    glicemia={glicemia}
                    foodType={foodType}
                />
            </div>

            {props.filter ? (
                <div className="Table">
                    <table className="table table-hover">
                        <thead>
                            <tr>

                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>Nome</th>
                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>Medida</th>
                                <th style={{ width: 130, textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>g ou ml</th>
                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>CHO</th>
                                <th style={{ textAlign: 'center', fontSize: 18, backgroundColor: 'rgba(233, 72, 8, 0.959)' }}>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list.map(food => {
                                    if (props.filter.length !== 0) {
                                        const name = food.name;
                                        if (name.toLowerCase().startsWith(props.filter.toLowerCase())) {
                                            return (
                                                <tr key={food._id} style={{ textAlign: 'center', backgroundColor: 'rgba(223, 221, 221, 0.959)' }}>

                                                    <td>{food.name}</td>
                                                    <td>{food.measure}</td>
                                                    <td>{food.unitGram}</td>
                                                    <td>{food.cho}</td>
                                                    <td><button onClick={() => handleAdd(food._id)}>Editar</button></td>
                                                </tr>
                                            )
                                        } else {
                                            return null;
                                        }
                                    }
                                    return null
                                })
                            }
                        </tbody>
                    </table>
                </div>
            ) : ('')}

        </>
    )
}