import { useState, useEffect, use } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';import './css/dashboard.css';
import ButtomNavbar from '../components/ButtomNavbar';
import axios from 'axios';

function Dashboard() {

    const [firstName, setFirstName] = useState('אורח');
    const [plateNumber, setPlateNumber] = useState('');

    function fetchUserData() {
        axios.get('http://localhost:3000/api/users/me', {
            withCredentials: true
        }).then(response => {
            setFirstName(response.data.firstName);
            setPlateNumber(response.data.plateNumber);
        }).catch(error => {
            console.log('לא מחובר:', error.response?.data?.message);
            setFirstName('אורח');
        });
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="main container-fluid min-vh-100 p-0 overflow-hidden">
            <div className="top-container w-100">
                <nav className='navbar w-100 d-flex align-items-center justify-content-between px-3 py-2'>
                    <div className="nav-left">
                        <button className='btn notification-btn'>
                        <NotificationsIcon size={20} color='white' />
                    </button>
                    </div>
                    <div className="nav-center">
                        <img src="../src/assets/logo.png" alt="logo"/>
                    </div>
                    <div className='nav-right d-flex align-items-center justify-content-center justify-content-between'>
                        <div className='d-flex flex-column align-items-end mx-2'>
                            <span className='profile-name text-white'>,בוקר טוב</span>
                            <span className='text-white text-end'>{firstName}</span>
                        </div>
                        <button className='btn profile-btn'>
                            <PersonIcon size={20} color='white' />
                        </button>
                    </div>
                </nav>
                <div className='content w-100'>
                    <div className="content-slider d-flex flex-column align-items-center w-100">
                        <div className='details d-flex flex-column align-items-center justify-content-center'>
                            <div className='image d-flex align-items-end justify-content-center'>
                                <img src="../src/assets/car.png" alt="car" />
                            </div>
                            <h1>ZEEKER X</h1>
                            <p>מספר רכב {plateNumber}</p>
                            <button className='bg-transparent'>
                                <span>המסמכים שלך</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="s h-100 p-3">
                        <div className="slideshow-dots d-flex align-items-center justify-content-center p-2">
                            <span className="dot active"></span>
                            <span className="dot"></span>
                        </div>
                </div>
            </div>
            <div className="bottom-container w-100 d-flex flex-column align-items-center justify-content-center">
                <h1>לשירותך</h1>
                <div className='viewport w-100'>
                    <ul className='links d-flex list-unstyled'>
                        <li>
                            <a className='link d-flex flex-column align-items-center justify-content-center text-decoration-none p-2' href="">
                                <div className="image">
                                    <img src="../src/assets/icons_add_car.png" alt="ac" />
                                </div>
                                <span>הוספת רכב חדש</span>
                            </a>
                        </li>
                        <li>
                            <a className='link d-flex flex-column align-items-center justify-content-center text-decoration-none p-2' href="">
                                <div className='image'>
                                    <img src="../src/assets/near.png" alt="near" />
                                </div>
                                <span>ניווט לחניון</span>
                            </a>
                        </li>
                        <li>
                            <a className='link d-flex flex-column align-items-center justify-content-center text-decoration-none p-2' href="">
                                <div className="image">
                                    <img src="../src/assets/icons_charge.png" alt="charge" />
                                </div>
                                <span>נקודות טעינה</span>
                            </a>
                        </li>
                        <li>
                            <a className='link d-flex flex-column align-items-center justify-content-center text-decoration-none p-2' href="">
                                <div className="image">
                                    <img src="../src/assets/logo_orange.png" alt="ol" />
                                </div>
                                <span>MY ZEEKR</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <ButtomNavbar />
            </div>
        </div>
    );
};

export default Dashboard;