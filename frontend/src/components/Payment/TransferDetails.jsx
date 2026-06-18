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
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [activeStep, setActiveStep] = useState(1);

    const [formData, setFormData] = useState({
        beneficiary: '',
        bank: '',
        branch: '',
        accountNumber: '',
        uploadedFile: null
    });

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
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/documents`, data,{
                withCredentials: true
            });
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
        console.log("Moving forward with:", formData);
        window.location.href='/paymentfinalize'
    };

    const isContinueEnabled = !!formData.uploadedFile && !isUploading;

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