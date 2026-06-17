import './CarAgency.css'
import { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from 'axios';
import { fallbackSeedUser } from '../../constants/fallbackSeedUser';

const fallbackMapData = [
  {
    _id: 'mock-map-1',
    name: 'Zeeker Tel Aviv',
    address: 'Tel Aviv, Israel',
    lat: 32.0853,
    lng: 34.7818,
    time: "ימים א'-ה' 07:30 - 16:00, יום ו' 07:30 - 12:00",
    email: 'info@',
    services: ['טרייד-אין', 'רכבי יד שניה', 'מכונאות', 'חלפים ואביזרים', 'הצעות לביטוח'],
  },
  {
    _id: 'mock-map-2',
    name: 'Zeeker Jerusalem',
    address: 'Jerusalem, Israel',
    lat: 31.7683,
    lng: 35.2137,
    time: "ימים א'-ה' 07:30 - 16:00, יום ו' 07:30 - 12:00",
    email: 'info@ron.co.il',
    services: ['רכבי יד שניה', 'חלפים ואביזרים', 'הצעות לביטוח', 'מגוון מסלולי', 'דיאגנוסטיקה', 'אולם מכירות'],
  },
  {
    _id: 'mock-map-3',
    name: 'Zeeker Haifa',
    address: 'Haifa, Israel',
    lat: 32.7940,
    lng: 34.9896,
    time: "ימים א'-ה' 07:30 - 16:00, יום ו' 07:30 - 12:00",
    email: 'info@zeeker-haifa.co.il',
    services: ['רכבי יד שניה', 'חלפים ואביזרים', 'דיאגנוסטיקה', 'אולם מכירות'],
  },
];

function CarAgency() {
    const navigate = useNavigate();
    const location = useLocation();
    const containerRef = useRef(null);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(location.state?.selectedBusiness || null);
  const [plateNumber, setPlateNumber] = useState(location.state?.plateNumber || fallbackSeedUser.plateNumber);

  useEffect(() => {
    const fetchUserPlate = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
          { withCredentials: true }
        );
        if (response.data?.plateNumber) {
          setPlateNumber(response.data.plateNumber);
        }
      } catch {
        // keep fallback plate
      }
    };
    fetchUserPlate();
  }, []);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/maps`);
        const data = Array.isArray(response.data) && response.data.length > 0
          ? response.data
          : fallbackMapData;
        setBusinesses(data);
      } catch {
        setBusinesses(fallbackMapData);
      } finally {
        setLoading(false);
      }
    };
    fetchMaps();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      if (event.deltaY === 0) return;

      event.preventDefault();

      container.scrollLeft += event.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>טוען מפה...</p>;

    return(
        <div className="container-fluid payment-page d-flex flex-column position-relative p-0 text-white">
            <div className="TitleContainer car-agency-title">
        <div className="d-flex align-items-center justify-content-between">
          <p className="ms-2"></p>
          <h2 className="RepairTitle text-white mt-3">ZEEKR X</h2>
          <img className="back me-2" src="../src/assets/Back.png" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }} />
        </div>
        <div className="d-flex justify-content-center">
          <p>מס' רכב {plateNumber}</p>
        </div>
      </div>
      <div ref={containerRef} className="scroll-container d-flex">
        <div className="scroll-item gray-out">מידע על זבובים</div>
        <div className="scroll-item">סוכנות הרכב</div>
        <div className="scroll-item gray-out">היסטוריית טיפולים</div>
        <div className="scroll-item gray-out">דאשבורד</div>
        <div className="scroll-item gray-out">סוללה</div>
        <div className="scroll-item gray-out">ביוב</div>
      </div>
    <MapContainer
      className="car-agency-map"
      center={[32.1149329, 34.820848]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  attribution='&copy; OpenStreetMap contributors &copy; CARTO'
/>
      {businesses.map((business) => (
          <Marker
            key={business._id}
            position={[business.lat, business.lng]}
            eventHandlers={{
              click: () => {
                console.log('Selected business:', business);
                setSelectedBusiness(business);
              },
            }}
          >
            <Popup>{business.name}</Popup>
          </Marker>
        ))}
    </MapContainer>
    {selectedBusiness && (
        <div className="business-details">
          <h2>{selectedBusiness.address}</h2>
          <div className='d-flex'>
          <img className='TimeIcon' src="../src/assets/Time.png" alt="" />
          <p>{selectedBusiness.time}</p>
          </div>
          <div className='d-flex'>
            <img className='MailIcon mt-1' src="../src/assets/OrangeMail.png" alt="" />
          <p>דוא"ל <a className='emailLink' href={`mailto:${selectedBusiness.email}`}>{selectedBusiness.email}</a></p>
          </div>
          <h6>שירותי הסוכנות</h6>
          <div className="services-container">
      {selectedBusiness.services?.map((service, index) => (
        <div key={index} className="service-card">
          {service}
        </div>
      ))}
    </div>
        </div>
    )}
    <div className='OrderAndChangeButtons d-flex flex-column'>
      <button className="OrderService mb-4" onClick={() => selectedBusiness && navigate('/services', { state: { business: selectedBusiness, plateNumber } })}>
       הזמנת שירות
      </button>
      <button className="ChangePreference mb-4">
       שינוי הסוכנות המועדפת
      </button>
    </div>
    </div>
  )
}

export default CarAgency;




