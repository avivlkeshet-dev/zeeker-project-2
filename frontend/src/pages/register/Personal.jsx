import React, { useState } from 'react'
import '../css/register.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import axios from 'axios';

export default function Personal() {

    const [formData, setFromData] = useState({
        first_name: '',
        last_name: '',
        personal_id: '',
        birth_date: '',
        phone_number: '',
        email: '',
        city: '',
        street: '',
        house_number: ''
    });

    const [status, setStatus] = useStatus({
        type: '', text: ''
    });

  return (
    <div className='container-fluid min-vh-100 w-100'>
        <div className='top-bar d-flex align align-items-center justify-content-between w-100 p-2'>
            <CloseOutlinedIcon className='close-btn' />
            <h1>
                הרשמה לשירות
            </h1>
            <ArrowForwardOutlinedIcon className='back-btn'/>
        </div>
        <form action="" className='w-100 d-flex flex-column w-100 align-items-center justify-content-center p-4'>
            <div className='w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">שם פרטי</label>
                <input
                    className='w-100 text-end p-2 '
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div className='w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">:שם משפחה</label>
                <input
                    className='w-100 text-end p-2 '
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div  className='w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">:תעודת זהות</label>
                <input
                    className='w-100 text-end p-2 '
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div  className='w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">תאריך לידה</label>
                <input
                    className='w-100 text-end p-2'
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div  className='w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">:מספר טלפון</label>
                <input
                    className='w-100 text-end p-2 '
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div  className='w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">כתובת מייל</label>
                <input
                    className='w-100 text-end p-2 '
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div  className='w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">:עיר מגורים</label>
                <input
                    className='w-100 text-end p-2 '
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div  className='w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">:רחוב</label>
                <input
                    className='w-100 text-end p-2 '
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div  className=' w-100 d-flex flex-column text-white text-end'>
                <label htmlFor="username">:מספר בית</label>
                <input
                    className='w-100 text-end p-2 '
                    type="text"
                    id="username"
                    name="username"
                />
            </div>

            <div className='w-100 file-section'>
                <button className='upload-file w-100 d-flex align-items-center justify-content-end p-4'>
                    <span>צירוף רישיון נהיגה</span>
                    <UploadFileOutlinedIcon className='icon'/>
                </button>
            </div>
        </form>
    </div>
  )
}
