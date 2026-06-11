import "./MyDocs.css";
import orangeShape from "../../assets/Orange.png";

function MyDocs() {
  return (
      <div className="bg-dark text-white d-flex justify-content-end w-100 position-relative mt-4">
        <div>
          <img className="OrangePlus me-4 mt-4" src="../src/assets/Orange.png" />
        </div>
        <div className="d-flex flex-column align-items-end justify-content-end me-3">
          <div className="d-flex align-items-center m-0">
            <p className="NumOfFiles m-0 me-2">סה"כ 3 מסמכים</p>
            <h1 className="Separator">|</h1>
            <h1 className="my-docs m-0 ms-2 fw-medium">המסמכים שלי</h1>
          </div>
          <div>
            <p className="MB d-flex justify-content-end">
              2MB אפשר להעלות עד 10 קבצים בגודל של עד
            </p>
          </div>
        </div>
      </div>
  );
}

export default MyDocs;
