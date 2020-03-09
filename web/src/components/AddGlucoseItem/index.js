import React from 'react';

import './styles.css';

function AddGlucoseItem({ handleAdd, onChange, value }) {
    return (
        <div>
            <aside>
                <h1>Informe a Glicemia</h1>
                <form onSubmit={handleAdd}>
                    <div id="boot" >
                    </div>
                    <div>
                        <label id="inputTitle" htmlFor="glucose" ></label>
                        <input
                            placeholder="Glicemia *"
                            className="Login-Field"
                            name="glucose"
                            id="glucose"
                            value={value}
                            onChange={onChange}
                        />
                    </div>
                    <button className="Login-Btn" type="submit">Adicionar</button>
                </form>
            </aside>
        </div>
    )

}

export default AddGlucoseItem;