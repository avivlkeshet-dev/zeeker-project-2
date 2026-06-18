function OrderTitle({ numOfFiles = 0 }) {
  return (
    <div className="bg-dark text-white files-section-header w-100 position-relative mt-4" style={{ borderTop: '1px solid #2b2c2e' }}>
        <div className="files-section-content">
          <div className="files-section-top m-0">
            <h1 className="my-docs m-0 fw-medium">מסמכים של הזמנת רכב</h1>
            <h1 className="Separator">|</h1>
            <p className="NumOfFiles m-0">סה"כ {numOfFiles} מסמכים</p>
          </div>
          <p className="MB files-section-note m-0">מסמכים אלה אינם ניתנים למחיקה</p>
        </div>
      </div>
  );
}

export default OrderTitle;
