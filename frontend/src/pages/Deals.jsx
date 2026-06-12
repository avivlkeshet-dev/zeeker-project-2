import React from 'react';
import './css/deals.css';
import { IoMdClose } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useState } from 'react';
import CouponCard from '../components/cards/Coupon';

function CouponList() {
    return (
        <div className="d-flex flex-column gap-3 p-3 bg-dark min-vh-100 align-items-center">
            <CouponCard 
                id="52231-89571" 
                title="40% הנחה על אמבטיה לתא מטען"
                discount="הנחת רכב ₪300"
                condition="*המבצע בתוקף עד לתאריך 30/10/23, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים"
                isActive={true} 
            />
            <CouponCard 
                id="52231-89571" 
                title="40% הנחה על אמבטיה לתא מטען"
                discount="הנחת רכב ₪300"
                condition="*המבצע בתוקף עד לתאריך 30/10/23, ובתנאי שהשלמת את כל תהליך התשלום והמסמכים"
                isActive={false} 
            />
        </div>
    );
}

export default function Deals() {
    return (
        <div className="deals-container min-vh-100 d-flex flex-column h-100 align-items-center justify-content-between">
            <div className="top-container w-100">
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
            </div>
            <div className="bottom-container w-100 d-flex flex-column align-items-center justify-content-center p-4">
                <button className='btn go-btn deals-container__bottom-button w-75 '>
                    קדימה
                </button>
            </div>
        </div>
    )
}
