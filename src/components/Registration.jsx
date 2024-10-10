import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './styles/home.css';
import phonePNG from '../assets/img/phone.png';
import passwdPNG from '../assets/img/passwd.png';
import namePNG from '../assets/img/name.png';
import { registration } from "../action/user";
import { getFilials } from "../action/filial"; // Импортируем getFilials для получения списка филиалов
import { useDispatch } from 'react-redux';

const Registration = () => {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [selectedFilial, setSelectedFilial] = useState(""); // Добавляем состояние для выбранного филиала
    const [filials, setFilials] = useState([]); // Состояние для списка филиалов

    const navigate  = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Загружаем список филиалов при загрузке компонента
        const fetchFilials = async () => {
            const allFilials = await getFilials();
            setFilials(allFilials);
        };
        fetchFilials();
    }, []);

    const handleRegistration = async () => {
        const registrationSuccess = await dispatch(registration(name, surname, phone, password, selectedFilial));
        if (registrationSuccess) {
            navigate("/main");
        }
    };

    return (
      <div className="auth">
        <div className="form">
            <h1 className="h1-auth">Регистрация</h1>
            <div className="input__div"><img src={namePNG} alt="person" className="phonePNG"/>
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="input" placeholder="Имя"/>
            </div>
            <div className="input__div"><img src={namePNG} alt="person" className="phonePNG"/>
                <input value={surname} onChange={(event) => setSurname(event.target.value)} type="text" className="input" placeholder="Фамилия"/>
            </div>
            <div className="input__div"><img src={phonePNG} alt="Phone" className="phonePNG"/>
                <input value={phone} onChange={(event) => setPhone(event.target.value)} type="number" className="input" placeholder="8............"/>
            </div>
            <div className="input__div">
                <select value={selectedFilial} onChange={(e) => setSelectedFilial(e.target.value)} className="input">
                    <option value="">Выберите филиал</option>
                    {filials.map(filial => (
                        <option key={filial.filial._id} value={filial.filial.filialText}>
                            {filial.filial.filialText} {/* Теперь сохраняем не ID, а название */}
                        </option>
                    ))}
                </select>
            </div>
            <div className="input__div"><img src={passwdPNG} alt="Password" className="phonePNG"/>
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="input" placeholder="Придумайте пароль"/>
            </div>
            
            {/* Выпадающий список для выбора филиала */}
           

            <button className="buttonLogin" onClick={handleRegistration}>Зарегистрироваться</button>
            <Link to="/login" className="link__auth">Войти</Link>
        </div>
      </div>
    );
}

export default Registration;
