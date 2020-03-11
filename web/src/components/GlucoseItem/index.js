import React, { useState } from 'react';

import './styles.css';

function GlucoseItem({ glucose, onDelete, save, onChange, value }) {

    const [editar, setEditar] = useState(false)

    return (
        <>
            <div>
                <h1>{glucose.value}</h1>
                <p>{glucose.createdAt}</p>
                {

                    !editar ? (
                        <>
                            <button className="btn-edit" onClick={() => setEditar(true)}>
                                <i className="fas fa-pen"></i>
                            </button> <button className="btn-delete" onClick={onDelete}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </>
                    ) : (
                            <>
                                <label htmlFor="glicemia"></label>
                                <input onChange={onChange} name="glicemia" value={value} placeholder="glicemia" />
                                <button className="btn-save" onClick={save}>
                                    <i className="fas fa-check"></i>
                                </button>
                                <button onClick={() => setEditar(false)} >
                                    <i className="fa fa-times" ></i>
                                </button>
                            </>
                        )
                }
            </div>

        </>


    )

}

export default GlucoseItem;


/*

import React from 'react';

import './styles.css';

function GlucoseItem({ onDelete, glucose, save, value, onChange}) {
    return (
        <div className="glucose-info" >
            <h1>{glucose.value}</h1>
            //<strong onChange={onChange} >{glucose.value}</strong>
            <p>{glucose.createdAt}</p>
            <button onClick={onDelete} >Excluir</button>
            <div>
                <label htmlFor="glicemia"></label>
                <input onChange={onChange} name="glicemia" value={value} placeholder="glicemia" />
                <button onClick={save} >Alterar</button>
            </div>
        </div>

    )
}

export default GlucoseItem;

*/