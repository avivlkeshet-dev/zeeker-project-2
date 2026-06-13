import { useRef, useEffect } from 'react';
import './CarSettings.css';

// Static spec definitions: id, label, icon — layout only
const SPEC_DEFS = [
    { id: 'date',      label: 'מועד עליה לכביש',       icon: '../src/assets/Road.png' },
    { id: 'drive',     label: 'הנעה',                    icon: '../src/assets/Engine.png' },
    { id: 'trim',      label: 'רמת גימור',               icon: '../src/assets/Pro.png' },
    { id: 'service',   label: 'מרווח טיפולים',           icon: '../src/assets/Brake.png' },
    { id: 'capacity',  label: 'קבולת סוללה',             icon: '../src/assets/Clip.png' },
    { id: 'range',     label: 'טווח סוללה WLTP',         icon: '../src/assets/Battery.png' },
    { id: 'acPlug',    label: 'טוג חיבור AC',            icon: '../src/assets/Component.png' },
    { id: 'dcPlug',    label: 'טוג חיבור DC',            icon: '../src/assets/Component.png' },
    { id: 'acPower',   label: 'הספק טעינה מקסימלי AC',  icon: '../src/assets/Charging.png' },
    { id: 'dcPower',   label: 'הספק טעינה מקסימלי DC',  icon: '../src/assets/Charging.png' },
    { id: 'rearTire',  label: 'לחץ אוויר אחורי',         icon: '../src/assets/Tire.png' },
    { id: 'frontTire', label: 'לחץ אוויר קדמי',          icon: '../src/assets/Tire.png' },
    { id: 'maxPower',  label: 'הספק מירבי',              icon: '../src/assets/Power.png' },
    { id: 'accel',     label: 'תאוצה מ-0 ל-100',         icon: '../src/assets/CarGo.png' },
];

// Mock data — will be replaced with DB/API response
const mockCarData = {
    date:      'ינואר 2020',
    drive:     'חשמלית',
    trim:      'PRO 460',
    service:   'שנה או 15K ק"מ',
    capacity:  '53 קוט"ש',
    range:     '460 ק"מ',
    acPlug:    'TYPE 2',
    dcPlug:    'CCS2',
    acPower:   'AC- 11kW',
    dcPower:   'DC- 70kW',
    rearTire:  'PSI 36',
    frontTire: 'PSI 36',
    maxPower:  '204 כ"ס',
    accel:     '7.7 שניות',
};

// Merge definitions with data
const specs = SPEC_DEFS.map((def) => ({ ...def, value: mockCarData[def.id] ?? '—' }));

const tabs = ['היסטוריית טיפולים', 'דאשבורד', 'סוללה', 'הרכב'];
const CAR_NUMBER = '51-985-74';

function CarSettings() {
    const tabsRef = useRef(null);

    useEffect(() => {
        const el = tabsRef.current;
        if (!el) return;
        const handleWheel = (e) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            el.scrollLeft += e.deltaY;
        };
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <div className="car-settings">
            {/* Header */}
            <div className="TitleContainer">
                <div className="d-flex align-items-center justify-content-between">
                    <img
                        className="car-settings__nav-icon ms-4 mt-4"
                        src="../src/assets/arrow.png"
                        alt="next"
                    />
                    <h2 className="RepairTitle text-white mt-3">ZEEKR X</h2>
                    <img className="car-settings__nav-icon-2 me-2" src="../src/assets/Back.png" alt="back" />
                </div>
                <div className="d-flex justify-content-center">
                    <p className="car-settings__car-number">מס' רכב {CAR_NUMBER}</p>
                </div>
            </div>

            {/* Tab bar */}
            <div ref={tabsRef} className="scroll-container car-settings__tabs">
                {tabs.map((tab, i) => (
                    <div
                        key={tab}
                        className={`scroll-item${tab === 'הרכב' ? ' car-settings__tab--active' : ' gray-out'}`}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            {/* Scrollable content */}
            <div className="car-settings__content">
                {/* Hero: car image overlapping dark card */}
                <div className="car-settings__hero">
                    {/* Car image */}
                    <div className="car-settings__car-wrap">
                        <img className="car-settings__car-img" src="../src/assets/car.png" alt="ZEEKR X" />
                    </div>

                    {/* Dark card: name + plate + buttons */}
                    <div className="car-settings__car-card">
                        {/* Car name & number */}
                        <div className="car-settings__car-info">
                            <h3 className="car-settings__car-title">ZEEKR X</h3>
                            <p className="car-settings__car-plate">מס' רכב {CAR_NUMBER}</p>
                        </div>

                        {/* Action buttons */}
                        <div className="car-settings__action-row">
                            <button className="car-settings__action-btn text-white">מסמכי הרכב</button>
                            <button className="car-settings__action-btn text-white">הסכנות שלך</button>
                        </div>
                    </div>
                </div>

                {/* Specs section */}
                <p className="car-settings__section-title">פרטי הרכב שלך</p>

                <div className="car-settings__specs-grid">
                    {specs.map((spec) => (
                        <div key={spec.id} className="car-settings__spec-card">
                            <img
                                src={spec.icon}
                                alt={spec.label}
                                className="car-settings__spec-icon"
                            />
                            <span className="car-settings__spec-label">{spec.label}</span>
                            <span className="car-settings__spec-value">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CarSettings;
