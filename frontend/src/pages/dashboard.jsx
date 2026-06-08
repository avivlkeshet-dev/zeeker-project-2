import { useState } from 'react';
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import './css/dashboard.css';
import ButtomNavbar from '../components/ButtomNavbar';

function Dashboard() {
    return (
        <div className="main container-fluid min-vh-100 p-0 overflow-hidden">
            <div className="top-container w-100">
                <div className='nav w-100 d-flex align-items-center justify-content-around p-1'>
                    <button className='btn notification-btn'>
                        <FaBell size={20} color='white' />
                    </button>
                    <img src="../src/assets/logo.png" alt="logo" />
                    <div className='profile w-25 d-flex align-items-center justify-content-center p-0'>
                        <span className='profile-name'>בוקר טוב, עמית</span>
                        <button className='btn profile-btn bg-dark'>
                            <CgProfile size={20} color='white' />
                        </button>
                    </div>
                </div>
                <div className='content w-100'>
                    <div className="content-slider d-flex flex-column align-items-center w-100">
                        <div className='details d-flex flex-column align-items-center justify-content-center'>
                            <div className='image d-flex align-items-end justify-content-center'>
                                <img src="../src/assets/car.png" alt="car" />
                            </div>
                            <h1>ZEEKER X</h1>
                            <p>מספר רכב 5198574</p>
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