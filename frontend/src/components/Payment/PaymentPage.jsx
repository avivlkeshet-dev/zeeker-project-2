import './PaymentPage.css'

function PaymentPage() {
    return (
        <div className="container-fluid payment-page d-flex flex-column position-relative">
        <div className="TitleContainer">
            <div className="d-flex align-items-center justify-content-between">
                <img className="cross ms-2" src="../src/assets/X.png" />
                <h2 className="carName text-white mt-3">ביצוע תשלום</h2>
                <img className="back me-2" src="../src/assets/Back.png" />
            </div>
        </div>
        <div className="payment-page__progress">
            <img src="../src/assets/3.png" alt="Step 3 of 3" />
        </div>
        <div className='payment-page__subtitle text-white text-center'>
            <h2 className='requestText'>מעקב אחרי בקשת המימון</h2>
        </div>
        <div className='payment-page__timeline-container'>
            <div className="d-flex flex-column w-100">
                <div className='timeline-item d-flex'>
                    <div className='timeline-side'>
                        <img className='timeline-circle' src="../src/assets/ElipseEmpty.png" alt="" />
                        <div className="timeline-connector"></div>
                    </div>
                    <div className='textbubble d-flex flex-column align-items-start ms-2'>
                        <h1 className='BubbleTitle text-white mt-3 ms-3'>פניה לסוכן</h1>
                        <img className='smallLine mt-3 ms-3' src="./src/assets/smallLine.png" alt="" />
                        <p className='BubbleText mt-3 ms-3'>העברנו את הבקשה לנציג/ת המכירות. בקרוב נעדכן אותך לגבי התקדמות הטיפול</p>
                    </div>
                </div>
                <div className='timeline-item d-flex'>
                    <div className='timeline-side'>
                        <img className='timeline-circle' src="../src/assets/ElipseEmpty.png" alt="" />
                        <div className="timeline-connector"></div>
                    </div>
                    <div className='textbubble d-flex flex-column align-items-start ms-2'>
                        <h1 className='BubbleTitle text-white mt-3 ms-3'>הגשת בקשה</h1>
                        <img className='smallLine mt-3 ms-3' src="./src/assets/smallLine.png" alt="" />
                        <p className='BubbleText mt-3 ms-3'>בקשתך התקבלה והיא בטיפול סוכנ/ת המכירות</p>
                    </div>
                </div>
                <div className='timeline-item d-flex'>
                    <div className='timeline-side'>
                        <img className='timeline-circle' src="../src/assets/ElipseEmpty.png" alt="" />
                        <div className="timeline-connector"></div>
                    </div>
                    <div className='textbubble d-flex flex-column align-items-start ms-2'>
                        <h1 className='BubbleTitle text-white mt-3 ms-3'>החתמת מסמכים</h1>
                        <img className='smallLine mt-3 ms-3' src="./src/assets/smallLine.png" alt="" />
                        <p className='BubbleText mt-3 ms-3'>לאחר הורכת המסמך, נבקש להחתים אותו בבנק או אצל הגוף המממן. בבקשה לשים לב שכל הפרטים נכונים</p>
                        <button className='downloadButton mb-4'><img className='ms-2' src="./src/assets/Download.png" alt="" />מסמך להורדה</button>
                    </div>
                </div>
                <div className='timeline-item d-flex'>
                    <div className='timeline-side'>
                        <img className='timeline-circle' src="../src/assets/ElipseFull.png" alt="" />
                    </div>
                    <div className='textbubble d-flex flex-column align-items-start ms-2'>
                        <h1 className='BubbleTitle text-white mt-3 ms-3'>העלאת המסמך</h1>
                        <img className='smallLine mt-3 ms-3' src="./src/assets/smallLine.png" alt="" />
                        <p className='BubbleText mt-3 ms-3'>העברנו את הבקשה לנציג/ת המכירות. בקרוב נעדכן אותך לגבי התקדמות הטיפול</p>
                        <form className='payment-page__form' action="/upload-destination" method="POST" enctype="multipart/form-data">
                            <label htmlFor="file-upload" className='uploadLabel mb-4'><img className='ms-2' src="./src/assets/Upload.png" alt="" />מסמך אישור מימון</label>
                            <input type='file' id='file-upload'></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className='text-center'>
            <button className='finishButton'>סיום תהליך</button>
        </div>
        </div>
    )
}
export default PaymentPage;