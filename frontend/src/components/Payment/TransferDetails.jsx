import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import uploadIcon from '../../assets/upload.png';
import logoIcon from '../../assets/logo.png';
import letterIcon from '../../assets/Letter.png';
import PaymentHeader from '../shared/PaymentHeader';
import Steps, { defaultSteps } from './Steps';
import '../../pages/css/payment.css';
import './TransferDetails.css';





// const beneficiaryMockData = [
//   {
//     label: 'למוטב',
//     value: 'יוניון מוטורס בע"מ',
//     showIcon: true,
//   },
//   {
//     label: 'בנק',
//     value: 'הפועלים - 12',
//   },
//   {
//     label: 'סניף',
//     value: '600',
//   },
//   {
//     label: 'מספר חשבון',
//     value: '663965',
//   },
// ];

// const formatSizeMb = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)}MB`;

// const createMockUploadedFile = (file, index = 0) => ({
//   id: `mock-${Date.now()}-${index}-${file.name}`,
//   name: file.name,
//   sizeMb: formatSizeMb(file.size),
//   isMock: true,
// });

// function TransferDetails() {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadError, setUploadError] = useState('');
//   const activeStep = defaultSteps.indexOf('דיווח העברה');
//   const isContinueEnabled = uploadedFiles.length > 0;

//   useEffect(() => {
//     const loadDocuments = async () => {
//       const loggedInUserId = localStorage.getItem('userId');

//       if (!loggedInUserId) {
//         setUploadError('משתמש לא מחובר, מוצגים נתונים מקומיים בלבד');
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/documents/${loggedInUserId}`
//         );

//         const documents = Array.isArray(response.data) ? response.data : [];
//         const normalized = documents.map((doc, index) => ({
//           id: doc._id || `server-${index}`,
//           name: doc.fileName || `document-${index + 1}`,
//           sizeMb: '0.0MB',
//           isMock: false,
//         }));

//         setUploadedFiles(normalized);
//         setUploadError('');
//       } catch (error) {
//         const errorMessage = error.response?.data?.message || 'שגיאה בטעינת מסמכים';
//         setUploadError(errorMessage);
//       }
//     };

//     loadDocuments();
//   }, []);

//   const handleUploadClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = async (event) => {
//     const files = Array.from(event.target.files || []);

//     if (files.length === 0) {
//       return;
//     }

//     const loggedInUserId = localStorage.getItem('userId');
//     if (!loggedInUserId) {
//       const mockFiles = files.map((file, index) => createMockUploadedFile(file, index));
//       setUploadedFiles((prevFiles) => [...prevFiles, ...mockFiles]);
//       event.target.value = '';
//       return;
//     }

//     setIsUploading(true);

//     try {
//       const uploadResults = await Promise.allSettled(
//         files.map(async (file) => {
//           const formData = new FormData();
//           formData.append('document', file);
//           formData.append('userId', loggedInUserId);
//           formData.append('fileType', 'orderDocs');

//           const response = await axios.post(
//             `${import.meta.env.VITE_BACKEND_URL}/api/documents`,
//             formData
//           );

//           const uploaded = response.data.document;

//           return {
//             id: uploaded._id,
//             name: uploaded.fileName,
//             sizeMb: formatSizeMb(file.size),
//             isMock: false,
//           };
//         })
//       );

//       const successFiles = [];
//       const fallbackFiles = [];
//       let lastErrorMessage = '';

//       uploadResults.forEach((result, index) => {
//         if (result.status === 'fulfilled') {
//           successFiles.push(result.value);
//           return;
//         }

//         const file = files[index];
//         fallbackFiles.push(createMockUploadedFile(file, index));
//         lastErrorMessage =
//           result.reason?.response?.data?.message ||
//           result.reason?.message ||
//           'שגיאה בהעלאת קובץ';
//       });

//       if (successFiles.length > 0 || fallbackFiles.length > 0) {
//         setUploadedFiles((prevFiles) => [...prevFiles, ...successFiles, ...fallbackFiles]);
//       }

//       if (fallbackFiles.length > 0) {
//         setUploadError(`${lastErrorMessage}. מוצגים נתוני דמו לפי שמות הקבצים שהועלו.`);
//       } else {
//         setUploadError('');
//       }
//     } finally {
//       setIsUploading(false);
//       event.target.value = '';
//     }
//   };

//   const handleRemoveFile = async (fileId) => {
//     const loggedInUserId = localStorage.getItem('userId');

//     if (!loggedInUserId) {
//       alert('משתמש לא מחובר, נא להתחבר');
//       return;
//     }

//     const fileToRemove = uploadedFiles.find((file) => file.id === fileId);

//     if (fileToRemove?.isMock) {
//       setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
//       return;
//     }

//     try {
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/documents/${fileId}`, {
//         data: {
//           userId: loggedInUserId,
//         },
//       });

//       setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'שגיאה במחיקת קובץ';
//       alert(errorMessage);
//     }
//   };

//   const handleContinue = () => {
//     navigate('/paymentfinalize');
//   };

  

//   return (
//     <div className="container-fluid transfer-details-page">
//       <PaymentHeader title = 'ביצוע תשלום' stepIndex={activeStep} />
//       <div className="transfer-details-shell">
//         <Steps activeStep={activeStep} className="transfer-details-step-row" showCompleted />

//         <main className="transfer-details-content px-3 pb-4">
//           <section className="transfer-details-card">
//             <h2 className="transfer-details-heading text-end">צירוף אישור תשלום</h2>
//             <p className="transfer-details-subtext text-end mb-4">
//               כאן ניתן להעלות את מסמך ההעברה הבנקאית שביצעת מול הבנק.
//               <br />
//               ניתן להעלות מספר מסמכים של אישורי העברה בנקאית.
//             </p>

//             <input
//               ref={fileInputRef}
//               type="file"
//               className="transfer-details-input"
//               multiple
//               accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
//               onChange={handleFileChange}
//             />

//             <button
//               type="button"
//               className="transfer-details-upload-btn"
//               onClick={handleUploadClick}
//               disabled={isUploading}
//             >
//               <img src={uploadIcon} alt="העלאת מסמך" className="transfer-details-upload-icon" />
//               <span>{isUploading ? 'מעלה קבצים...' : 'להעלאת שם המסמך'}</span>
//             </button>

//             {uploadError && (
//               <p className="text-danger text-end mt-2 mb-0">{uploadError}</p>
//             )}

//             {uploadedFiles.length > 0 && (
//               <div className="transfer-details-files-container mt-3">
//                 {uploadedFiles.map((file) => (
//                   <div key={file.id} className="transfer-details-file-box d-flex align-items-center justify-content-between">
//                     <div className="transfer-details-file-info d-flex align-items-center gap-2">
//                       <img src={letterIcon} alt="קובץ שהועלה" className="transfer-details-file-icon" />
//                       <div className="transfer-details-file-text text-end">
//                         <p className="mb-0 transfer-details-file-name">{file.name}</p>
//                         <p className="mb-0 transfer-details-file-size">{file.sizeMb}</p>
//                       </div>
//                     </div>

//                     <button
//                       type="button"
//                       className="transfer-details-file-close"
//                       onClick={() => handleRemoveFile(file.id)}
//                       aria-label="הסר קובץ"
//                     >
//                       <CloseOutlinedIcon fontSize="small" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>

//           <section className="transfer-details-beneficiary mt-4">
//             <h3 className="transfer-details-beneficiary-title text-end">ריכזנו עבורך את פרטי המוטב</h3>
//             <div className="transfer-details-beneficiary-card mt-3">
//               {beneficiaryMockData.map((item) => (
//                 <div
//                   key={item.label}
//                   className="transfer-details-beneficiary-row d-flex align-items-center justify-content-between"
//                 >
//                   <span className="transfer-details-beneficiary-label">{item.label}</span>
//                   {item.showIcon ? (
//                     <div className="transfer-details-beneficiary-value d-flex align-items-center gap-2">
//                       <span>{item.value}</span>
//                       <img src={logoIcon} alt="מסמך" className="transfer-details-beneficiary-doc-icon" />
//                     </div>
//                   ) : (
//                     <span className="transfer-details-beneficiary-value">{item.value}</span>
//                   )}
//                 </div>
//               ))}
//             </div>
//             <p className="transfer-details-footnote text-end mb-0 mt-3">
//               *העברה בנקאית מתעדכנת עד 4 ימי עסקים מרגע שליחת האסמכתא
//             </p>
//           </section>
//         </main>

//         <footer className="transfer-details-footer px-3 pb-4">
//           <button
//             type="button"
//             className={`transfer-details-cta ${isContinueEnabled ? 'transfer-details-cta--enabled' : 'transfer-details-cta--disabled'}`}
//             onClick={handleContinue}
//             disabled={!isContinueEnabled}
//           >
//             קדימה
//           </button>
//         </footer>
//       </div>
//     </div>
//   );
// }

// Make sure to import your icons here (UploadFileOutlinedIcon, CloseOutlinedIcon, InsertDriveFileIcon)



// ודא שכל הרכיבים והאייקונים מיובאים כאן בצורה תקינה:
// import PaymentHeader from './PaymentHeader';
// import Steps from './Steps';
// import uploadIcon from './assets/upload.svg';
// import letterIcon from './assets/letter.svg';

const parseBankDetails = (text) => {
    if (!text) {
        return {};
    }

    const beneficiaryMatch = text.match(/([^\n\r]+)\s*[\n\r]+\s*למוטב/);
    const bankMatch        = text.match(/([^\n\r]+)\s*[\n\r]+\s*בנק/);
    const branchMatch      = text.match(/([^\n\r]+)\s*[\n\r]+\s*סניף/);
    const accountMatch     = text.match(/([^\n\r]+)\s*[\n\r]+\s*מספר חשבון/);

    return {
        beneficiary: beneficiaryMatch ? beneficiaryMatch[1].trim() : 'לא נמצא',
        bank: bankMatch ? bankMatch[1].trim() : 'לא נמצא',
        branch: branchMatch ? branchMatch[1].trim() : 'לא נמצא',
        accountNumber: accountMatch ? accountMatch[1].trim() : 'לא נמצא'
    };
};

export default function TransferDetails() {
    const fileInputRef = useRef(null);
    
    // הגדרת משתני ה-State המקומיים (תואם למחלקות העיצוב הישנות)
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [activeStep, setActiveStep] = useState(1); // שלב ברירת מחדל עבור הצירוף

    const [formData, setFormData] = useState({
        beneficiary: '',
        bank: '',
        branch: '',
        accountNumber: '',
        uploadedFile: null
    });

    // פונקציית עזר לעדכון ה-State הפנימי
    const updateForm = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setUploadError('משתמש לא מחובר, נא להתחבר');
            return;
        }

        setIsUploading(true);
        setUploadError('');

        const data = new FormData();
        data.append('document', file);
        data.append('userId', userId);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/documents`, data);
            const result = response.data;

            if (result.document) {
                const rawText = result.document.extractedText;
                const parsedData = parseBankDetails(rawText);

                updateForm('beneficiary', parsedData.beneficiary);
                updateForm('bank', parsedData.bank);
                updateForm('branch', parsedData.branch); 
                updateForm('accountNumber', parsedData.accountNumber);
                updateForm('uploadedFile', {
                    name: file.name,
                    sizeMb: (file.size / (1024 * 1024)).toFixed(1) + 'MB'
                });
            }
        } catch (error) {
            console.error('שגיאה בעת העלאת קובץ', error);
            const errorMsg = error.response?.data?.message || 'אירעה שגיאה בעיבוד המסמך';
            setUploadError(errorMsg);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveFile = () => {
        updateForm('beneficiary', '');
        updateForm('bank', '');
        updateForm('branch', ''); 
        updateForm('accountNumber', ''); 
        updateForm('uploadedFile', null); 
        setUploadError('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleContinue = () => {
        // לוגיקת מעבר שלב או שליחת הטופס הסופי
        console.log("Moving forward with:", formData);
        window.location.href='/paymentfinalize'
    };

    // כפתור המשך יופעל רק אם קיים קובץ שהועלה בהצלחה ואיננו בתהליך העלאה
    const isContinueEnabled = !!formData.uploadedFile && !isUploading;

    // מבנה נתונים דינמי שמחליף את ה-MockData הישן ומציג את מה שחולץ מהקובץ
    const beneficiaryRows = [
        { label: 'למוטב', value: formData.beneficiary || '—' },
        { label: 'בנק', value: formData.bank || '—' },
        { label: 'סניף', value: formData.branch || '—' },
        { label: 'מספר חשבון', value: formData.accountNumber || '—' }
    ];

    return (
        <div className="container-fluid transfer-details-page" style={{ direction: 'rtl' }}>
            <PaymentHeader title='ביצוע תשלום' stepIndex={activeStep} />
            
            <div className="transfer-details-shell">
                <Steps activeStep={activeStep} className="transfer-details-step-row" showCompleted />

                <main className="transfer-details-content px-3 pb-4">
                    <section className="transfer-details-card">
                        <h2 className="transfer-details-heading text-end">צירוף אישור תשלום</h2>
                        <p className="transfer-details-subtext text-end mb-4">
                            כאן ניתן להעלות את מסמך ההעברה הבנקאית שביצעת מול הבנק.
                            <br />
                            קובץ אחד בכל העלאה בבקשה*
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            className="transfer-details-input"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />

                        {/* הצגת כפתור ההעלאה רק אם לא הועלה קובץ עדיין */}
                        {!formData.uploadedFile && (
                            <button
                                type="button"
                                className="transfer-details-upload-btn"
                                onClick={handleUploadClick}
                                disabled={isUploading}
                            >
                                <img src={uploadIcon} alt="העלאת מסמך" className="transfer-details-upload-icon" />
                                <span>{isUploading ? 'מעבד ומחלץ נתונים...' : 'להעלאת שם המסמך'}</span>
                            </button>
                        )}

                        {uploadError && (
                            <p className="text-danger text-end mt-2 mb-0">{uploadError}</p>
                        )}

                        {/* הצגת תיבת הקובץ הנוכחי במידה והועלה בהצלחה */}
                        {formData.uploadedFile && (
                            <div className="transfer-details-files-container mt-3">
                                <div className="transfer-details-file-box d-flex align-items-center justify-content-between">
                                    <div className="transfer-details-file-info d-flex align-items-center gap-2">
                                        <img src={letterIcon} alt="קובץ שהועלה" className="transfer-details-file-icon" />
                                        <div className="transfer-details-file-text text-end">
                                            <p className="mb-0 transfer-details-file-name">{formData.uploadedFile.name}</p>
                                            <p className="mb-0 transfer-details-file-size">{formData.uploadedFile.sizeMb}</p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="transfer-details-file-close"
                                        onClick={handleRemoveFile}
                                        aria-label="הסר קובץ"
                                    >
                                        <CloseOutlinedIcon fontSize="small" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* הצגת סיכום פרטי המוטב רק לאחר שהועלה קובץ ונתוניו חולצו */}
                    {formData.uploadedFile && (
                        <section className="transfer-details-beneficiary mt-4">
                            <h3 className="transfer-details-beneficiary-title text-end">ריכזנו עבורך את פרטי המוטב</h3>
                            <div className="transfer-details-beneficiary-card mt-3">
                                {beneficiaryRows.map((item) => (
                                    <div
                                        key={item.label}
                                        className="transfer-details-beneficiary-row d-flex align-items-center justify-content-between"
                                    >
                                        <span className="transfer-details-beneficiary-label">{item.label}</span>
                                        <span className="transfer-details-beneficiary-value">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="transfer-details-footnote text-end mb-0 mt-3">
                                *העברה בנקאית מתעדכנת עד 4 ימי עסקים מרגע שליחת האסמכתא
                            </p>
                        </section>
                    )}
                </main>

                <footer className="transfer-details-footer px-3 pb-4">
                    <button
                        type="button"
                        className={`transfer-details-cta ${isContinueEnabled ? 'transfer-details-cta--enabled' : 'transfer-details-cta--disabled'}`}
                        onClick={handleContinue}
                        disabled={!isContinueEnabled}
                    >
                        קדימה
                    </button>
                </footer>
            </div>
        </div>
    );
}