import "./App.css";
import { useState } from "react";
import InvoiceInput from "./components/InvoiceInput";
import AddItem from "./components/AddItem";
import InvoiceResult from "./components/InvoiceResult";
import RenderDocument from "./pdf-component/RenderDocument";
import { IoArrowBackOutline } from "react-icons/io5";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  viewer: { height: "100vh", border: "none", width: "100%" },
});

function App() {
  //state variables
  const [subTotal, setSubTotal] = useState(0);
  const [invoiceNo, setInvoiceNo] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [isChecked, setIsChecked] = useState({
    billFrom: true,
    billTo: true,
    logoURL: true,
  });

  //state variables to render into pdf
  // --------------------
  const [invoiceInputData, setInvoiceInputData] = useState([]);
  const [invoiceResultData, setInvoiceResultData] = useState([]);
  const [invoiceItemData, setInvoiceItemData] = useState([]);

  //checkInvoice handler which checks billFrom, billTo & logoURL
  // ------------------------
  const checkInvoice = () => {
    const { billFrom, billTo, logoURL } = invoiceInputData[0];
    const refObj = { billFrom, billTo, logoURL };
    const obj = {
      billFrom: true,
      billTo: true,
      logoURL: true,
    };

    for (let prop in refObj) {
      if (refObj[prop] === "" || refObj[prop] === "#") {
        obj[prop] = false;
      }
    }

    if (obj.billFrom && obj.billTo && obj.logoURL) {
      setIsClicked(true);
    }
    setIsChecked(obj);
  };

  ///reset invoice handler which resets localStorage and refresh the page
  // ----------------------
  const resetInvoice = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="invoice-container">
        {isClicked ? (
          <>
            <div className="back-container" onClick={() => setIsClicked(false)}>
              <IoArrowBackOutline className="back-btn" />
              Back
            </div>

            <PDFViewer style={styles.viewer}>
              <RenderDocument
                invoiceInputData={invoiceInputData}
                invoiceItemData={invoiceItemData}
                invoiceResultData={invoiceResultData}
              />
            </PDFViewer>
          </>
        ) : (
          <>
            <InvoiceInput
              setInvoiceInputData={setInvoiceInputData}
              isChecked={isChecked}
              invoiceNo={invoiceNo}
              setInvoiceNo={setInvoiceNo}
            />
            <AddItem
              setSubTotal={setSubTotal}
              setInvoiceItemData={setInvoiceItemData}
            />
            <InvoiceResult
              subTotal={subTotal}
              setInvoiceResultData={setInvoiceResultData}
            />

            <button onClick={checkInvoice} className="review-btn">
              Review PDF
            </button>
            <button onClick={resetInvoice} className="reset-btn">
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
