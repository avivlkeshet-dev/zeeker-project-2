import "./Document.css";
import menuIcon from "../../assets/Menu.png";
import fileIcon from "../../assets/Letter.png";

function Document() {
  return (
    <div className="container-fluid my-docs text-white border-bottom">
      <div className="d-flex justify-content-end w-100 mt-3 position-relative">
        <div className="menuDiv position-absolute mt-1">
        <img className="menu" src={menuIcon} alt="Menu" />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-end me-3">
          <div className="d-flex flex-column align-items-center m-0">
            <h1 className="title m-0 ms-5 fw-medium">רישיון נהיגה</h1>
          </div>
          <div>
            <p className="update d-flex justify-content-end me-3">
              2MB ,עודכן ב- 18/7/2021
            </p>
          </div>
        </div>
        <div>
                <img className="file mt-2 me-3" src={fileIcon} alt="Document" />
                </div>
      </div>
    </div>
  );
}

export default Document;
