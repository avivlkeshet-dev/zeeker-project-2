import "./RepairPage.css";
import { useRef } from "react";
import { useEffect } from "react";

// TODO: replace with API call — load from /api/car/:id/repairs
const repairHistory = [
  {
    id: 1,
    date: '08/08/2021',
    isLast: true,
    description: 'הילוך שישי מרכז',
    garage: 'בכור כהן מוטורס ההגנה 18, אור יהודה',
    odometer: '58,123',
    circleIcon: 'ElipseEmpty',
  },
  {
    id: 2,
    date: '06/01/2021',
    isLast: false,
    description: 'הילוך שישי מרכז',
    garage: 'בכור כהן מוטורס ההגנה 18, אור יהודה',
    odometer: '58,123',
    serviceType: 'טיפול 30,000',
    circleIcon: 'ElipseGray',
  },
  {
    id: 3,
    date: '01/08/2020',
    isLast: false,
    description: 'הילוך שישי מרכז',
    garage: 'בכור כהן מוטורס ההגנה 18, אור יהודה',
    odometer: '58,123',
    serviceType: 'טיפול 30,000',
    circleIcon: 'ElipseGray',
  },
];

function Repair() {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event) => {
      if (event.deltaY === 0) return;

      event.preventDefault();

      container.scrollLeft += event.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return (
    <div className="container-fluid repair-page d-flex flex-column p-0 text-white">
      <div className="TitleContainer">
        <div className="d-flex align-items-center justify-content-between">
          <p className="ms-2"></p>
          <h2 className="RepairTitle text-white mt-3">ZEEKR X</h2>
          <img className="back me-2" src="../src/assets/Back.png" />
        </div>
        <div className="d-flex justify-content-center">
          <p>מס' רכב 62-855-10</p>
        </div>
      </div>
      <div ref={containerRef} className="scroll-container">
        <div className="scroll-item">היסטוריית טיפולים</div>
        <div className="scroll-item gray-out">סוכנות</div>
        <div className="scroll-item gray-out">דאשבורד</div>
        <div className="scroll-item gray-out">סוללה</div>
        <div className="scroll-item gray-out">ביוב</div>
      </div>
      <div className="repair-page__content">
        <div className="d-flex flex-column w-100">
          {repairHistory.map((item, index) => (
            <div key={item.id} className="repair-timeline-item d-flex">
              <div className="repair-timeline-side">
                <img className="repair-timeline-circle" src={`../src/assets/${item.circleIcon}.png`} alt="" />
                {index < repairHistory.length - 1 && <div className="repair-timeline-connector"></div>}
              </div>
              <div className="repairtextbubble d-flex flex-column align-items-start ms-2">
                <div className="repairFirstTitle d-flex align-items-center justify-content-between">
                  <h1 className="RepairBubbleTitle text-white mt-3 me-3">{item.date}</h1>
                  {item.isLast && (
                    <div className="lastTreatment">
                      <img className="SmallElipse" src="../src/assets/SmallElipse.png" alt="" />
                      <p className="mt-3 ms-2">הטיפול האחרון</p>
                    </div>
                  )}
                </div>
                <img className="smallLine mt-1 me-3" src="./src/assets/smallLine.png" alt="" />
                <p className="BubbleTextTitle mt-3 me-3">{item.description}</p>
                <p className="BubbleText me-3">{item.garage}</p>
                <div className={`d-flex ${item.isLast ? 'mb-2' : ''}`}>
                  <img className="KMicon me-3 mt-1" src="../src/assets/KMicon.png" alt="" />
                  <p>{item.odometer}</p>
                  <p>ק"מ</p>
                </div>
                {item.serviceType && (
                  <div className="RepairTextboxInfo me-4 mb-3">
                    <p>{item.serviceType}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button className="SendToMail mb-4">
          <img className="ms-2" src="./src/assets/Mail.png" alt="" />
          שליחה למייל
        </button>
      </div>
    </div>
  );
}

export default Repair;
