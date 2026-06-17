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
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/coupons/me`,{
            withCredentials: true
        });
        setCoupons(response.data);
    }
    catch(err){
        setError(err.response.data.message);
    }
    finally{
        setLoading(false);
    }
  }
  useEffect(()=> {
    fetchCoupons();
  },[]);
  if (loading){
    return <div className="text-white text-center p-3">טעינה</div>
  }

  if (error){
    return <div className="text-danger text-center p-3">{error}</div>
  }

  if (coupons.length === 0){
    return <div className="text-white text-center p-3">אין הטבות זמינות כרגע</div>
  }

  return (
    <div className="d-flex flex-column gap-3 p-4 align-items-center deals-list">
      {/* <CouponCard
        id="52231-89571"
        title="40% הנחה על אמבטיה לתא מטען"
        discount={["הנחת רכב ₪300"]}
        condition="*המבצע בתוקף עד לתאריך 30/10/23, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים"
        isActive={activeCard === 0}
        onClick={() => setActiveCard(0)}
      />
      <CouponCard
        id="52231-89571"
        title="40% הנחה על אמבטיה לתא מטען"
        discount={["הנחת רכב ₪300", "מימון על xxx עד ₪70,000"]}
        condition="*המבצע בתוקף עד לתאריך 30/10/23, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים"
        isActive={activeCard === 1}
        onClick={() => setActiveCard(1)}
      />
      <CouponCard
        id="52231-89571"
        title="40% הנחה על אמבטיה לתא מטען"
        discount={[
          "הנחת רכב ₪300",
          "מימון על xxx עד ₪70,000",
          "קנה ב-₪1,000, וקבל הנחה על סך ₪1,000 לקניית אביזרים",
        ]}
        condition="*המבצע בתוקף עד לתאריך 30/10/23, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים"
        isActive={activeCard === 2}
        onClick={() => setActiveCard(2)}
      /> */}
 {coupons.map((coupon, index) => { // 1. הוספנו את ה-index ללולאה
    // עיצוב תאריך ISO למחרוזת תאריך ישראלית נקייה
    const formattedDate = new Date(coupon.expirationDate).toLocaleDateString('he-IL');
    
    return (
        <CouponCard 
            key={coupon._id} 
            id={coupon.code} 
            
            title={coupon.benefits?.[0] || 'הטבה כללית'} 
            discount={coupon.benefits ? coupon.benefits.slice(1) : []} 
            condition={`*המבצע בתוקף עד לתאריך ${formattedDate}, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים`}
            
            // 2. תיקון: בדיקה האם הכרטיס הנוכחי הוא הכרטיס הפעיל ב-State
            isActive={activeCard === index} 
            
            // 3. תיקון: עדכון ה-State בעת לחיצה על הכרטיס
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
