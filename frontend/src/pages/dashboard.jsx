import { useState, useEffect, use } from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';import './css/dashboard.css';
import ButtomNavbar from '../components/ButtomNavbar';
import axios from 'axios';

// TODO: replace with API call — load from /api/user/profile
const mockUser = {
    firstName: 'עמית',
    notificationCount: 3,
};

// TODO: replace with API call — load from /api/car/:id
const mockCar = {
    model: 'ZEEKR X',
    plate: '51-985-74',
};

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
        <div className="dashboard d-flex flex-column">

            {/* ── Top nav ── */}
            <div className="db-nav d-flex align-items-center justify-content-between px-3 pt-3 pb-2">
                <button className="db-nav__profile d-flex align-items-center gap-2">
                    <div className="db-nav__profile-icon mb-1">
                        <img src="../src/assets/personal.png" alt="personal" className="db-nav__profile-img" />
                    </div>
                    <div className="db-nav__greeting text-end">
                        <p className="db-nav__greeting-line mb-0">בוקר טוב,</p>
                        <p className="db-nav__greeting-name mb-0">{mockUser.firstName}</p>
                    </div>
                </button>
                <img className="db-nav__logo" src="../src/assets/logo.png" alt="ZEEKR" />
                <button className="db-nav__bell">
                    <FaBell size={20} color="white" />
                    {mockUser.notificationCount > 0 && (
                        <span className="db-nav__badge">{mockUser.notificationCount}</span>
                    )}
                </button>
            </div>

            {/* ── Car card ── */}
            <div className="db-card-wrap px-3">
                <div className="db-car-card d-flex flex-column align-items-center">
                    <div className="db-car-card__img-wrap">
                        <img src="../src/assets/car.png" alt="ZEEKR X" className="db-car-card__img" />
                    </div>
                    <h2 className="db-car-card__name">{mockCar.model}</h2>
                    <p className="db-car-card__plate">מס' רכב {mockCar.plate}</p>
                    <button className="db-car-card__docs-btn">המסמכים שלך</button>
                </div>
            </div>

            {/* ── Dots ── */}
            <div className="db-dots d-flex justify-content-center gap-2 mt-3">
                <span className="db-dot db-dot--active"></span>
                <span className="db-dot"></span>
            </div>

            {/* ── Services ── */}
            <div className="db-services px-3 mt-4">
                <h2 className="db-services__title text-center">לשירותך</h2>
                <div className="db-services__grid">
                    <a className="db-tile d-flex flex-column align-items-center justify-content-center text-decoration-none" href="">
                        <div className="db-tile__icon">
                            <img src="../src/assets/MiniLogo.png" alt="MY ZEEKR" />
                        </div>
                        <span className="db-tile__label">MY ZEEKR</span>
                    </a>
                    <a className="db-tile d-flex flex-column align-items-center justify-content-center text-decoration-none" href="">
                        <div className="db-tile__icon">
                            <img src="../src/assets/icons_charge.png" alt="charge" />
                        </div>
                        <span className="db-tile__label">נקודות טעינה</span>
                    </a>
                    <a className="db-tile d-flex flex-column align-items-center justify-content-center text-decoration-none" href="">
                        <div className="db-tile__icon">
                            <img src="../src/assets/Parking.png" alt="charge" />
                        </div>
                        <span className="db-tile__label">ניווט לחניון<br/>קרוב</span>
                    </a>
                </div>
            </div>
            <ButtomNavbar />
        </div>
    );
};

export default Dashboard;