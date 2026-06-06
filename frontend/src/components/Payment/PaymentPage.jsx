import './PaymentPage.css'

function PaymentPage() {
    return (
        <div className="container-fluid payment-page d-flex flex-column position-relative">
            <div className="d-flex text-white justify-content-between">
            <div className='cross m-3'>
        <img src="../src/assets/X.png" />
      </div>
      <div>
        <h2 className='m-4 carName'>ביצוע תשלום</h2>
      </div>
      <div className='back m-3'>
        <img src="../src/assets/Back.png" />
      </div>
        </div>
        <div className="mt-2 text-center">
            <img src="../src/assets/3.png" alt="" />
        </div>
        <div className='mt-5 text-white text-center'>
            <h2 className='requestText'>מעקב אחרי בקשת המימון</h2>
        </div>
        <div className='d-flex'>
            <div className='d-flex flex-column textbox d-flex mt-3'>
            <div className='textbubble d-flex flex-column align-items-start me-2'>
                <h1 className='BubbleTitle text-white mt-3 me-3'>פניה לסוכן</h1>
                <img className='smallLine mt-3 me-3' src="./src/assets/smallLine.png" alt="" />
                <p className='BubbleText mt-3 me-3'>העברנו את הבקשה לנציג/ת המכירות. בקרוב נעדכן אותך לגבי התקדמות הטיפול</p>
            </div>
                <div className='textbubble d-flex flex-column align-items-start me-2 mt-3'>
                <h1 className='BubbleTitle text-white mt-3 me-3'>הגשת בקשה</h1>
                <img className='smallLine mt-3 me-3' src="./src/assets/smallLine.png" alt="" />
                <p className='BubbleText mt-3 me-3'>בקשתך התקבלה והיא בטיפול סוכנ/ת המכירות</p>
            </div>
                <div className='textbubble d-flex flex-column align-items-start me-2 mt-3'>
                <h1 className='BubbleTitle text-white mt-3 me-3'>החתמת מסמכים</h1>
                <img className='smallLine mt-3 me-3' src="./src/assets/smallLine.png" alt="" />
                <p className='BubbleText mt-3 me-3'>לאחר הורכת המסמך, נבקש להחתים אותו בבנק או אצל הגוף המממן. בבקשה לשים לב שכל הפרטים נכונים</p>
                <button className='downloadButton mb-4'><img className='ms-2' src="./src/assets/Download.png" alt="" />מסמך להורדה</button>
            </div>
                <div className='textbubble d-flex flex-column align-items-start me-2 mt-3'>
                <h1 className='BubbleTitle text-white mt-3 me-3'>פניה לסוכן</h1>
                <img className='smallLine mt-3 me-3' src="./src/assets/smallLine.png" alt="" />
                <p className='BubbleText mt-3 me-3'>העברנו את הבקשה לנציג/ת המכירות. בקרוב נעדכן אותך לגבי התקדמות הטיפול</p>
                <button className='uploadButton mb-4'><img className='ms-2' src="./src/assets/Upload.png" alt="" />מסמך אישור מימון</button>
            </div>
            </div>
            <div>
        <div>
            <img src="../src/assets/ElipseEmpty.png" />
        </div>
        <div>
            <div className="Line-1 ms-2"></div>
        </div>
        <div className='bottom-elipse'>
            <img className='mb-2' src="../src/assets/ElipseEmpty.png" />
        </div>
        <div>
            <div className="Line-2 ms-2"></div>
        </div>
        <div className='bottom-elipse'>
            <img className='mb-2' src="../src/assets/ElipseEmpty.png" />
        </div>
        <div>
            <div className="Line-3 ms-2"></div>
        </div>
        <div>
            <img className='mb-2' src="../src/assets/ElipseFull.png" />
        </div>
        </div>
        </div>
        <button className='finishButton mb-5 mt-3'>סיום תהליך</button>
        </div>
    )
}
export default PaymentPage;