import './Message.css'

function Messages() {
    return(
        <div className="container-fluid d-flex flex-column justify-content-center">
        <div className='d-flex align-items-center justify-content-between m-3'>
        <p></p>
        <h2 className='title text-white'>ההודעות שלי</h2>
        <img className='back' src="../src/assets/Back.png" />
      </div>
      <div className='Frontpage-image'>
        <img src="../src/assets/Frontpage.png" alt="" />
      </div>
      <div className='bubble d-flex flex-column align-items-center'>
                <h1 className='ProcessTitle text-white mt-3'>השלמת תהליך המימון</h1>
                <p className='ContinueProcess mt-2 me-3 ms-3'>יש לסיים את התהליך עד לתאריך 30/07/23. עברנו שלב בתהליך המימון והשמחה רבה. מה שנשאר הוא להיכנס ולהשלים את התהליך.</p>
        </div>
        <div>
            <button className="FinishProcessButton" onClick={() => window.location.href = "/"}>
                לסיום תהליך המימון
            </button>
        </div>
        
      </div>
    )
}

export default Messages;