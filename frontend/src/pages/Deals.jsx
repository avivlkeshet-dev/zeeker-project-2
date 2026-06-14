import React from 'react';
import './css/deals.css';
import { IoMdClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useState } from 'react';
import CouponCard from '../components/cards/Coupon';

function CouponList() {
    const [activeCard, setActiveCard] = useState(0);
    return (
        <div className="d-flex flex-column gap-3 p-4 align-items-center deals-list">
            <CouponCard 
                id="52231-89571" 
                title="40% הנחה על אמבטיה לתא מטען"
                discount={[
    "הנחת רכב ₪300"
]}
                condition="*המבצע בתוקף עד לתאריך 30/10/23, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים"
                isActive={activeCard === 0}
    onClick={() => setActiveCard(0)}
            />
            <CouponCard 
                id="52231-89571" 
                title="40% הנחה על אמבטיה לתא מטען"
                discount={[
    "הנחת רכב ₪300",
    "מימון על xxx עד ₪70,000",
]}
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
    "קנה ב-₪1,000, וקבל הנחה על סך ₪1,000 לקניית אביזרים"
]}
                condition="*המבצע בתוקף עד לתאריך 30/10/23, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים"
                isActive={activeCard === 2}
    onClick={() => setActiveCard(2)}
            />
        </div>
    );
}

export default function Deals() {
    return (
        <div className="deals-container">
            <div className="title-bar w-100 d-flex align-items-center justify-content-between p-2">
                <button className='close-btn deals-container__top-button'>
                    <IoMdClose />
                </button>
                <h1 className='deals-container__title'>הטבות החודש</h1>
                <button className='continue-btn deals-container__top-button'>
                    <FaArrowRight />
                </button>
            </div>
            <CouponList />
            <div className="deals-bottom-fixed">
                <button className='go-btn deals-container__bottom-button w-50'>
                    קדימה
                </button>
            </div>
        </div>
    )
}
