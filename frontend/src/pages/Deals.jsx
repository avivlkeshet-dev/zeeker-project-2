import React from "react";
import "./css/deals.css";
import { IoMdClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import CouponCard from "../components/cards/Coupon";
import axios from "axios";

function CouponList() {
  const [activeCard, setActiveCard] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/coupons/me`,
        {
          withCredentials: true,
        },
      );
      setCoupons(response.data);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCoupons();
  }, []);
  if (loading) {
    return <div className="text-white text-center p-3">טעינה</div>;
  }

  if (error) {
    return <div className="text-danger text-center p-3">{error}</div>;
  }

  if (coupons.length === 0) {
    return (
      <div className="text-white text-center p-3">אין הטבות זמינות כרגע</div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3 p-4 align-items-center deals-list">
      {coupons.map((coupon, index) => {
        const formattedDate = new Date(
          coupon.expirationDate,
        ).toLocaleDateString("he-IL");

        return (
          <CouponCard
            key={coupon._id}
            id={coupon.code}
            title={coupon.benefits?.[0] || "הטבה כללית"}
            discount={coupon.benefits ? coupon.benefits.slice(1) : []}
            condition={`*המבצע בתוקף עד לתאריך ${formattedDate}, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים`}
            isActive={activeCard === index}
            onClick={() => setActiveCard(index)}
          />
        );
      })}
    </div>
  );
}

export default function Deals() {
  return (
    <div className="deals-container">
      <div className="title-bar w-100 d-flex align-items-center justify-content-between p-2">
        <button className="close-btn deals-container__top-button">
          <IoMdClose />
        </button>
        <h1 className="deals-container__title">הטבות החודש</h1>
        <button className="continue-btn deals-container__top-button">
          <FaArrowRight />
        </button>
      </div>
      <CouponList />
      <div className="deals-bottom-fixed">
        <button className="go-btn deals-container__bottom-button w-50">
          קדימה
        </button>
      </div>
    </div>
  );
}
