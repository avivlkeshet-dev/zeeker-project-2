import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import xIcon from '../../assets/X.png';
import backIcon from '../../assets/Back.png';
import './PaymentHeader.css';

function PaymentHeader({ title, stepIndex }) {
  const navigate = useNavigate();
  const canGoBack = stepIndex > 0;

  const handleBackClick = () => {
    if (canGoBack) {
      navigate(-1);
    }
  };

  return (
    <div className="master-header">
      <div className="payment-header__inner d-flex align-items-center justify-content-between px-2 py-2">
        <img
          className="back"
          src={backIcon}
          alt="חזרה"
          onClick={handleBackClick}
          style={{ opacity: canGoBack ? 1 : 0.5, cursor: canGoBack ? 'pointer' : 'default' }}
        />
        <span className="master-header-title">{title}</span>
        <img className="cross" src={xIcon} alt="סגור" />
      </div>
    </div>
  );
}

PaymentHeader.propTypes = {
  title: PropTypes.string,
  stepIndex: PropTypes.number,
};

PaymentHeader.defaultProps = {
  title: 'ביצוע תשלום',
  stepIndex: 0,
};

export default PaymentHeader;