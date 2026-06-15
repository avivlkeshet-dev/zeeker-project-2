import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { useState, useRef, useEffect } from 'react';
import { Button, Paper, Box, StepContent, Typography } from '@mui/material';
import { Label } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CurrencyFormat from '../utils/Currency';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import './css/Method.css';
import './css/payment.css';
import './css/Transfer.css';
import axios from 'axios';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#E65C00',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#E65C00',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

const QontoStepIconRoot = styled('div')(({ theme }) => ({
  color: '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-completedIcon': {
    color: '#E65C00',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  ...theme.applyStyles('dark', {
    color: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        color: '#E65C00',
      },
    },
  ],
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

function Method({formData, updateForm}) {
    function handleNavigate(){
        window.location.href='/Transfer';
    }
    return (
        <div className='w-100 d-flex flex-column'>
            <div className="image payment-car-image w-100">
                <img src="../src/assets/car3d.png" alt="car3d" />
            </div>
            <div>
                <div className="summary bg-dark">
                    <div className="sumarry-card-container w-100 d-flex flex-column p-3">
                        <h3 className='your-total-sum text-white text-end'>סיכום ההזמנה שלך</h3>
                        <hr />
                        <div className="summary-data-row w-100 text-white d-flex align-items-center justify-content-between">
                            <span className='price-value'>{CurrencyFormat(153000)}</span>
                            <div className='d-flex flex-row align-items-baseline gap-1'>
                                <span className='label-subtext'>(*כולל אגרת רישוי)</span>
                                <span className='label-text'>עלות הזמנה</span>
                            </div>
                        </div>
                        <div className="summary-data-row w-100 text-white d-flex align-items-center justify-content-between mt-2">
                            <span className='price-value discount-value'>{CurrencyFormat(-500)}</span>
                            <span className='label-text'>הנחת מבצע</span>
                        </div>
                        <hr  className='my-3'/>
                        <div className="summary-data-row summary-total-row w-100 text-white d-flex align-items-center justify-content-between mb-2">
                            <span className='price-value price-total'>{CurrencyFormat(59000)}</span>
                            <span className='label-text label-total'>סה"כ שולם</span>
                        </div>
                        <div className="alert-banner text-white w-100 text-white d-flex align-items-center justify-content-between">
                            <img src="../src/assets/i_icon.png" alt="info" />
                            <div className=''>
                            <span className='banner-text'>עד 4 ימי עסקים לורם איפסון ליאוון איפסום</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="customer-service d-flex mt-4 justify-content-between">
                <img src="../src/assets/Headphones.png" alt="agent" />
                <p className='text-end text-white'>
                    דניאל אביב, נציג/ת המכירות שלך מקבל עדכונים על כל מה שנעשה כאן, כמובן שתוכל לפנות אליו בכל עת.
                </p>
            </div>
            <div className='w-100 payment-bottom-bar'>
                <div className="total d-flex w-100 align-items-center justify-content-between p-3">
                    <h2 className='total-sum text-white mb-0'>יתרה לתשלום</h2>
                    <h2 className='total-sum text-white mb-0'>{CurrencyFormat(96000)}</h2>
                </div>
                <div className="method-section">
                    <button onClick={handleNavigate} className='select-default-btn'>העברה בנקאית</button>
                    <button className='select-opt-btn'>
                        אפשרויות מימון
                    </button>
                </div>
            </div>
        </div>
    );
}


const reviews = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
                  you're willing to spend on clicks and conversions, which networks
                  and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`,
  },
];

function Review({formData, updateForm}) {
  return (
    <Box sx={{ maxWidth: 450 }}>
      <Stepper orientation="vertical" alternativeLabel>
        {reviews.map((review, index) => (
          <Step key={review.label} active={true}>
            <StepLabel
            icon={<CircleOutlinedIcon sx={{ color: '#FF5800', fontSize: '24px' }} />}
              optional={
                index === reviews.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {review.label}
            </StepLabel>
            <StepContent active={true}
                sx={{
                    backgroundColor: "green"
                }}
            >
              <Typography sx={{ color: 'white' }}>
                {review.description}
              </Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

const parseBankDetails = (text) => {

    if(!text) {
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

function TransferReport({ formData, updateForm }) {
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];

        if(!file) {
            return;
        }

        // using this local storage to grab the userId dynamically from the cache
        const userId = localStorage.getItem('userId');

        if(!userId) {
            alert('משתמש לא מחובר, נא להתחבר');
            return;
        }

        setLoading(true);

        const data = new FormData();

        data.append('document', file);
        data.append('userId', userId);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/documents`, data);

            const result = response.data;

            if(result.document) {
                const rawText = result.document.extractedText;
                const parsedData = parseBankDetails(rawText);

                updateForm('beneficiary', parsedData.beneficiary);
                updateForm('bank', parsedData.bank);
                updateForm('branch', parsedData.branch); 
                updateForm('accountNumber', parsedData.accountNumber);
                updateForm('uploadedFile', {
                    name: file.name,
                    size: (file.size / (1024 * 1024)).toFixed(1) + 'MB'
                });
            }
        } catch (error) {
            console.log('שגיאת בעת העלאת קובץ ', error);

            const errorMsg = error.response?.data?.message;
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveFile = () => {
        updateForm('beneficiary', '');
        updateForm('bank', '');
        updateForm('accountnUmber', '');
        updateForm('uploadFile', '');
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="transfer-docs"
            style={{
                direction: 'rtl', color: '#ffffff'
            }}
        >
            <div className="top-container">
                <div className='d-flex flex-column mb-3' 
                    style={{ color: '#E65C00',
                    fontSize: '20px' }}>
                    <h2 className='text-end'>
                        צירוף אישור תשלום
                    </h2>
                    <p className='text-muted small'>
                        כאן אפשר להעלות את אישור העברה הבנקאית. קובץ אחד בכל העלאה בבקשה*
                    </p>
                </div>
                <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept='.pdf,.doc,.docx'
                    style={{
                        display: 'none'
                    }}
                />
                {!formData.uploadedFile ? (
                    <div className='w-100'>
                        <button className='upload-file w-100 d-flex align-items-center justify-content p-4'
                            onClick={handleClick}
                            disabled={loading}
                            style={{
                                border: '2px dashed #555',
                                background: 'transparent',
                                color: '#ffffff',
                                borderRadius: '8px'
                            }}
                        >
                            {
                             loading ? 'להעלות מסמך' : 'מעבד ומחלץ נתונים'
                            }
                            {
                                !loading && <UploadFileOutlinedIcon className='ms-2' />
                            }
                        </button>
                    </div>
                ) : (
                    <div className='d-flex align-items-center justify-content-between p-3 mb-4'
                        style={{
                            border: '1px solid #e65c00',
                            borderRadius: '8px',
                            background: '#111'
                        }}>
                            <button onClick={handleRemoveFile}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#ffffff'
                                }}>
                                <CloseOutlinedIcon />
                            </button>
                            <div className='d-flex align-items-center'>
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                    }}>
                                    {formData.uploadedFile.name}
                                </div>
                                <div
                                    style={{
                                        color: '#8a8d91',
                                        fontSize: '12px'
                                    }}
                                >
                                    {formData.uploadedFile.size}
                                </div>
                                <InsertDriveFileIcon
                                    style={{
                                        color: '#e65c00',
                                        fontSize: '32px'
                                    }} />
                            </div>
                    </div>
                )}
            </div>
            {formData.uploadedFile && (
                <div className='mt-4 p-4' style={{
                    background: '#1c1c1e',
                    borderRadius: '12px'
                }}>
                    <h3 className='text-center mb-4' style={{
                        fontSize: '16px',
                        color: '#ffffff'
                    }}>
                        ריכזנו עבורך את פרטי המוטב
                    </h3>
                    <div className='d-flex align-items-center justify-content-between mb-3'
                        style={{
                            borderBottom: '1px solid #2c2c2e',
                            paddingBottom: '8px',
                        }}>
                        <span style={{
                            color: '#8a8d91',
                        }}>
                            למוטב
                        </span>
                        <span style={{
                            fontWeight: 'bold'
                        }}>
                            {formData.beneficiary}
                        </span>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mb-3'
                        style={{
                            borderBottom: '1px solid #2c2c2e',
                            paddingBottom: '8px',
                        }}>
                        <span style={{
                            color: '#8a8d91',
                        }}>
                            בנק
                        </span>
                        <span style={{
                            fontWeight: 'bold'
                        }}>
                            {formData.bank}
                        </span>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mb-3'
                        style={{
                            borderBottom: '1px solid #2c2c2e',
                            paddingBottom: '8px',
                        }}>
                        <span style={{
                            color: '#8a8d91',
                        }}>
                            סניף
                        </span>
                        <span style={{
                            fontWeight: 'bold'
                        }}>
                            {formData.branch}
                        </span>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mb-3'
                        style={{
                            borderBottom: '1px solid #2c2c2e',
                            paddingBottom: '8px',
                        }}>
                        <span style={{
                            color: '#8a8d91',
                        }}>
                            מספר חשבון
                        </span>
                        <span style={{
                            fontWeight: 'bold'
                        }}>
                            {formData.accountNumber}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

const steps = ['תשלום', 'דיווח העברה', 'ביקורת'];
// const steps = ['','','תשלום'];

export default function CustomizedSteppers() {

    useEffect(() => {
        const previousBodyBackground = document.body.style.backgroundColor;
        document.body.style.backgroundColor = '#000';

        return () => {
            document.body.style.backgroundColor = previousBodyBackground;
        };
    }, []);

    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    // Add these fields for the file data
    beneficiary: '',
    bank: '',
    branch: '',
    accountNumber: '',
    uploadedFile: null // Stores file metadata like name and size
});

    const updateForm = (key, value) => {
        setFormData(prev => ({...prev, [key]: value}));
    }

    const handleNext = () => {
        if(activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
        else {
            // navigate to a success page
            alert("הטופס נשלח בהצלחה");
        }
    }

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    }

    const renderFormStep = (step) => {
        switch(step) {
            case 0:
                return <Method formData={formData} updateForm={updateForm} />
            case 1:
                return <TransferReport formData={formData} updateForm={updateForm} />
            case 2:
                return <Review formData={formData} updateForm={updateForm} />
            default:
                return null;
        }
    }

    return (
        <div className="container-fluid w-100 d-flex flex-column payment-page-wrapper">
            <div className='top-bar w-100 text-white d-flex align-items-center justify-content-between p-3'>
                <ArrowForwardOutlinedIcon />
                <h1>ביצוע תשלום</h1>
                <CloseOutlinedIcon/>
            </div>
            <div className="top-container d-flex flex-column">
                <div className="payment-tab-row">
                    {steps.map((label, i) => (
                        <span
                            key={i}
                            className={`payment-tab${activeStep === i ? ' payment-tab--active' : ' payment-tab--inactive'}`}
                        >
                            {activeStep === i ? label : ''}
                        </span>
                    ))}
                </div>
                <div className='w-100 px-2'>
                    {renderFormStep(activeStep)}
                </div>
            </div>
            <div className="bottom-container w-100">
                <div className='d-flex w-100 align-items-center justify-content-evenly'>
                    <button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        style={{
                            color: activeStep === 0 ? '#555' : '#8A8D91'
                        }}
                        >
                            אפשרויות מימון
                    </button>
                    <button className='orange-btn' onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'שלח טופס' : 'הבא'}
                    </button>
                </div>
            </div>
        </div>
    );
}
