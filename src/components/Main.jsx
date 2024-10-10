import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './styles/main.css';
import { getSettings } from '../action/settings';
import { getFilials } from '../action/filial';
// import filials from '../assets/icons/filials.svg';
import filial from '../assets/icons/filials.svg'
import guide from '../assets/icons/help-circle-outline.svg';
import geo from '../assets/icons/map-outline.svg';
// import handshake from '../assets/icons/people-circle-outline.svg';
import whatsapp from '../assets/img/whatsapp.png'
import news from '../assets/icons/news.svg';
import news2 from '../assets/icons/marketing.png';
import logo from '../assets/img/logo.jpg';

import Tab from './Tab';
import config from '../config';

import './styles/tab.css';
import house from '../assets/icons/home-outline.svg';
import house2 from '../assets/icons/home.svg';

import box from '../assets/icons/layers-outline.svg';
import box2 from '../assets/icons/layers.svg';

import user from '../assets/icons/person-circle-outline.svg';
import user2 from '../assets/icons/person-circle.svg';


const Main = () => {
    const location = useLocation();
    const [settings, setSettings] = useState([]);
    const [showAdress, setShowAdress] = useState(false); // Для управления видимостью всплывающего окна
    const [showFilials, setShowFilials] = useState(false); // Для управления видимостью всплывающего окна
    const [userData, setUserData] = useState(null);

    const [filials, setFilials] = useState([]); // Состояние для списка филиалов

    const fetchSettings = async () => {
        const allSettings = await getSettings();
        setSettings(allSettings || {}); 
    };
    

     // Функция для получения данных о филиалах при загрузке компонента
     useEffect(() => {

      
        fetchFilials(); // Вызываем функцию получения данных о филиалах при загрузке компонента
      }, []);


      const fetchFilials = async () => {
        // Вызываем функцию getFilials для получения данных о всех филиалах
        const allFilials = await getFilials();
        setFilials(allFilials); // Обновляем список филиалов
      };


      

    useEffect(() => {
        fetchSettings();

        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${config.apiUrl}/api/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserData(data.user);
                } else {
                    console.error('Failed to fetch user profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const toggleAdress = () => {
        setShowAdress(!showAdress);
    };

    const toggleFilials = () => {
        setShowFilials(!showFilials);
       
    };



    return (
        <div className="main">
            <header className="header header-main">
                <div className="LogoHeader">
                    <img src={logo} className="logo2" alt="" />
                </div>

                <ul className="Menu">
                    <Link to="/main" className="tabbutton-menu">
                        <img className="icons-svg" src={location.pathname === '/main' ? house2 : house} alt="" />
                        <p style={location.pathname === '/main' ? { color: '#1F800C' } : { color: '#808080' }}>Главная</p>
                    </Link>

                    <Link to="/parcels" className="tabbutton-menu">
                        <img className="icons-svg" src={location.pathname === '/parcels' ? box2 : box} alt="" />
                        <p style={location.pathname === '/parcels' ? { color: '#1F800C' } : { color: '#808080' }}>Посылки</p>
                    </Link>

                    <Link to="/profile" className="tabbutton-menu">
                        <img className="icons-svg" src={location.pathname === '/profile' ? user2 : user} alt="" />
                        <p style={location.pathname === '/profile' ? { color: '#1F800C' } : { color: '#808080' }}>Профиль</p>
                    </Link>

                    {userData && (userData.role === 'admin' || userData.role === 'filial') && (
                        <Link to="/dashboard" className="tabbutton-menu">Панель управления</Link>
                    )}
                </ul>
            </header>

            <div className="section">
                <div className="blocks__info">
                    <a href={settings.videoLink || '#'} target="_blank" rel="noreferrer" className="block_info">
                        <h3 className="text__block_info">Инструкция</h3>
                        <img className="iconMain" src={guide} alt="" />
                    </a>

                    <div className="block_info" onClick={toggleFilials}>
                        <h3 className="text__block_info">Филиалы</h3>
                        <img className="iconMain" src={filial} alt="" />
                    </div>

                    <div className="block_info" onClick={toggleAdress}>
                        <h3 className="text__block_info">Адрес склада</h3>
                        <img className="iconMain" src={geo} alt="" />
                    </div>

                    <a href={settings.whatsappNumber || '#'} target="_blank" rel="noreferrer" className="block_info">
                        <h3 className="text__block_info">WhatsApp</h3>
                        <img className="iconMain" src={whatsapp} alt="" />
                    </a>

               
                    <Link to="/lost" className="block_info" >
                        <h3 className="text__block_info">Потеряшки</h3>
                        <img className="iconMain" src={news} alt="" />
                    </Link>
                    <a href={settings.whatsappNumber || '#'} target="_blank" rel="noreferrer" className="block_info">
                        <h3 className="text__block_info">Новости</h3>
                        <img className="iconMain" src={news2} alt="" />
                    </a>
                </div>

              

                {showAdress && (
                    <div className="about">
                        <p className="chinaAddress">{settings.chinaAddress}</p>
                    </div>
                )}

                {showFilials && (
                    <div className="about">
                        <h3>Филиалы нашего карго</h3>
                         <p>
                         {filials.map((filial) => (
                            <div className="filial-el filial-el-client" key={filial.filial._id}>
                                    <p>{'- ' + filial.filial.filialText}</p>
                                    {/* <img src={trash} alt="" className="trash" onClick={() => handleDeleteFilial (filial.filial._id)}/> */}
                            </div>

                            ))}
                        </p>
                    </div>
                )}

            <div className="abouts_container">
                <div className="about">
                    <h3>О нас</h3>
                    <p>{settings.aboutUsText}</p>
                </div>

                <div className="about">
                    <h3>Товары, которые нельзя заказывать.</h3>
                    <p>{settings.prohibitedItemsText}</p>
                </div>
            </div>

            <div className="area"></div>

            </div>
            <Tab />

        </div>
    );
};

export default Main;
