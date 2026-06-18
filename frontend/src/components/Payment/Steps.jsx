import PropTypes from 'prop-types';
import checkmarkIcon from '../../assets/checkmark.png';

const defaultSteps = ['תשלום', 'דיווח העברה', 'סיום תהליך'];

function Steps({ activeStep, steps, className, showCompleted }) {
  const safeSteps = Array.isArray(steps) && steps.length > 0 ? steps : defaultSteps;

  return (
    <div className={`payment-tab-row ${className}`.trim()}>
      {safeSteps.map((label, index) => {
        const isActive = activeStep === index;
        const isCompleted = showCompleted && index < activeStep;

        return (
          <span
            key={label}
            className={`payment-tab${isActive ? ' payment-tab--active' : ''}${isCompleted ? ' payment-tab--completed' : ''}${!isActive && !isCompleted ? ' payment-tab--inactive' : ''}`}
          >
            {isActive ? label : ''}
            {isCompleted ? (
              <img
                src={checkmarkIcon}
                alt="שלב הושלם"
                className="transfer-details-step-icon"
              />
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

Steps.propTypes = {
  activeStep: PropTypes.number,
  steps: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  showCompleted: PropTypes.bool,
};

Steps.defaultProps = {
  activeStep: 0,
  steps: defaultSteps,
  className: '',
  showCompleted: true,
};

export default Steps;
export { defaultSteps };
