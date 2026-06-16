import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import uploadIcon from '../../assets/upload.png';
import letterIcon from '../../assets/Letter.png';
import PaymentHeader from '../shared/PaymentHeader';
import Steps, { defaultSteps } from './Steps';
import '../../pages/css/payment.css';
import './TransferDetails.css';

const beneficiaryMockData = [
  {
    label: 'למוטב',
    value: 'יוניון מוטורס בע"מ',
    showIcon: true,
  },
  {
    label: 'בנק',
    value: 'הפועלים - 12',
  },
  {
    label: 'סניף',
    value: '600',
  },
  {
    label: 'מספר חשבון',
    value: '663965',
  },
];

function TransferDetails() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const activeStep = defaultSteps.indexOf('דיווח העברה');

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    const normalizedFiles = files.map((file, index) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${index}`,
      name: file.name,
      sizeMb: `${(file.size / (1024 * 1024)).toFixed(1)}MB`,
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...normalizedFiles]);
    event.target.value = '';
  };

  const handleRemoveFile = (fileId) => {
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
  };

  const handleContinue = () => {
    navigate('/paymentfinalize');
  };

  return (
    <div className="container-fluid transfer-details-page">
      <PaymentHeader title = 'ביצוע תשלום' stepIndex={activeStep} />
      <div className="transfer-details-shell">
        <Steps activeStep={activeStep} className="transfer-details-step-row" showCompleted />

        <main className="transfer-details-content px-3 pb-4">
          <section className="transfer-details-card">
            <h2 className="transfer-details-heading text-end">צירוף אישור תשלום</h2>
            <p className="transfer-details-subtext text-end mb-4">
              כאן ניתן להעלות את מסמך ההעברה הבנקאית שביצעת מול הבנק.
              <br />
              ניתן להעלות מספר מסמכים של אישורי העברה בנקאית.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              className="transfer-details-input"
              multiple
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
            />

            <button
              type="button"
              className="transfer-details-upload-btn"
              onClick={handleUploadClick}
            >
              <img src={uploadIcon} alt="העלאת מסמך" className="transfer-details-upload-icon" />
              <span>להעלאת שם המסמך</span>
            </button>

            {uploadedFiles.length > 0 && (
              <div className="transfer-details-files-container mt-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="transfer-details-file-box d-flex align-items-center justify-content-between">
                    <button
                      type="button"
                      className="transfer-details-file-close"
                      onClick={() => handleRemoveFile(file.id)}
                      aria-label="הסר קובץ"
                    >
                      <CloseOutlinedIcon fontSize="small" />
                    </button>

                    <div className="transfer-details-file-info d-flex align-items-center gap-2">
                      <div className="transfer-details-file-text text-end">
                        <p className="mb-0 transfer-details-file-name">{file.name}</p>
                        <p className="mb-0 transfer-details-file-size">{file.sizeMb}</p>
                      </div>
                      <img src={letterIcon} alt="קובץ שהועלה" className="transfer-details-file-icon" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="transfer-details-beneficiary mt-4">
            <h3 className="transfer-details-beneficiary-title text-end">ריכזנו עבורך את פרטי המוטב</h3>
            <div className="transfer-details-beneficiary-card mt-3">
              {beneficiaryMockData.map((item) => (
                <div
                  key={item.label}
                  className="transfer-details-beneficiary-row d-flex align-items-center justify-content-between"
                >
                  <span className="transfer-details-beneficiary-label">{item.label}</span>
                  {item.showIcon ? (
                    <div className="transfer-details-beneficiary-value d-flex align-items-center gap-2">
                      <img src={letterIcon} alt="מסמך" className="transfer-details-beneficiary-doc-icon" />
                      <span>{item.value}</span>
                    </div>
                  ) : (
                    <span className="transfer-details-beneficiary-value">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
            <p className="transfer-details-footnote text-end mb-0 mt-3">
              *העברה בנקאית מתעדכנת עד 4 ימי עסקים מרגע שליחת האסמכתא
            </p>
          </section>
        </main>

        <footer className="transfer-details-footer px-3 pb-4">
          <button
            type="button"
            className="transfer-details-cta"
            onClick={handleContinue}
          >
            קדימה
          </button>
        </footer>
      </div>
    </div>
  );
}

export default TransferDetails;
