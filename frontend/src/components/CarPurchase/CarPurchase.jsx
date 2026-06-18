import { useState, useEffect } from 'react';
import { FaBell, FaShareSquare, FaCalendarAlt } from 'react-icons/fa';
import CarCard from '../shared/CarCard/CarCard';
import ButtomNavbar from '../shared/ButtomNavbar';
import { fallbackSeedUser } from '../../constants/fallbackSeedUser';
import './CarPurchase.css';

const mockUser = {
    firstName: fallbackSeedUser.firstName,
    notificationCount: 0,
    pencilnotificationcount: 1,
};

const mockCar = {
    model: 'ZEEKR X',
};

const mockOrder = {
    ownerName: fallbackSeedUser.firstName,
    orderNumber: '714553',
    estimatedDelivery: 'XX/XXXX',
};

function CarPurchase() {
    const [firstName, setFirstName] = useState(mockUser.firstName);

    return (
        <div className="cp-page d-flex flex-column">

            <div className="cp-nav d-flex align-items-center justify-content-between px-3 pt-3 pb-2">
                <button className="cp-nav__profile d-flex align-items-center gap-2">
                    <div className="cp-nav__profile-icon mb-1">
                        <img src="../src/assets/personal.png" alt="personal" />
                    </div>
                    <div className="text-end">
                        <p className="cp-nav__greeting-line mb-0">בוקר טוב,</p>
                        <p className="cp-nav__greeting-name mb-0">{firstName}</p>
                    </div>
                </button>
                <img className="cp-nav__logo" src="../src/assets/logo.png" alt="ZEEKR" />
                <div className="d-flex gap-2">
                    <button className="cp-nav__icon-btn">
                        <img src='../src/assets/pencil.png' />
                        {mockUser.pencilnotificationcount > 0 && (
                            <span className="cp-nav__badge">{mockUser.pencilnotificationcount}</span>
                        )}
                    </button>
                    <button className="cp-nav__icon-btn">
                        <FaBell size={18} color="#A7A9AA" />
                        {mockUser.notificationCount > 0 && (
                            <span className="cp-nav__badge">{mockUser.notificationCount}</span>
                        )}
                    </button>
                </div>
            </div>

            <CarCard model={mockCar.model}>
                <p className="cp-card__order-name">ההזמנה של {mockOrder.ownerName}</p>
                <p className="cp-card__order-number">מספר הזמנה - {mockOrder.orderNumber}</p>
                <div className="cp-card__delivery">
                    <FaCalendarAlt size={16} color="#FF5800" />
                    <p className="cp-card__delivery-text">
                        תאריך הזמנה משוער לארץ עד {mockOrder.estimatedDelivery}
                    </p>
                </div>
                <button className="cp-card__order-btn">פרטי הזמנה</button>
            </CarCard>

            <div className="px-3 mt-4">
                <h2 className="cp-services__title text-center">לשירותך</h2>
                <div className="cp-services__grid">
                    <a className="cp-tile" href="">
                        <div className="cp-tile__icon">
                            <img src="../src/assets/MiniLogo.png" alt="MY ZEEKR" />
                        </div>
                        <span className="cp-tile__label">MY ZEEKR</span>
                    </a>
                    <a className="cp-tile" href="">
                        <div className="cp-tile__icon">
                            <img src="../src/assets/icons_charge.png" alt="נקודות טעינה" />
                        </div>
                        <span className="cp-tile__label">נקודות טעינה</span>
                    </a>
                    <a className="cp-tile" href="">
                        <div className="cp-tile__icon">
                            <img src="../src/assets/Parking.png" alt="ניווט לחניון" />
                        </div>
                        <span className="cp-tile__label">ניווט לחניון<br />קרוב</span>
                    </a>
                </div>
            </div>

          

            <ButtomNavbar fabLabel={['דברו', 'איתנו']} />
        </div>
    );
}

export default CarPurchase;
