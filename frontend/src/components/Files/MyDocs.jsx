import "./MyDocs.css";
import { useRef } from 'react';

function MyDocs({ numOfFiles = 0, onUploadFile }) {
  const fileInputRef = useRef(null);

  const handleOrangePlusClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelected = (event) => {
    const file = event.target.files?.[0];
    if (file && onUploadFile) {
      onUploadFile(file);
    }

    event.target.value = '';
  };

  return (
      <div className="bg-dark text-white files-section-header w-100 position-relative mt-4">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />

        <div className="files-section-content">
          <div className="files-section-top m-0">
            <h1 className="my-docs m-0 fw-medium">המסמכים שלי</h1>
            <h1 className="Separator">|</h1>
            <p className="NumOfFiles m-0">סה"כ {numOfFiles} מסמכים</p>
          </div>
          <p className="MB files-section-note m-0">אפשר להעלות עד 10 קבצים בגודל של עד 2MB</p>
        </div>
        <div className="files-section-accent" onClick={handleOrangePlusClick} role="button" tabIndex={0} onKeyDown={(event) => event.key === 'Enter' && handleOrangePlusClick()}>
          <img className="OrangePlus" src="../src/assets/Orange.png" alt="Upload document" />
        </div>        
      </div>
  );
}

export default MyDocs;
