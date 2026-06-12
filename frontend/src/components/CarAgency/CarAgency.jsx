import './CarAgency.css'
import { useRef } from "react";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState } from 'react';

function CarAgency() {
    const containerRef = useRef(null);
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
      const [selectedBusiness, setSelectedBusiness] = useState(null);

  const businesses = [
    {
      id: 1,
      address: "Quick Fix Garage",
      lat: 32.0853,
      lng: 34.7818,
      name: "123 Main St",
      time: "ימים א'-ה' 07:30 - 16:00, יום ו' 07:30 - 12:00",
      email: "info@",
      services: [
        "טרייד-אין",
        "רכבי יד שניה",
        "מכונאות",
        "חלפים ואביזרים",
        "הצעות לביטוח"
      ]
    },
    {
      id: 2,
      address: "מוסך רון",
      lat: 32.0662057,
      lng: 34.7931176,
      name: "תושיה 24, תל אביב-יפו",
      time: "ימים א'-ה' 07:30 - 16:00, יום ו' 07:30 - 12:00",
      email: "info@ron.co.il",
        services: [
        "רכבי יד שניה",
        "חלפים ואביזרים",
        "הצעות לביטוח",
        "מגוון מסלולי",
        "דיאגנוסטיקה",
        "אולם מכירות"
      ]
    }
  ];
    return(
        <div className="container-fluid payment-page d-flex flex-column position-relative p-0 text-white">
            <div className="TitleContainer">
        <div className="d-flex align-items-center justify-content-between">
          <p className="ms-2"></p>
          <h2 className="RepairTitle text-white mt-3">ZEEKR X</h2>
          <img className="back me-2" src="../src/assets/Back.png" />
        </div>
        <div className="d-flex justify-content-center">
          <p>מס' רכב 62-855-10</p>
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
            key={business.id}
            position={[business.lat, business.lng]}
            eventHandlers={{
              click: () => setSelectedBusiness(business),
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
          <p>דוא"ל <a className='emailLink' href="">{selectedBusiness.email}</a></p>
          </div>
          <h6>שירותי הסוכנות</h6>
          <div className="services-container">
      {selectedBusiness.services.map((service, index) => (
        <div key={index} className="service-card">
          {service}
        </div>
      ))}
    </div>
        </div>
    )}
    <div className='OrderAndChangeButtons d-flex flex-column'>
      <button className="OrderService mb-4">
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