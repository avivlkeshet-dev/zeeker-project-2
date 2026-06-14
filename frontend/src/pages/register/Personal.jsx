import React, { useState } from 'react'
import '../css/register.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import axios from 'axios';
import registerFields from '../../constants/registerFields';

export default function Personal() {

    const [formData, setFromData] = useState({
        firstName: '',
        lastName: '',
        personalId: '',
        birthDate: '',
        phone: '',
        email: '',
        city: '',
        street: '',
        houseNumber: '',
        plateNumber: ''
    });

    const [status, setStatus] = useState({
        type: '', text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', text: '' });

        try {
            const response = await axios.post('http://localhost:3000/api/users', formData,
                {
                    withCredentials: true
                }
            );

            setStatus({
                type: 'success',
                text: response.data.message
            });

            setFromData({
                firstName: '',
                lastName: '',
                personalId: '',
                birthDate: '',
                phone: '',
                email: '',
                city: '',
                street: '',
                houseNumber: '',
                plateNumber:''
            });
        } catch(error) {
            setStatus({
                type: 'error',
                text: error.respose?.data?.message || 'שגיאה בהתחברות לשרת'
            });
        }
    }

  return (
    <div className='register container-fluid min-vh-100 w-100'>
        <div className='top-bar d-flex align-items-center justify-content-between w-100 p-3'>
            <CloseOutlinedIcon className='close-btn' />
            <h1 className='text-center m-0'>
                הרשמה לשירות
            </h1>
            <ArrowForwardOutlinedIcon className='back-btn'/>
        </div>
        <form onSubmit={handleSubmit} className='w-100 h-100 d-flex flex-column w-100 align-items-center justify-content-center p-4'>
            { registerFields.map((field) => (
                <div key={field.id} className='w-100 d-flex flex-column text-white text-end p-1'>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                        className='w-100 text-end p-2 '
                        type={field.type}
                        id={field.id}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                    />
                </div>
            ))}
            <div className='w-100 file-section my-4'>
                <button className='upload-file w-100 d-flex align-items-center justify-content-end p-4'>
                    <span>צירוף רישיון נהיגה</span>
                    <UploadFileOutlinedIcon className='icon'/>
                </button>
            </div>
            <button type='submit' className='submit-btn w-100 p-2 text-white my-2'>
                קדימה
            </button>
        </form>
    </div>
  )
}