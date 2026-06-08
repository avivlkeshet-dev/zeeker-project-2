import "./checkmark.css";
import { useState } from "react";

function CustomCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="custom-checkbox">
      <p>אישור <a className='text-white' href="/terms" target="_blank" rel="noopener noreferrer">תנאי השימוש</a> באפליקציה</p>
      <button
      onClick={() => setChecked(!checked)}
      style={{
        width: "30px",
        height: "30px",
        border: "1px solid white",
        borderRadius: "8px",
      }}
    >
      {checked && (
        <img
          src="../src/assets/Checkbox.png"
          alt="Checked"
          style={{ width: "50%", height: "40%" }}
        />
      )}</button>
    </div>
  );
}

export default CustomCheckbox;
