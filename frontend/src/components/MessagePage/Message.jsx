import './Message.css'

function Messages() {
    return(
        <div className="message-page">
          <div className=" d-flex flex-column justify-content-center">
        <div className='message-title d-flex align-items-center justify-content-between bg-dark'>
        <p></p>
        <h2 className='title text-white'>ההודעות שלי</h2>
        <img className='back me-3' src="../src/assets/Back.png" />
      </div>
      <div className='Frontpage-image d-flex justify-content-center'>
        <img src="../src/assets/Frontpage.png" alt="" />
      </div>
      <div className='bubble d-flex flex-column align-items-center'>
                <h1 className='ProcessTitle text-white mt-3'>השלמת תהליך המימון</h1>
                <p className='ContinueProcess mt-2 me-3 ms-3 text-white'>יש לסיים את התהליך עד לתאריך 30/07/23. עברנו שלב בתהליך המימון והשמחה רבה. מה שנשאר הוא להיכנס ולהשלים את התהליך.</p>
        </div>
        <div>
            <button className="FinishProcessButton" onClick={() => window.location.href = "/"}>
                לסיום תהליך המימון
            </button>
        </div>
        
      </div>
      </div>
    )
}

export default Messages;