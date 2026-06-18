import './CarCard.css';

function CarCard({ model, plate, children }) {
    return (
        <div className="db-card-wrap px-3">
            <div className="db-car-card d-flex flex-column align-items-center">
                <div className="db-car-card__img-wrap">
                    <img src="../src/assets/car.png" alt={model} className="db-car-card__img" />
                </div>
                <h2 className="db-car-card__name">{model}</h2>
                {plate && <p className="db-car-card__plate">מס' רכב {plate}</p>}
                {children}
            </div>
        </div>
    );
}

export default CarCard;
