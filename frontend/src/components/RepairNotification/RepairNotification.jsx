import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import CarCard from '../shared/CarCard/CarCard';
import ButtomNavbar from '../shared/ButtomNavbar';
import { fallbackSeedUser } from '../../constants/fallbackSeedUser';
import './RepairNotification.css';

const mockUser = {
    firstName: fallbackSeedUser.firstName,
    notificationCount: 3,
};

const mockCar = {
    model: 'ZEEKR X',
    plate: '51-985-74',
};

const mockNextService = {
    title: 'הטיפול הבא שלך מתקרב',
    date: '10/06/22',
    day: "ביום ג'",
    time: 'בשעה 14:00',
};

function RepairNotification() {
    const [firstName, setFirstName] = useState(mockUser.firstName);

    return (
        <div className="rn-page d-flex flex-column">

            <div className="rn-nav d-flex align-items-center justify-content-between px-3 pt-3 pb-2">
                <button className="rn-nav__profile d-flex align-items-center gap-2">
                    <div className="rn-nav__profile-icon mb-1">
                        <img src="../src/assets/personal.png" alt="personal" />
                    </div>
                    <div className="rn-nav__greeting text-end">
                        <p className="rn-nav__greeting-line mb-0">בוקר טוב,</p>
                        <p className="rn-nav__greeting-name mb-0">{firstName}</p>
                    </div>
                </button>
                <img className="rn-nav__logo" src="../src/assets/logo.png" alt="ZEEKR" />
                <button className="rn-nav__bell">
                    <FaBell size={20} color="#A7A9AA" />
                    {mockUser.notificationCount > 0 && (
                        <span className="rn-nav__badge">{mockUser.notificationCount}</span>
                    )}
                </button>
            </div>

            <CarCard model={mockCar.model} plate={mockCar.plate}>
                <div className="rn-alert">
                    <div className="rn-alert__bell">
                    <FaBell size={18} color="#3A3E40" />
                    </div>
                    <div className="rn-alert__text">
                        <p className="rn-alert__title">{mockNextService.title}</p>
                        <p className="rn-alert__date">
                            {mockNextService.time} {mockNextService.date} {mockNextService.day}
                        </p>
                    </div>

                </div>
            </CarCard>

            <div className="d-flex justify-content-center gap-2 mt-3">
                <span className="rn-dot rn-dot--active"></span>
                <span className="rn-dot"></span>
            </div>

            <div className="px-3 mt-4">
                <h2 className="rn-services__title">לשירותך</h2>
                <div className="rn-services__grid">
                    <a className="rn-tile" href="">
                        <div className="rn-tile__icon">
                            <img src="../src/assets/MiniLogo.png" alt="ניהול ZEEKR" />
                        </div>
                        <span className="rn-tile__label">ניהול ZEEKR</span>
                    </a>
                    <a className="rn-tile" href="">
                        <div className="rn-tile__icon">
                            <img src="../src/assets/windyroad.png" alt="ZEEKR SHARE" />
                        </div>
                        <span className="rn-tile__label">ZEEKR SHARE</span>
                    </a>
                    <a className="rn-tile" href="">
                        <div className="rn-tile__icon">
                            <img src="../src/assets/icons_charge.png" alt="charge" />
                        </div>
                        <span className="rn-tile__label">נקודות טעינה</span>
                    </a>
                </div>
            </div>

            <ButtomNavbar />
        </div>
    );
}

export default RepairNotification;
