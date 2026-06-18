import React, { useEffect, useRef, useState } from 'react';
import '../css/register.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CheckIcon from '@mui/icons-material/Check';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import axios from 'axios';

const cities = ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'אשדוד', 'רמת גן', 'פתח תקווה', 'ראשון לציון', 'חולון', 'בת ים', 'רעננה'];

const FIELDS = [
    { id: 'firstName', label: 'שם פרטי', type: 'text', readOnly: true },
    { id: 'lastName', label: 'שם משפחה', type: 'text', readOnly: true },
    { id: 'personalId', label: 'תעודת זהות', type: 'text', readOnly: true },
    { id: 'birthDate', label: 'תאריך לידה', type: 'text', readOnly: true },
    { id: 'phone', label: 'מספר טלפון', type: 'tel', readOnly: true },
    {
        id: 'email',
        label: 'כתובת מייל',
        type: 'email',
        sanitize: (v) => v.replace(/\s+/g, ''),
        validate: (v) => {
            if (!v) return 'נא להזין כתובת מייל';
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'כתובת מייל לא תקינה';
        },
    },
    { id: 'city', label: 'עיר מגורים', placeholder: 'בחר עיר', type: 'select', options: cities },
    {
        id: 'street',
        label: 'רחוב',
        type: 'text',
        sanitize: (v) => v.replace(/[^A-Za-z\u0590-\u05FF0-9 '\-]/g, ''),
        validate: (v) => (v.trim() ? '' : 'נא להזין שם רחוב'),
    },
    {
        id: 'houseNumber',
        label: 'מספר בית',
        type: 'text',
        inputMode: 'numeric',
        sanitize: (v) => v.replace(/\D/g, ''),
        validate: (v) => (/^\d+$/.test(v) ? '' : 'מספר בית חייב להכיל ספרות בלבד'),
    },
    {
        id: 'plateNumber', name: 'plateNumber', label: ':לוחית רישוי', type: 'text'
    }
];

const steps = ['תשלום', 'פרטים אישיים', 'ביקורת'];
const currentStep = 1; 

export default function Personal() {
    useEffect(() => {
        const previousBodyBackground = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#000';

        return () => {
            document.body.style.backgroundColor = previousBodyBackground;
        };
    }, []);

    const fileInputRef = useRef(null);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    const [formData, setFormData] = useState({
        firstName: 'ישראל',
        lastName: 'ישראלי',
        personalId: '123456789',
        birthDate: '1995-01-01',
        phone: '0501234567',
        email: 'israel.israeli@example.com',
        city: 'תל אביב',
        street: 'רוטשילד',
        houseNumber: '10',
        plateNumber: '12345678'
    });

    const [file, setFile] = useState(null);

    const [status, setStatus] = useState({
        type: '', text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

        const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: '', text: '' });

        if (!file) {
            setStatus({ type: 'error', text: 'נא להעלות צילום רישיון נהיגה' });
            return;
        }

        const data = new FormData();
        
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        data.append('driversLicense', file);

        try {
            const response = await axios.post('http://localhost:3000/api/users', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            setStatus({
                type: 'success',
                text: response.data.messsage || response.data.message || 'ההרשמה בוצעה בהצלחה!'
            });
            window.location.href='/';

            setFormData({
                firstName: '', lastName: '', personalId: '', birthDate: '',
                phone: '', email: '', city: '', street: '', houseNumber: '', plateNumber: ''
            });
            setFile(null);

        } catch (error) {
            setStatus({
                type: 'error',
                text: error.response.data.message
            });
        }
    };
    
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFieldChange = (field) => (event) => {
        const raw = event.target.value;
        const next = field.sanitize ? field.sanitize(raw) : raw;
        setFormData((prev) => ({ ...prev, [field.id]: next }));
        
        if (fieldErrors[field.id]) {
            setFieldErrors((prev) => ({ ...prev, [field.id]: '' }));
        }
    };

    const handleFieldBlur = (field) => () => {
        if (!field.validate) return;
        const error = field.validate(formData[field.id] ?? '');
        setFieldErrors((prev) => ({ ...prev, [field.id]: error }));
    };

    const validateAll = () => {
        const errors = {};
        for (const field of FIELDS) {
            if (field.validate) {
                const err = field.validate(formData[field.id] ?? '');
                if (err) errors[field.id] = err;
            }
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="container-fluid personal-page min-vh-100 w-100 p-0">
            <header id="bad-header" className="personal-header bg-dark">
                <button type="button" className="header-icon-btn" aria-label="סגור">
                    <img src="../src/assets/x.png" alt="Close" className="bad-close-icon" />
                </button>
                <h1 className="header-title">הרשמה לשירות</h1>
                <button type="button" className="header-icon-btn" aria-label="חזור">
                    <ArrowForwardOutlinedIcon />
                </button>
            </header>

            <div className="personal-stepper">
                {steps.map((label, idx) => {
                    const stepStatus =
                        idx < currentStep ? 'done'
                            : idx === currentStep ? 'current'
                                : 'future';
                    return (
                        <div key={label} className={`stepper-item stepper-item--${stepStatus}`}>
                            <span className="step-label">
                                {stepStatus === 'done' && <CheckIcon className="step-check" />}
                                {stepStatus === 'current' && label}
                            </span>
                            <span className="step-bar" />
                        </div>
                    );
                })}
            </div>

            <p className="personal-subtitle text-white text-end me-3">
                כדאי לבדוק שוב שהפרטים נכונים
            </p>

            <form className="personal-form w-100 d-flex flex-column" onSubmit={handleSubmit} noValidate>
                {FIELDS.map((field) => {
                    const { id, label, placeholder, type, options, readOnly, inputMode } = field;
                    const error = fieldErrors[id];
                    return (
                        <div key={id} className="form-group d-flex flex-column text-white text-end">
                            <label htmlFor={id}>{label}</label>
                            {type === 'select' ? (
                                <div className="input-wrapper">
                                    <select
                                        className="w-100 text-end p-2 form-select-field"
                                        id={id}
                                        name={id}
                                        value={formData[id] ?? ''}
                                        onChange={handleFieldChange(field)}
                                        onBlur={handleFieldBlur(field)}
                                    >
                                        <option value="" disabled hidden>{placeholder}</option>
                                        {options.map((opt) => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                    <ExpandMoreOutlinedIcon className="input-icon input-icon--chevron" />
                                </div>
                            ) : (
                                <div className="input-wrapper">
                                    <input
                                        className={`w-100 text-end p-2${readOnly ? ' input--readonly' : ''}${error ? ' input--error' : ''}`}
                                        type={type}
                                        id={id}
                                        name={id}
                                        placeholder={placeholder}
                                        value={formData[id] ?? ''}
                                        onChange={handleFieldChange(field)}
                                        onBlur={handleFieldBlur(field)}
                                        readOnly={readOnly}
                                        inputMode={inputMode}
                                        aria-invalid={Boolean(error)}
                                        aria-describedby={error ? `${id}-error` : undefined}
                                    />
                                    {!readOnly && <EditOutlinedIcon className="input-icon" />}
                                </div>
                            )}
                            {error && (
                                <span id={`${id}-error`} className="field-error text-end">
                                    {error}
                                </span>
                            )}
                        </div>
                    );
                })}

                <section className="personal-upload-section">
                    <h3 className="upload-title text-end">איך לערוך פרטים?</h3>
                    <p className="upload-description text-end">
                        .מייל וכתובת ע"י לחיצה על העיפרון
                        <br /> .שם, גיל, תאריך לידה וטלפון ע"י צילום רישיון הנהיגה
                    </p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        className="upload-hidden-input"
                        onChange={handleFileChange}
                    />
                    <button
                        type="button"
                        className="upload-button w-100 d-flex align-items-center justify-content-between"
                        onClick={handleUploadClick}
                    >
                        <span className="upload-icon-wrapper">
                            <img src="../src/assets/upload.png" alt="Upload" className="upload-icon" />
                        </span>
                        <span className="upload-button-text me-3">
                            {uploadedFile ? uploadedFile.name : 'צילום רישיון נהיגה'}
                        </span>
                    </button>
                </section>

                {status.text && (
                    <div className={`w-100 text-center my-3 p-2 rounded text-white ${status.type === 'error' ? 'bg-danger' : 'bg-success'}`}>
                        {status.text}
                    </div>
                )}

                <button type="submit" className="primary-submit-btn">
                    קדימה
                </button>
            </form>
        </div>
    );
}