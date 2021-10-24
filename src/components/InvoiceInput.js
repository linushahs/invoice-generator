import "./InvoiceInput.css";
import { useState, useEffect } from "react";

function InvoiceInput({
  setInvoiceInputData,
  isChecked,
  invoiceNo,
  setInvoiceNo,
}) {
  const dateStr = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
  //state variables
  // 1. bill From
  // 2. bill to
  // 3. invoice No
  // 4. date
  // 5. due date
  // 6. logo
  const [logoURL, setLogoURL] = useState("#");
  const [billFrom, setBillFrom] = useState("");
  const [billTo, setBillTo] = useState("");
  const [dt, setDt] = useState(dateStr);
  const [dueDate, setDueDate] = useState(dateStr);

  //HandleChange function
  const handleChange = (e, setChange) => {
    setChange(e.target.value);
  };

  //Used fileReader Web API (used to read content of files selected by user)
  //HandleLogo function handles these things.
  const handleLogo = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (elem) => {
        setLogoURL(elem.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    const responseObj = JSON.parse(localStorage.getItem("invoiceInput"));
    if (responseObj === null) {
      return;
    } else {
      const { billFrom, billTo, invoiceNo, dt, dueDate, logoURL } = responseObj;

      setLogoURL(logoURL);
      setBillFrom(billFrom);
      setBillTo(billTo);
      setInvoiceNo(invoiceNo);
      setDt(dt);
      setDueDate(dueDate);
    }
  }, []);

  //when any of the state changes addInvoiceInputData is called
  useEffect(() => {
    const obj = {
      billFrom: billFrom,
      billTo: billTo,
      invoiceNo: invoiceNo,
      dt: dt,
      dueDate: dueDate,
      logoURL: logoURL,
    };

    localStorage.setItem("invoiceInput", JSON.stringify(obj));
    setInvoiceInputData([obj]);
  }, [billFrom, billTo, invoiceNo, dt, dueDate, logoURL]);

  return (
    //Invoice Input container goes here ->
    <div className="container">
      {/* Header section container  */}
      <div className="header">
        <label
          className="add-label"
          htmlFor="add-photo"
          style={
            isChecked.logoURL
              ? { border: "1.5px solid rgb(204, 204, 204)" }
              : { border: "1.6px solid red" }
          }
        >
          <img src={logoURL} alt="+Add Logo" className="logo" />
        </label>
        <input type="file" name="photo" id="add-photo" onChange={handleLogo} />

        <div className="right">
          <h1>Invoice</h1>
          <button># </button>
          <input
            type="text"
            value={invoiceNo}
            onChange={(e) => handleChange(e, setInvoiceNo)}
          />
        </div>
      </div>
      <div className="main">
        {/* Main section left container  */}
        <div className="left">
          <h4>Bill From</h4>
          <input
            type="text"
            onChange={(e) => handleChange(e, setBillFrom)}
            value={billFrom}
            placeholder="Who is this invoice from?"
            style={
              isChecked.billFrom
                ? { border: "1.5px solid rgb(204, 204, 204)" }
                : { border: "1.6px solid red" }
            }
          />
          <span className="warn-text">
            {isChecked.billFrom ? "" : "required!"}{" "}
          </span>

          <h4>Bill To</h4>
          <input
            type="text"
            value={billTo}
            onChange={(e) => handleChange(e, setBillTo)}
            placeholder="Who is this invoice to?"
            style={
              isChecked.billTo
                ? { border: "1.5px solid rgb(204, 204, 204)" }
                : { border: "1.6px solid red" }
            }
          />
          <span className="warn-text t2">
            {isChecked.billTo ? "" : "required!"}
          </span>
        </div>

        {/*  Main section: Right container  */}
        <div className="right date-section">
          <div>
            <label htmlFor="date-input">Date:</label>
            <input
              type="date"
              className="date-input"
              value={dt}
              onChange={(e) => handleChange(e, setDt)}
              min="2021-01-01"
              max="2022-12-31"
            />
          </div>

          <br />
          <div>
            <label htmlFor="due-input">Due Date:</label>
            <input
              type="date"
              className="due-input"
              value={dueDate}
              onChange={(e) => handleChange(e, setDueDate)}
              min="2021-01-01"
              max="2022-12-31"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceInput;
