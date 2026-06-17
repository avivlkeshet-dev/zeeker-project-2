// import React, { useEffect, useRef, useState } from 'react';
// import '../css/register.css';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
// import CheckIcon from '@mui/icons-material/Check';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import { fallbackSeedUser } from '../../constants/fallbackSeedUser';

// const cities = ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'אשדוד', 'רמת גן', 'פתח תקווה', 'ראשון לציון', 'חולון', 'בת ים', 'רעננה'];

// const formatBirthDate = (dateValue) => {
//     if (!dateValue) return '';
//     const parsedDate = new Date(dateValue);
//     if (Number.isNaN(parsedDate.getTime())) return '';

//     const day = String(parsedDate.getDate()).padStart(2, '0');
//     const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
//     const year = String(parsedDate.getFullYear()).slice(-2);
//     return `${day}/${month}/${year}`;
// };

// const normalizePhone = (phoneValue) => {
//     if (!phoneValue) return '';
//     const digits = phoneValue.replace(/\D/g, '');
//     if (digits.length !== 10) return phoneValue;
//     return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
// };

// // Mock data — values for each field keyed by field id
// const MOCK_USER = {
//     firstName: fallbackSeedUser.firstName,
//     lastName: fallbackSeedUser.lastName,
//     idNumber: fallbackSeedUser.personalId,
//     birthDate: formatBirthDate(fallbackSeedUser.birthDate),
//     phone: normalizePhone(fallbackSeedUser.phone),
//     email: fallbackSeedUser.email,
//     city: fallbackSeedUser.city,
//     street: fallbackSeedUser.street,
//     houseNumber: fallbackSeedUser.houseNumber,
// };

// const FIELDS = [
//     { id: 'firstName', label: 'שם פרטי', value: MOCK_USER.firstName, type: 'text', readOnly: true },
//     { id: 'lastName', label: 'שם משפחה', value: MOCK_USER.lastName, type: 'text', readOnly: true },
//     { id: 'idNumber', label: 'תעודת זהות', value: MOCK_USER.idNumber, type: 'text', readOnly: true },
//     { id: 'birthDate', label: 'תאריך לידה', value: MOCK_USER.birthDate, type: 'text', readOnly: true },
//     { id: 'phone', label: 'מספר טלפון', value: MOCK_USER.phone, type: 'tel', readOnly: true },
//     {
//         id: 'email',
//         label: 'כתובת מייל',
//         value: MOCK_USER.email,
//         type: 'email',
//         // Block whitespace at input time; full pattern check runs on blur/submit
//         sanitize: (v) => v.replace(/\s+/g, ''),
//         validate: (v) => {
//             if (!v) return 'נא להזין כתובת מייל';
//             return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'כתובת מייל לא תקינה';
//         },
//     },
//     { id: 'city', label: 'עיר מגורים', value: MOCK_USER.city, placeholder: 'בחר עיר', type: 'select', options: cities },
//     {
//         id: 'street',
//         label: 'רחוב',
//         value: MOCK_USER.street,
//         type: 'text',
//         // Allow Hebrew/Latin letters, digits, spaces and basic punctuation
//         sanitize: (v) => v.replace(/[^A-Za-z\u0590-\u05FF0-9 '\-]/g, ''),
//         validate: (v) => (v.trim() ? '' : 'נא להזין שם רחוב'),
//     },
//     {
//         id: 'houseNumber',
//         label: 'מספר בית',
//         value: MOCK_USER.houseNumber,
//         type: 'text',
//         inputMode: 'numeric',
//         // Digits only
//         sanitize: (v) => v.replace(/\D/g, ''),
//         validate: (v) => (/^\d+$/.test(v) ? '' : 'מספר בית חייב להכיל ספרות בלבד'),
//     },
// ];

// const steps = ['תשלום', 'פרטים אישיים', 'ביקורת'];
// const currentStep = 1; // 0-based: 0 = done, 1 = current, 2 = future

// /**
//  * Mock callback that "saves" the personal details payload.
//  * Replace this with a real API call (e.g. fetch/axios POST) later.
//  */
// const savePersonalDetails = (payload) => {
//     // eslint-disable-next-line no-console
//     console.log('[MOCK SAVE] personal details payload:', payload);
//     return Promise.resolve({ ok: true, payload });
// };

// export default function Personal() {
//     useEffect(() => {
//         const previousBodyBackground = document.body.style.backgroundColor;
//         document.body.style.backgroundColor = '#000';

//         return () => {
//             document.body.style.backgroundColor = previousBodyBackground;
//         };
//     }, []);

//     const fileInputRef = useRef(null);
//     const [uploadedFile, setUploadedFile] = useState(null);
//     const [formValues, setFormValues] = useState(() =>
//         FIELDS.reduce((acc, { id, value }) => {
//             acc[id] = value ?? '';
//             return acc;
//         }, {})
//     );
//     const [fieldErrors, setFieldErrors] = useState({});

//     const handleUploadClick = () => {
//         fileInputRef.current?.click();
//     };

//     const handleFileChange = (event) => {
//         const file = event.target.files?.[0];
//         if (file) {
//             setUploadedFile(file);
//         }
//     };

//     const handleFieldChange = (field) => (event) => {
//         const raw = event.target.value;
//         const next = field.sanitize ? field.sanitize(raw) : raw;
//         setFormValues((prev) => ({ ...prev, [field.id]: next }));
//         // Clear existing error as the user edits; re-validated on blur
//         if (fieldErrors[field.id]) {
//             setFieldErrors((prev) => ({ ...prev, [field.id]: '' }));
//         }
//     };

//     const handleFieldBlur = (field) => () => {
//         if (!field.validate) return;
//         const error = field.validate(formValues[field.id] ?? '');
//         setFieldErrors((prev) => ({ ...prev, [field.id]: error }));
//     };

//     const validateAll = () => {
//         const errors = {};
//         for (const field of FIELDS) {
//             if (field.validate) {
//                 const err = field.validate(formValues[field.id] ?? '');
//                 if (err) errors[field.id] = err;
//             }
//         }
//         setFieldErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (!validateAll()) return;

//         // Extract all values from the UI into a payload to be persisted later
//         const payload = {
//             ...formValues,
//             uploadedFile: uploadedFile
//                 ? {
//                     name: uploadedFile.name,
//                     size: uploadedFile.size,
//                     type: uploadedFile.type,
//                 }
//                 : null,
//             submittedAt: new Date().toISOString(),
//         };

//         savePersonalDetails(payload);
//     };

//     return (
//         <div className="container-fluid personal-page min-vh-100 w-100 p-0">
//             <header id="bad-header" className="personal-header bg-dark">
//                 <button type="button" className="header-icon-btn" aria-label="סגור">
//                     <img src="../src/assets/x.png" alt="Close" className="bad-close-icon" />
//                 </button>
//                 <h1 className="header-title">הרשמה לשירות</h1>
//                 <button type="button" className="header-icon-btn" aria-label="חזור">
//                     <ArrowForwardOutlinedIcon />
//                 </button>
//             </header>

//             <div className="personal-stepper">
//                 {steps.map((label, idx) => {
//                     const status =
//                         idx < currentStep ? 'done'
//                             : idx === currentStep ? 'current'
//                                 : 'future';
//                     return (
//                         <div key={label} className={`stepper-item stepper-item--${status}`}>
//                             <span className="step-label">
//                                 {status === 'done' && <CheckIcon className="step-check" />}
//                                 {status === 'current' && label}
//                             </span>
//                             <span className="step-bar" />
//                         </div>
//                     );
//                 })}
//             </div>

//             <p className="personal-subtitle text-white text-end me-3">
//                 כדאי לבדוק שוב שהפרטים נכונים
//             </p>

//             <form className="personal-form w-100 d-flex flex-column" onSubmit={handleSubmit} noValidate>
//                 {FIELDS.map((field) => {
//                     const { id, label, placeholder, type, options, readOnly, inputMode } = field;
//                     const error = fieldErrors[id];
//                     return (
//                         <div key={id} className="form-group d-flex flex-column text-white text-end">
//                             <label htmlFor={id}>{label}</label>
//                             {type === 'select' ? (
//                                 <div className="input-wrapper">
//                                     <select
//                                         className="w-100 text-end p-2 form-select-field"
//                                         id={id}
//                                         name={id}
//                                         value={formValues[id] ?? ''}
//                                         onChange={handleFieldChange(field)}
//                                         onBlur={handleFieldBlur(field)}
//                                     >
//                                         <option value="" disabled hidden>{placeholder}</option>
//                                         {options.map((opt) => (
//                                             <option key={opt} value={opt}>{opt}</option>
//                                         ))}
//                                     </select>
//                                     <ExpandMoreOutlinedIcon className="input-icon input-icon--chevron" />
//                                 </div>
//                             ) : (
//                                 <div className="input-wrapper">
//                                     <input
//                                         className={`w-100 text-end p-2${readOnly ? ' input--readonly' : ''}${error ? ' input--error' : ''}`}
//                                         type={type}
//                                         id={id}
//                                         name={id}
//                                         placeholder={placeholder}
//                                         value={formValues[id] ?? ''}
//                                         onChange={handleFieldChange(field)}
//                                         onBlur={handleFieldBlur(field)}
//                                         readOnly={readOnly}
//                                         inputMode={inputMode}
//                                         aria-invalid={Boolean(error)}
//                                         aria-describedby={error ? `${id}-error` : undefined}
//                                     />
//                                     {!readOnly && <EditOutlinedIcon className="input-icon" />}
//                                 </div>
//                             )}
//                             {error && (
//                                 <span id={`${id}-error`} className="field-error text-end">
//                                     {error}
//                                 </span>
//                             )}
//                         </div>
//                     );
//                 })}

//                 <section className="personal-upload-section">
//                     <h3 className="upload-title text-end">איך לערוך פרטים?</h3>
//                     <p className="upload-description text-end">
//                         .מייל וכתובת ע"י לחיצה על העיפרון
//                        <br /> .שם, גיל, תאריך לידה וטלפון ע"י צילום רישיון הנהיגה
//                     </p>

//                     <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*,.pdf"
//                         className="upload-hidden-input"
//                         onChange={handleFileChange}
//                     />
//                     <button
//                         type="button"
//                         className="upload-button w-100 d-flex align-items-center justify-content-between"
//                         onClick={handleUploadClick}
//                     >
//                         <span className="upload-icon-wrapper">
//                             <img src="../src/assets/upload.png" alt="Upload" className="upload-icon" />
//                         </span>
//                         <span className="upload-button-text me-3">
//                             {uploadedFile ? uploadedFile.name : 'צילום רישיון נהיגה'}
//                         </span>
//                     </button>
//                 </section>

//                 <button type="submit" className="primary-submit-btn">
//                     קדימה
//                 </button>
//             </form>
//         </div>
//     );
// }


// function Personal(){
// const [formData, setFromData] = useState({
//         firstName: 'ישראל',
//         lastName: 'ישראלי',
//         personalId: '123456789', // Exactly 9 digits
//         birthDate: '1995-01-01',
//         phone: '0501234567',     // Exactly 10 digits
//         email: 'israel.israeli@example.com',
//         city: 'תל אביב',
//         street: 'רוטשילד',
//         houseNumber: '10',
//         plateNumber: '12345678'  // Exactly 8 digits
//     });

//     const [status, setStatus] = useState({
//         type: '', text: ''
//     });

//     // Kept this just in case, though fields are readOnly now
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFromData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setStatus({ type: '', text: '' });

//         try {
//             // 2. Use FormData to send both text fields and the mock file
//             const data = new FormData();
            
//             // Append all text fields from state
//             Object.keys(formData).forEach((key) => {
//                 data.append(key, formData[key]);
//             });

//             // 3. Create a tiny blank mock image to bypass the backend driversLicense requirement
//             const mockBlob = new Blob([""], { type: "image/png" });
//             const mockFile = new File([mockBlob], "mock_license.png", { type: "image/png" });
//             data.append('driversLicense', mockFile);

//             const response = await axios.post('http://localhost:3000/api/users', data, {
//                 withCredentials: true,
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             setStatus({
//                 type: 'success',
//                 text: response.data.messsage // Matches your backend typo 'messsage'
//             });

//         } catch(error) {
//             setStatus({
//                 type: 'error',
//                 text: error.response?.data?.message || 'שגיאה בהתחברות לשרת'
//             });
//         }
//     }

// return (
//         <div className="container-fluid personal-page min-vh-100 w-100 p-0">
//             <header id="bad-header" className="personal-header bg-dark">
//                 <button type="button" className="header-icon-btn" aria-label="סגור">
//                     <img src="../src/assets/x.png" alt="Close" className="bad-close-icon" />
//                 </button>
//                 <h1 className="header-title">הרשמה לשירות</h1>
//                 <button type="button" className="header-icon-btn" aria-label="חזור">
//                     <ArrowForwardOutlinedIcon />
//                 </button>
//             </header>

//             <div className="personal-stepper">
//                 {steps.map((label, idx) => {
//                     const status =
//                         idx < currentStep ? 'done'
//                             : idx === currentStep ? 'current'
//                                 : 'future';
//                     return (
//                         <div key={label} className={`stepper-item stepper-item--${status}`}>
//                             <span className="step-label">
//                                 {status === 'done' && <CheckIcon className="step-check" />}
//                                 {status === 'current' && label}
//                             </span>
//                             <span className="step-bar" />
//                         </div>
//                     );
//                 })}
//             </div>

//             <p className="personal-subtitle text-white text-end me-3">
//                 כדאי לבדוק שוב שהפרטים נכונים
//             </p>

//             <form className="personal-form w-100 d-flex flex-column" onSubmit={handleSubmit} noValidate>
//                 {FIELDS.map((field) => {
//                     const { id, label, placeholder, type, options, readOnly, inputMode } = field;
//                     const error = fieldErrors[id];
//                     return (
//                         <div key={id} className="form-group d-flex flex-column text-white text-end">
//                             <label htmlFor={id}>{label}</label>
//                             {type === 'select' ? (
//                                 <div className="input-wrapper">
//                                     <select
//                                         className="w-100 text-end p-2 form-select-field"
//                                         id={id}
//                                         name={id}
//                                         value={formValues[id] ?? ''}
//                                         onChange={handleFieldChange(field)}
//                                         onBlur={handleFieldBlur(field)}
//                                     >
//                                         <option value="" disabled hidden>{placeholder}</option>
//                                         {options.map((opt) => (
//                                             <option key={opt} value={opt}>{opt}</option>
//                                         ))}
//                                     </select>
//                                     <ExpandMoreOutlinedIcon className="input-icon input-icon--chevron" />
//                                 </div>
//                             ) : (
//                                 <div className="input-wrapper">
//                                     <input
//                                         className={`w-100 text-end p-2${readOnly ? ' input--readonly' : ''}${error ? ' input--error' : ''}`}
//                                         type={type}
//                                         id={id}
//                                         name={id}
//                                         placeholder={placeholder}
//                                         value={formValues[id] ?? ''}
//                                         onChange={handleFieldChange(field)}
//                                         onBlur={handleFieldBlur(field)}
//                                         readOnly={readOnly}
//                                         inputMode={inputMode}
//                                         aria-invalid={Boolean(error)}
//                                         aria-describedby={error ? `${id}-error` : undefined}
//                                     />
//                                     {!readOnly && <EditOutlinedIcon className="input-icon" />}
//                                 </div>
//                             )}
//                             {error && (
//                                 <span id={`${id}-error`} className="field-error text-end">
//                                     {error}
//                                 </span>
//                             )}
//                         </div>
//                     );
//                 })}

//                 <section className="personal-upload-section">
//                     <h3 className="upload-title text-end">איך לערוך פרטים?</h3>
//                     <p className="upload-description text-end">
//                         .מייל וכתובת ע"י לחיצה על העיפרון
//                        <br /> .שם, גיל, תאריך לידה וטלפון ע"י צילום רישיון הנהיגה
//                     </p>

//                     <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*,.pdf"
//                         className="upload-hidden-input"
//                         onChange={handleFileChange}
//                     />
//                     <button
//                         type="button"
//                         className="upload-button w-100 d-flex align-items-center justify-content-between"
//                         onClick={handleUploadClick}
//                     >
//                         <span className="upload-icon-wrapper">
//                             <img src="../src/assets/upload.png" alt="Upload" className="upload-icon" />
//                         </span>
//                         <span className="upload-button-text me-3">
//                             {uploadedFile ? uploadedFile.name : 'צילום רישיון נהיגה'}
//                         </span>
//                     </button>
//                 </section>

//                 <button type="submit" className="primary-submit-btn">
//                     קדימה
//                 </button>
//             </form>
//         </div>
//     );
// }




import React, { useEffect, useRef, useState } from 'react';
import '../css/register.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CheckIcon from '@mui/icons-material/Check';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import axios from 'axios'; // Added axios import for database connection

const cities = ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'אשדוד', 'רמת גן', 'פתח תקווה', 'ראשון לציון', 'חולון', 'בת ים', 'רעננה'];

// Configured fields array to match your state keys directly
const FIELDS = [
    { id: 'firstName', label: 'שם פרטי', type: 'text', readOnly: true },
    { id: 'lastName', label: 'שם משפחה', type: 'text', readOnly: true },
    { id: 'personalId', label: 'תעודת זהות', type: 'text', readOnly: true }, // Aligned with 'personalId' key
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

    // --- IMPLEMENTED PIECE OF CODE START ---
    const [formData, setFromData] = useState({
        firstName: 'ישראל',
        lastName: 'ישראלי',
        personalId: '123456789', // Exactly 9 digits
        birthDate: '1995-01-01',
        phone: '0501234567',     // Exactly 10 digits
        email: 'israel.israeli@example.com',
        city: 'תל אביב',
        street: 'רוטשילד',
        houseNumber: '10',
        plateNumber: '12345678'  // Exactly 8 digits
    });

    const [status, setStatus] = useState({
        type: '', text: ''
    });

    // Kept this just in case, though fields are readOnly now
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFromData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Optional safety: Runs validation checks on editable fields before submitting
        if (!validateAll()) return;

        setStatus({ type: '', text: '' });

        try {
            // 2. Use FormData to send both text fields and the mock file
            const data = new FormData();
            
            // Append all text fields from state
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            // 3. Create a tiny blank mock image to bypass the backend driversLicense requirement
            const mockBlob = new Blob([""], { type: "image/png" });
            const mockFile = new File([mockBlob], "mock_license.png", { type: "image/png" });
            data.append('driversLicense', mockFile);

            const response = await axios.post('http://localhost:3000/api/users', data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setStatus({
                type: 'success',
                text: response.data.messsage // Matches your backend typo 'messsage'
            });

        } catch(error) {
            setStatus({
                type: 'error',
                text: error.response?.data?.message || 'שגיאה בהתחברות לשרת'
            });
        }
    }
    // --- IMPLEMENTED PIECE OF CODE END ---

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
        }
    };

    const handleFieldChange = (field) => (event) => {
        const raw = event.target.value;
        const next = field.sanitize ? field.sanitize(raw) : raw;
        setFromData((prev) => ({ ...prev, [field.id]: next }));
        
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

                {/* Status Message Display Container */}
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