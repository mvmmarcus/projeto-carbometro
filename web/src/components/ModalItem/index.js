import React, { useState, useEffect } from 'react';
import './ModalItem.css'

import { Button, Modal } from 'react-bootstrap';
import { TabContent, TabPane, Nav, NavItem } from 'reactstrap';
import classnames from 'classnames';

import { getId } from '../../services/auth';
import authApi from '../../services/authApi';
import api from '../../services/api';

export default function ModalItem({ show, handleClose, setShow }) {

    const [born, setBorn] = useState(String);
    const [weight, setWeight] = useState(String);
    const [breakfastCHO, setBreakfastCHO] = useState('');
    const [lunchCHO, setLunchCHO] = useState('');
    const [afternoonSnackCHO, setAfternoonSnackCHO] = useState('');
    const [dinnerCHO, setDinnerCHO] = useState('');
    const [height, setHeight] = useState('');
    const [sexo, setSexo] = useState('');
    const [typeDm, setTypeDm] = useState('');
    const [fc, setFc] = useState('');
    const [target_glucose, setTargetGlucose] = useState('');
    const [showw, setShoww] = useState(Boolean);
    const [activeTab, setActiveTab] = useState('1'); //seta tab inicial a primeira

    const close = () => setShoww(false);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab); //função para alternar entre as tabs
    }

    async function handleSubmitInfos(e) {
        e.preventDefault()

        const id = getId();

        await authApi.post(`/user/add_infos/${id}`,
            {
                born,
                weight,
                breakfastCHO,
                lunchCHO,
                afternoonSnackCHO,
                dinnerCHO,
                height,
                sexo,
                typeDm,
                fc,
                target_glucose
            })
            .then(response => {
                console.log(response.data);
                console.log('deu certo')
            })
            .catch(err => {
                console.log(err)
                console.log('deu erro')
            })

        setShow(false);
        setShoww(false)

    }

    useEffect(() => {

        async function getUserInfo() {

            const id = getId();

            await api.get(`users/${id}`)
                .then(response => {
                    const peso = response.data.user.height;

                    if (peso) {
                        setShoww(false)
                    }
                    else {
                        setShoww(true)
                    }

                })
                .catch(err => console.log(err))
        }

        getUserInfo();

    }, []);

    return (
        <>
            <Modal className="Modal" show={show} onHide={handleClose}>
                <Modal.Header className="Modal-header">
                    <Modal.Title>
                        <Nav tabs>
                            <NavItem className="Tabs">
                                <button
                                    className={classnames({ active: activeTab === '1' }, "Tabs-btn")}
                                    onClick={() => { toggle('1'); }}
                                >
                                    Dados pessoais
                                </button>
                            </NavItem>
                            <NavItem className="Tabs">
                                <button
                                    className={classnames({ active: activeTab === '2' }, "Tabs-btn")}
                                    onClick={() => { toggle('2'); }}
                                >
                                    Bolus
                                </button>
                            </NavItem>
                        </Nav>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="Modal-body">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <h4 className="textModal" >Insira seus dados pessoais</h4>
                            <form onSubmit={handleSubmitInfos}>
                                <div>
                                    <label>
                                        Data nasc:
                                        <input
                                            placeholder="dd/mm/aaaa"
                                            className="ModalItem-Field"
                                            name="born"
                                            id="born"
                                            required value={born}
                                            onChange={(e) => setBorn(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Peso:
                                        <input
                                            placeholder="kg"
                                            className="ModalItem-Field"
                                            name="weight"
                                            id="weight"
                                            required value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Altura:
                                        <input
                                            placeholder="exemplo - 1.80"
                                            className="ModalItem-Field"
                                            name="height"
                                            id="height"
                                            required value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Sexo:
                                        <select className="ModalItem-Field" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                                            <option value=""> Selecione </option>
                                            <option value="masculino"> Masculino </option>
                                            <option value="feminino"> Feminino </option>
                                        </select>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Tipo de diabetes:
                                        <select className="ModalItem-Field" value={typeDm} onChange={(e) => setTypeDm(e.target.value)}>
                                            <option value=""> Selecione </option>
                                            <option value="dm1"> Tipo 1 </option>
                                            <option value="dm2"> Tipo 2 </option>
                                            <option value="dmlada"> Tipo Lada </option>
                                            <option value="dmgestacional"> Gestacional </option>
                                        </select>
                                    </label>
                                </div>
                            </form>
                        </TabPane>
                        <TabPane tabId="2">
                            <h4 className="textModal" >Insira seus parâmetros para Bolus</h4>
                            <form onSubmit={handleSubmitInfos}>
                                <div>
                                    <label>
                                        Café da manhã (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="breakfastCHO"
                                            id="breakfastCHO"
                                            required value={breakfastCHO}
                                            onChange={(e) => setBreakfastCHO(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Almoço (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="lunchCHO"
                                            id="lunchCHO"
                                            required value={lunchCHO}
                                            onChange={(e) => setLunchCHO(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Lanche da tarde (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="afternoonSnackCHO"
                                            id="afternoonSnackCHO"
                                            required value={afternoonSnackCHO}
                                            onChange={(e) => setAfternoonSnackCHO(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Jantar (Bolus):
                                        <input
                                            placeholder="relação insulina/CHO"
                                            className="ModalItem-Field"
                                            name="dinnerCHO"
                                            id="dinnerCHO"
                                            required value={dinnerCHO}
                                            onChange={(e) => setDinnerCHO(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Fator de Correção:
                                        <input
                                            placeholder="Fator de Correção"
                                            className="ModalItem-Field"
                                            name="fator_corecao"
                                            id="fator_corecao"
                                            required value={fc}
                                            onChange={(e) => setFc(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Glicemia Alvo:
                                        <input
                                            placeholder="Glicemia Alvo"
                                            className="ModalItem-Field"
                                            name="glicemia_alvo"
                                            id="glicemia_alvo"
                                            required value={target_glucose}
                                            onChange={(e) => setTargetGlucose(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <button className="ModalSave-Btn" type="submit">Salvar</button>
                            </form>
                        </TabPane>
                    </TabContent>
                </Modal.Body>
                <Modal.Footer className="Modal-footer">
                    <Button variant="danger" onClick={handleClose} > Cancelar </Button>
                </Modal.Footer>
            </Modal>
                )
            {
                showw && (
                    <Modal className="Modal" show={showw} onHide={handleClose}>
                        <Modal.Header className="Modal-header">
                            <Modal.Title>
                                <Nav tabs>
                                    <NavItem className="Tabs">
                                        <button
                                            className={classnames({ active: activeTab === '1' }, "Tabs-btn")}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            Dados pessoais
                                </button>
                                    </NavItem>
                                    <NavItem className="Tabs">
                                        <button
                                            className={classnames({ active: activeTab === '2' }, "Tabs-btn")}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            Bolus
                                </button>
                                    </NavItem>
                                </Nav>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="Modal-body">
                            <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <h4 className="textModal" >Insira seus dados pessoais</h4>
                                    <form onSubmit={handleSubmitInfos}>
                                        <div>
                                            <label>
                                                Data nasc:
                                        <input
                                                    placeholder="dd/mm/aaaa"
                                                    className="ModalItem-Field"
                                                    name="born"
                                                    id="born"
                                                    required value={born}
                                                    onChange={(e) => setBorn(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Peso:
                                        <input
                                                    placeholder="kg"
                                                    className="ModalItem-Field"
                                                    name="weight"
                                                    id="weight"
                                                    required value={weight}
                                                    onChange={(e) => setWeight(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Altura:
                                        <input
                                                    placeholder="exemplo - 1.80"
                                                    className="ModalItem-Field"
                                                    name="height"
                                                    id="height"
                                                    required value={height}
                                                    onChange={(e) => setHeight(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Sexo:
                                        <select className="ModalItem-Field" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                                                    <option value=""> Selecione </option>
                                                    <option value="masculino"> Masculino </option>
                                                    <option value="feminino"> Feminino </option>
                                                </select>
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Tipo de diabetes:
                                        <select className="ModalItem-Field" value={typeDm} onChange={(e) => setTypeDm(e.target.value)}>
                                                    <option value=""> Selecione </option>
                                                    <option value="dm1"> Tipo 1 </option>
                                                    <option value="dm2"> Tipo 2 </option>
                                                    <option value="dmlada"> Tipo Lada </option>
                                                    <option value="dmgestacional"> Gestacional </option>
                                                </select>
                                            </label>
                                        </div>
                                    </form>
                                </TabPane>
                                <TabPane tabId="2">
                                    <h4 className="textModal" >Insira seus parâmetros para Bolus</h4>
                                    <form onSubmit={handleSubmitInfos}>
                                        <div>
                                            <label>
                                                Café da manhã (Bolus):
                                        <input
                                                    placeholder="relação insulina/CHO"
                                                    className="ModalItem-Field"
                                                    name="breakfastCHO"
                                                    id="breakfastCHO"
                                                    required value={breakfastCHO}
                                                    onChange={(e) => setBreakfastCHO(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Almoço (Bolus):
                                        <input
                                                    placeholder="relação insulina/CHO"
                                                    className="ModalItem-Field"
                                                    name="lunchCHO"
                                                    id="lunchCHO"
                                                    required value={lunchCHO}
                                                    onChange={(e) => setLunchCHO(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Lanche da tarde (Bolus):
                                        <input
                                                    placeholder="relação insulina/CHO"
                                                    className="ModalItem-Field"
                                                    name="afternoonSnackCHO"
                                                    id="afternoonSnackCHO"
                                                    required value={afternoonSnackCHO}
                                                    onChange={(e) => setAfternoonSnackCHO(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Jantar (Bolus):
                                        <input
                                                    placeholder="relação insulina/CHO"
                                                    className="ModalItem-Field"
                                                    name="dinnerCHO"
                                                    id="dinnerCHO"
                                                    required value={dinnerCHO}
                                                    onChange={(e) => setDinnerCHO(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Fator de Correção:
                                        <input
                                                    placeholder="Fator de Correção"
                                                    className="ModalItem-Field"
                                                    name="fator_corecao"
                                                    id="fator_corecao"
                                                    required value={fc}
                                                    onChange={(e) => setFc(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                Glicemia Alvo:
                                        <input
                                                    placeholder="Glicemia Alvo"
                                                    className="ModalItem-Field"
                                                    name="glicemia_alvo"
                                                    id="glicemia_alvo"
                                                    required value={target_glucose}
                                                    onChange={(e) => setTargetGlucose(e.target.value)}
                                                />
                                            </label>
                                        </div>
                                        <button className="ModalSave-Btn" type="submit">Salvar</button>
                                    </form>
                                </TabPane>
                            </TabContent>
                        </Modal.Body>
                        <Modal.Footer className="Modal-footer">
                            <Button variant="danger" onClick={close} > Cancelar </Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </>
    )
}