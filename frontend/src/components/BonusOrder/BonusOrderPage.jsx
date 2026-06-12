import { useState } from 'react';
import './BonusOrderPage.css';

const services = [
    { id: 'summer',     label: 'טיפול קיץ',            icon: '../src/assets/Sun.png' },
    { id: 'winter',     label: 'טיפול חורף',           icon: '../src/assets/Rain.png' },
    { id: 'periodic',   label: 'טיפול תקופתי',        icon: '../src/assets/Calendar.png' },
    { id: 'test',       label: 'הכנה לטסט',            icon: '../src/assets/V.png' },
    { id: 'accessories',label: 'התקנת אביזרים',        icon: '../src/assets/Tire.png' },
    { id: 'body',       label: 'פחחות',               icon: '../src/assets/Brush.png' },
    { id: 'recall',     label: 'ריקול לרכב',           icon: '../src/assets/U-Turn.png' },
    { id: 'accident',   label: 'טיפול לאחר תאונה',     icon: '../src/assets/Accident.png' },
];

function BonusOrderPage() {
    const [selected, setSelected] = useState(null);

    return (
        <div className="container-fluid bonus-order d-flex flex-column p-0 text-white">
            <div className="TitleContainer bg-dark">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="bonus-order__header-side ms-2"></div>
                    <h2 className="bonus-order__title text-white mt-3">הזמנת טיפול</h2>
                    <button className="bonus-order__back-btn bg-dark me-2">
                        <img className="bonus-order__header-side" src="../src/assets/Back.png" alt="back" />
                    </button>
                </div>
            </div>

            <div className="bonus-order__garage-card d-flex align-items-center justify-content-between">
                <button className="bonus-order__garage-btn">
                    <img className="bonus-order__garage-icon" src="../src/assets/edit.png" alt="edit" />
                </button>
                <div className="d-flex flex-column align-items-center">
                    <p className="bonus-order__garage-name mb-0">בכור כהן מוטורס</p>
                    <p className="bonus-order__garage-address mb-0">ההגנה 18, אור יהודה</p>
                </div>
                <div className="bonus-order__garage-spacer"></div>
            </div>

            <div className="bonus-order__divider"></div>

            <div className="bonus-order__tab-row d-flex justify-content-end">
                <span className="bonus-order__tab bonus-order__tab--active">שירותים</span>
                <span className="bonus-order__tab bonus-order__tab--inactive"></span>
                <span className="bonus-order__tab bonus-order__tab--inactive"></span>
            </div>

            <div className="bonus-order__content">
                <p className="bonus-order__question text-center">באיזה שירות אתם מעוניינים?</p>

                <div className="bonus-order__grid">
                    {services.slice(0, 6).map((service) => (
                        <button
                            key={service.id}
                            className={`bonus-order__service-btn${selected === service.id ? ' bonus-order__service-btn--selected' : ''}`}
                            onClick={() => setSelected(service.id)}
                        >
                            <img className={`bonus-order__service-icon${service.iconClass ? ' ' + service.iconClass : ''}`} src={service.icon} alt={service.label} />
                            <span className="bonus-order__service-label">{service.label}</span>
                        </button>
                    ))}
                </div>
                <div className="bonus-order__grid-last-row">
                    {services.slice(6).map((service) => (
                        <button
                            key={service.id}
                            className={`bonus-order__service-btn${selected === service.id ? ' bonus-order__service-btn--selected' : ''}`}
                            onClick={() => setSelected(service.id)}
                        >
                            <img className={`bonus-order__service-icon${service.iconClass ? ' ' + service.iconClass : ''}`} src={service.icon} alt={service.label} />
                            <span className="bonus-order__service-label">{service.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="d-flex justify-content-center pb-4">
                <button className="bonus-order__continue-btn" disabled={!selected}>
                    המשך
                </button>
            </div>
        </div>
    );
}

export default BonusOrderPage;
