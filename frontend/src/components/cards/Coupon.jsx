import './css/Coupon.css';

function CouponCard({ id, title, discount, condition, isActive }) {
    return (
        <div className={`coupon-card-container ${isActive ? 'active-theme' : ''}`}>
            
            <div className="coupon-right-panel d-flex flex-column justify-content-center text-end px-3">
                <ul className="coupon-details-list m-0 p-0 list-unstyled">
                    <li className="coupon-bullet-item">{title}</li>
                    <li className="coupon-bullet-item">{discount}</li>
                </ul>
                <p className="coupon-condition-text mt-2 mb-0">
                    {condition}
                </p>
            </div>

            <div className="coupon-divider-line"></div>

            <div className="coupon-left-panel d-flex align-items-center justify-content-center">
                <span className="coupon-serial-text">{id}</span>
            </div>
        </div>
    );
}
export default CouponCard;