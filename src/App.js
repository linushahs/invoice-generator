import "./App.css";
import { useState } from "react";
import InvoiceInput from "./components/InvoiceInput";
import AddItem from "./components/AddItem";
import InvoiceResult from "./components/InvoiceResult";
import RenderDocument from "./pdf-component/RenderDocument";
import { IoArrowBackOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { MdPreview } from "react-icons/md";
import { PDFViewer, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  viewer: { height: "100vh", border: "none", width: "100%" },
});

function App() {
  //state variables
  const [subTotal, setSubTotal] = useState(0);
  const [invoiceNo, setInvoiceNo] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [toDownload, setToDownload] = useState(false);
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
  const checkInvoice = (setTodo) => {
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
      setTodo(true);
    }
    setIsChecked(obj);
  };

  //two functions of reviewInvoice and download Invoice
  const reviewInvoice = () => checkInvoice(setIsClicked);
  const downloadInvoice = () => checkInvoice(setToDownload);
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

            <div className="btns">
              <button onClick={reviewInvoice} className="review-btn b1">
                <MdPreview className="short-icons" /> PDF
              </button>
              <button onClick={resetInvoice} className="reset-btn">
                Reset
              </button>
              {toDownload ? (
                <PDFDownloadLink
                  document={
                    <RenderDocument
                      invoiceInputData={invoiceInputData}
                      invoiceItemData={invoiceItemData}
                      invoiceResultData={invoiceResultData}
                    />
                  }
                  fileName="invoice.pdf"
                  style={{ margin: ".5rem" }}
                >
                  Download now
                </PDFDownloadLink>
              ) : (
                <button
                  onClick={downloadInvoice}
                  className="review-btn"
                  style={{ marginLeft: ".5rem" }}
                >
                  <FiDownload /> PDF
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
