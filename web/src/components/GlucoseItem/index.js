import React, { useState } from 'react';

import './styles.css';

import moment from 'moment';

function GlucoseItem({ glucose, onDelete, save, onChange, value }) {

    const [editar, setEditar] = useState(false)


    return (
        <div>
            <div className="glucoses-info">
                <>
                    {glucose.updatedAt ? (
                        <div className="updatedAt-value">
                            <strong>Editado: {moment(new Date(glucose.updatedAt)).format('D/MM - h:mm A')} </strong>
                        </div>
                    ) : (
                            <div className="createdAt-value">
                                <strong> {moment(new Date(glucose.createdAt)).format('D/MM - h:mm A')} </strong>
                            </div>
                        )}
                    {glucose.value >= 70 && glucose.value < 80 ? (
                        <div className="Padrao-value">
                            <h1>{glucose.value} mg/dl</h1>
                        </div>
                    ) : ('')}
                    {
                        glucose.value > 140 && glucose.value <= 180 ? (
                            <div className="Padrao-value">
                                <h1>{glucose.value} mg/dl</h1>
                            </div>
                        ) : ('')
                    }
                    {glucose.value >= 80 && glucose.value <= 140 ? (
                        <div className="Uni-value">
                            <h1>{glucose.value} mg/dl</h1>
                        </div>
                    ) : ('')}
                    {glucose.value > 180 && glucose.value !== 200 && glucose.value !== 300 && glucose.value !== 400 ? (
                        <div className="Hiper-value">
                            <h1> {glucose.value} mg/dl </h1>
                            <strong> Hiper </strong>
                        </div>
                    ) : ('')}
                    {glucose.value < 70 ? (
                        <div className="Hipo-value">
                            <h1> {glucose.value} mg/dl </h1>
                            <strong> Hipo </strong>
                        </div>
                    ) : ('')}

                </>

                {editar ? (
                    <>
                        <input className="input-btn"
                            value={value}
                            onChange={onChange}
                        />
                        <button className="btn-save" onClick={save}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button className="btn-cancel" onClick={() => { setEditar(false) }}>
                            <i class="fa fa-times"></i>
                        </button>

                    </>

                ) : (

                        <>

                            <button className="btn-edit" onClick={() => setEditar(true)}>
                                <i className="fas fa-pen"></i>
                            </button>
                            <button className="btn-delete" onClick={onDelete}>
                                <i className="fas fa-trash-alt"></i>
                            </button>

                        </>

                    )}

            </div>
        </div>
    )

}

export default GlucoseItem;