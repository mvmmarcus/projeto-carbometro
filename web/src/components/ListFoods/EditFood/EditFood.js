import React, { useState } from 'react';
import '../../ModalItem/ModalItem.css';

import authApi from '../../../services/authApi';
import { Modal, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { getFoodId, getId } from '../../../services/auth';

export default function EditFood(props) {

    const [value, setValue] = useState(Number);
    const [editFoods, setEditFoods] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const [showEdit, setShowEdit] = useState(false);

    let foodId = getFoodId();

    useEffect(() => {

        setSelectedList(props.selectedList)

    }, [props.selectedList])

    const handleEditFood = gram => {
        console.log(selectedList)
        console.log(gram)
        selectedList.map(food => {
            if (food._id === foodId) {
                let newCho = ((gram * food.cho) / food.unitGram)
                setEditFoods([
                    ...editFoods,
                    { _id: food._id, name: food.name, measure: food.measure, addGram: gram, choCal: newCho }
                ])

                console.log(newCho)
            }

            return null
        })

        props.close();

    }

    const handleDeleteFood = id => {
        console.log(id)

        setEditFoods(editFoods.filter(food => food._id !== id))

    }

    async function handleAddFood(e) {
        e.preventDefault();
        const userId = getId();

        function calTotalCho() {
            let total = editFoods.reduce((total, food) => total + food.choCal, 0);
            return total;
        }
        const totalCho = calTotalCho();
        console.log(totalCho);
        console.log(props.glicemia);
        console.log(props.foodType);

        await authApi.post(`/user/add_newFood/${userId}`, {
            value: props.glicemia,
            foodType: props.foodType,
            totalCho: totalCho,
            refeicoes: editFoods
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))

    }

    useEffect(() => {
        if (editFoods.length > 0) {

            console.log(editFoods)

        }

    }, [editFoods])

    return (
        <>
            <button onClick={() => setShowEdit(true)} >Mostrar Selecionados</button>
            <div>
                {
                    showEdit > 0 && (
                        <div id="table" style={{ background: "rgba(233, 72, 8, 0.959)", color: "black", position: "absolute", width: 250 }}  >
                            <strong >Alimentos selecionados: </strong>
                            {
                                editFoods.map(food => (
                                    <>
                                        <span style={{ background: "rgba(223, 221, 221, 0.959)", display: "block" }} >{food.name}</span>
                                        <button onClick={() => handleDeleteFood(food._id)} >Remover</button>
                                    </>
                                ))
                            }
                            <div>
                                <button onClick={() => setShowEdit(false)} >Ocultar Selecionados</button>
                                <button onClick={handleAddFood} >Finalizar</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <Modal className="Modal" show={props.show} onHide={props.setShow} >
                <Modal.Header className="Modal-header" >
                    <h1>Insira as informações abaixo:</h1>
                </Modal.Header>
                <Modal.Body className="Modal-body" >
                    <label>Quantidade (g ou ml)</label>
                    <input
                        onChange={e => setValue(e.target.value)}
                        className="ModalItem-Field"
                        value={value}
                        type="number"
                    />
                    <Modal.Footer>
                        <Button onClick={() => handleEditFood(value)} className="ModalSave-Btn" >Salvar</Button>
                        <Button variant="danger" onClick={props.close} > Cancelar </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    )
}