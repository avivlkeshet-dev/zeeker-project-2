import "./RepairPage.css";
import { useRef } from "react";
import { useEffect } from "react";

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
    <div className="container-fluid payment-page d-flex flex-column position-relative p-0">
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
      <div ref={containerRef} class="scroll-container d-flex">
        <div class="scroll-item gray-out">סוכנות</div>
        <div class="scroll-item">היסטוריית טיפולים</div>
        <div class="scroll-item gray-out">דאשבורד</div>
        <div class="scroll-item gray-out">סוללה</div>
        <div class="scroll-item gray-out">ביוב</div>
      </div>
      <div className="d-flex w-100">
        <div className="d-flex flex-column repairtextbox d-flex mt-3">
          <div className="repairtextbubble d-flex flex-column align-items-start me-2">
            <div className="repairFirstTitle d-flex align-items-center justify-content-between">
              <h1 className="RepairBubbleTitle text-white mt-3 me-3">
                08/08/2021
              </h1>
              <div className="lastTreatment">
                <img
                  className="SmallElipse"
                  src="../src/assets/SmallElipse.png"
                  alt=""
                />
                <p className="mt-3 ms-2">הטיפול האחרון</p>
              </div>
            </div>
            <img
              className="smallLine mt-1 me-3"
              src="./src/assets/smallLine.png"
              alt=""
            />
            <p className="BubbleTextTitle mt-3 me-3">הילוך שישי מרכז</p>
            <p className="BubbleText me-3">
              בכור כהן מוטורס ההגנה 18, אור יהודה
            </p>
            <div className="d-flex">
              <img
                className="KMicon me-3 mt-1"
                src="../src/assets/KMicon.png"
                alt=""
              />
              <p>58,123</p>
              <p>ק"מ</p>
            </div>
          </div>
          <div className="repairtextbubble d-flex flex-column align-items-start me-2 mt-3">
            <h1 className="RepairBubbleTitle text-white mt-3 me-3">
              06/01/2021
            </h1>
            <img
              className="smallLine mt-1 me-3"
              src="./src/assets/smallLine.png"
              alt=""
            />
            <p className="BubbleTextTitle mt-3 me-3">הילוך שישי מרכז</p>
            <p className="BubbleText me-3">
              בכור כהן מוטורס ההגנה 18, אור יהודה
            </p>

            <div className="d-flex">
              <img
                className="KMicon me-3 mt-1"
                src="../src/assets/KMicon.png"
                alt=""
              />
              <p>58,123</p>
              <p>ק"מ</p>
            </div>
                        <div className="RepairTextboxInfo me-4 mb-3">
              <p>טיפול 30,000</p>
            </div>
          </div>
          <div className="repairtextbubble d-flex flex-column align-items-start me-2 mt-3">
            <h1 className="RepairBubbleTitle text-white mt-3 me-3">
              01/08/2020
            </h1>
            <img
              className="smallLine mt-1 me-3"
              src="./src/assets/smallLine.png"
              alt=""
            />
            <p className="BubbleTextTitle mt-3 me-3">הילוך שישי מרכז</p>
            <p className="BubbleText me-3">
              בכור כהן מוטורס ההגנה 18, אור יהודה
            </p>
            <div className="d-flex">
              <img
                className="KMicon me-3 mt-1"
                src="../src/assets/KMicon.png"
                alt=""
              />
              <p>58,123</p>
              <p>ק"מ</p>
            </div>
            <div className="RepairTextboxInfo me-4 mb-3">
              <p>טיפול 30,000</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src="../src/assets/ElipseEmpty.png" />
          </div>
          <div>
            <div className="Line-1-repair ms-2"></div>
          </div>
          <div className="bottom-elipse">
            <img className="mb-2" src="../src/assets/ElipseGray.png" />
          </div>
          <div>
            <div className="Line-2-repair ms-2"></div>
          </div>
          <div className="bottom-elipse">
            <img className="mb-2" src="../src/assets/ElipseGray.png" />
          </div>
        </div>
      </div>
      <div className="MailButtonDiv d-flex justify-content-center position-absolute">
        <button className="SendToMail mb-4">
          <img className="ms-2" src="./src/assets/Mail.png" alt="" />
          שליחה למייל
        </button>
      </div>
    </div>
  );
}

export default Repair;
