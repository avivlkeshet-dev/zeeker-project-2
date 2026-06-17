import "./Document.css";
import { useRef, useState } from 'react';
import menuIcon from "../../assets/Menu.png";
import fileIcon from "../../assets/Letter.png";

function Document({
  title = 'רישיון נהיגה',
  updatedAt = 'עודכן ב- 18/07/2021 ,MB 2.3',
  errorMessage = '',
  onDelete,
  onReplace,
  showMenu = true,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const replaceInputRef = useRef(null);

  const handleReplaceClick = () => {
    if (replaceInputRef.current) {
      replaceInputRef.current.click();
    }
  };

  const handleReplaceSelected = (event) => {
    const file = event.target.files?.[0];
    if (file && onReplace) {
      onReplace(file);
    }
    event.target.value = '';
    setIsMenuOpen(false);
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="container-fluid my-docs text-white border-bottom">
      <div className="d-flex justify-content-between align-items-center w-100 mt-3 position-relative document-row-shell">

         <div>
          <img className="file" src={fileIcon} alt="Document" />
        </div>       
        <div className="d-flex flex-column align-items-start justify-content-end document-row-text">
          <div className="d-flex flex-column align-items-end m-0">
            <h1 className="title m-0 fw-medium">{title}</h1>
          </div>
          <div>
            <p className="update d-flex justify-content-end m-0">
              {updatedAt}
            </p>
          </div>
        </div>
        {showMenu && (
        <div className="menuDiv mt-1">
          <input
            ref={replaceInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            style={{ display: 'none' }}
            onChange={handleReplaceSelected}
          />

          <button
            type="button"
            className="document-menu-button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="פתיחת תפריט מסמך"
          >
            <img className="menu" src={menuIcon} alt="Menu" />
          </button>

          {isMenuOpen && (
            <div className="document-menu-dropdown">
              <button
                type="button"
                className="document-menu-item"
                onClick={handleReplaceClick}
                disabled={!onReplace}
              >
                החלף קובץ
              </button>
              <button
                type="button"
                className="document-menu-item document-menu-item--danger"
                onClick={handleDeleteClick}
                disabled={!onDelete}
              >
                מחק קובץ
              </button>
            </div>
          )}
        </div>
        )}
      </div>

      {errorMessage && (
        <p className="document-item-error text-end mt-2 mb-0">{errorMessage}</p>
      )}
    </div>
  );
}

export default Document;
