import React from 'react';

import './styles.css';

function GlucoseItem({ onChange, onDelete, glucose }) {
    return (
        <li className="glucose-item" >
            <div className="glucose-info" >
                <input 
                className="Item-Field"
                onChange={onChange}
                value={glucose.value}
                />
                {/*<strong onChange={onChange} >{glucose.value}</strong>*/}
                <p onChange={onChange} >{glucose.createdAt}</p>
                <button onClick={onDelete} >Excluir</button>
            </div>
        </li>
    )
}

export default GlucoseItem;