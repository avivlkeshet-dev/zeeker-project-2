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
import { useState } from 'react';
import { Button } from '@mui/material';
import { Label } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CurrencyFormat from '../utils/Currency';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import './css/Method.css';
import './css/payment.css';
import './css/Transfer.css';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
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
    return (
        <div className='w-100 d-flex flex-column'>
            <div className="image w-100 h-100 d-flex flex-column align-items-center justify-content-center p-5">
                <img src="../src/assets/car3d.png" alt="car3d"  className='w-100 h-100'/>
            </div>
            <div>
                <div className="summary bg-dark">
                    <div className="sumarry-card-container w-100 d-flex flex-column p-3">
                        <h3 className='text-white text-end p-2'>סיכום ההזמנה שלך</h3>
                        <hr />
                        <div className="summary-data-row w-100 text-white d-flex align-items-center justify-content-between p-2">
                            <span className='price-value'>{CurrencyFormat(153000)}</span>
                            <span className='label-text'>עלות ההזמנה</span>
                        </div>
                        <div className="summary-data-row w-100 text-white d-flex align-items-center justify-content-between p-2">
                            <span className='price-value'>{CurrencyFormat(500)}</span>
                            <span className='label-text'>הנחת מבצע</span>
                        </div>
                        <hr  className='my-3'/>
                        <div className="summary-data-row w-100 text-white d-flex align-items-center justify-content-between p-2">
                            <span className='price-value'>{CurrencyFormat(59000)}</span>
                            <span className='label-text'>סה"כ תשלום</span>
                        </div>
                        <div className="alert-banner text-white w-100 text-white d-flex align-items-center justify-content-between p-2">
                            <div className=''>
                            <span className='banner-text'>עד 4 ימי עסקים לורם איפסון ליאוון איפסום</span>
                            </div>
                            <InfoOutlinedIcon />
                        </div>
                    </div>
                </div>
            </div>
            <div className="customer-service d-flex mt-4 justify-content-between">
                <p className='text-end text-white'>
                    דניאל אביב, נציג/ת המכירות שלך מקבל עדכונים על כל מה שנעשה כאן, כמובן שתוכל לפנות אליו בכל עת.
                </p>
                <SupportAgentOutlinedIcon className='support-icon' />
            </div>
            <div className='w-100 bg-dark'>
                <div className="total d-flex w-100 align-items-center justify-content-between p-2">
                    <h1>{CurrencyFormat(96000)}</h1>
                    <h1>יתרה לתשלום</h1>
                </div>
                <div className="method-section">
                    <button className='select-opt-btn'>
                        אפשרויות מימון
                    </button>
                    <button className='select-default-btn'>העברה בנקאית</button>
                </div>
            </div>
        </div>
    );
}

function TransferReport({formData, updateForm}) {
    return (
        <div className='transfer-docs'>
            <div className="top-container">
                <div className='d-flex flex-column'>
                    <h1 className='text-end'>
                        צירוף אישור תשלום
                    </h1>
                    <p className='text-white text-end'>
                        ניתן להעלות את המסמך העברה בנקאית שביצעת מול הבנק
                    </p>
                    <p className='text-white text-end'>
                        *כאן אפשר להעלות את אישור ההעברה הבנקאית. קובץ אחד בכל ההעלאה בבקשה.
                    </p>
                </div>
                <div className='w-100'>
                    <button className='upload-file w-100 d-flex align-items-center justify-content-end p-4'>
                        צרף מסמך
                        <UploadFileOutlinedIcon className='icon'/>
                    </button>
                </div>
            </div>
        </div>
    );
}

function Review({formData, updateForm}) {
    return(
        <div>
            <h1>qwert</h1>
        </div>
    );
}

const steps = ['תשלום', 'דיווח העברה', 'ביקורת'];

export default function CustomizedSteppers() {

    const [activeStep, setActiveStep] = useState(0);

    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: ''
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
        <div className="container-fluid w-100 min-vh-100 d-flex flex-column align-items-center justify-centent-between">
            <div className='top-bar w-100 text-white d-flex align-items-center justify-content-between p-3'>
                <CloseOutlinedIcon/>
                <h1>ביצוע תשלום</h1>
                <ArrowForwardOutlinedIcon />
            </div>
            <div className="top-container d-flex flex-column p-4">
                <Stack sx={{
                    width: '100%',
                    mb: 4
                }}>
                    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel slots={{ stepIcon: QontoStepIcon}}
                                    sx={{
                                        '& .MuiStepLabel-label': {color: '#8A8D91', fontSize: '15px' },
                                        '& .MuiStepLabel-label.Mui-active': {color: '#E65C00', fontWeight: 'bold' },
                                        '& .MuiStepLabel-label.Mui-completed': {color: '#FFFFF', fontSize: '15px' },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Stack>
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
