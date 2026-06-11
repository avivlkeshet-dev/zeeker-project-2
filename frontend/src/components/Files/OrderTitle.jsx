function OrderTitle() {
  return (
    <div className="bg-dark text-white d-flex justify-content-end w-100 position-relative mt-4">
        <div className="d-flex flex-column align-items-end justify-content-end me-3">
          <div className="d-flex align-items-center m-0">
            <p className="NumOfFiles m-0 me-2">סה"כ 2 מסמכים</p>
            <h1 className="Separator">|</h1>
            <h1 className="my-docs m-0 ms-2 fw-medium">מסמכים של הזמנת רכב</h1>
          </div>
          <div>
            <p className="MB d-flex justify-content-end">
              מסמכים אלה אינם ניתנים למחיקה
            </p>
          </div>
        </div>
      </div>
  );
}

export default OrderTitle;
