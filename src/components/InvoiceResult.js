import "./InvoiceResult.css";
import { useState, useEffect } from "react";

function InvoiceResult({ subTotal, setInvoiceResultData }) {
  //state variables:
  //1. discount
  // 2. tax
  // 3. total
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState("");

  //state variables :
  // 1. discountedAmt
  // 2. taxedAmt
  const [discountedAmt, setDiscountedAmt] = useState(0);
  const [taxedAmt, setTaxedAmt] = useState(0);
  const [amtPaid, setAmtPaid] = useState(0);
  const [blcDue, setBlcDue] = useState(0);

  //handleChange function
  const handleChange = (e, setChange) => {
    setChange(e.target.value);
  };

  //calcDiscount && calcTax function
  // -------------
  const calcDiscount = () => {
    let taxAmt = subTotal + (tax / 100) * subTotal;
    let discAmt = taxAmt - (discount / 100) * taxAmt;
    if (discAmt < 0) {
      setTotal(subTotal);
    } else {
      discAmt = discAmt.toFixed(2);
      setTotal(discAmt);
    }
  };

  const calcTax = () => {
    let discAmt = subTotal - (discount / 100) * subTotal;
    let taxAmt = discAmt + (tax / 100) * discAmt;
    if (taxAmt < 0) {
      setTotal(subTotal);
    } else {
      taxAmt = taxAmt.toFixed(2);
      setTotal(taxAmt);
    }
  };

  //when discount and tax changes, ui rerenders
  // ----------------------------------
  useEffect(() => {
    calcDiscount();
  }, [discount]);

  useEffect(() => {
    calcTax();
  }, [tax]);

  //getting invoice result from localStorage
  // -----------------------------------
  useEffect(() => {
    calcDiscount();
  }, [subTotal]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem("invoiceResult"));
    if (res) {
      const { discount, tax, notes, amtPaid } = res;
      setDiscount(discount);
      setTax(tax);
      setNotes(notes);
      setAmtPaid(amtPaid);
    }
  }, []);

  //setInvoiceResultData when discount, tax, subTotal changes
  // --------------------------------
  useEffect(() => {
    let res = {
      discount: discount,
      tax: tax,
      subTotal: subTotal,
      total: total,
      notes: notes,
      amtPaid: amtPaid,
      blcDue: blcDue,
    };
    setInvoiceResultData([res]);

    localStorage.setItem("invoiceResult", JSON.stringify(res));
  }, [discount, tax, notes, subTotal, amtPaid, blcDue]);

  //when amtPaid changes, ui rerenders
  // ------------------------------
  useEffect(() => {
    setBlcDue((total - amtPaid).toFixed(2));
  }, [amtPaid]);

  useEffect(() => {
    setAmtPaid(total);
  }, [total]);

  return (
    <div className="invoice-result">
      <div className="left">
        <textarea
          name="descripition"
          id="description-box"
          cols="30"
          rows="4"
          placeholder="Terms & conditions of company"
          value={notes}
          onChange={(e) => handleChange(e, setNotes)}
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div className="right">
        <div className="subtotal">
          <p className="tag">Subtotal</p>
          <span className="value">Rs.{subTotal}</span>
        </div>
        <div className="discount">
          <p>Discount</p>
          <div>
            <input
              type="text"
              value={discount}
              onChange={(e) => handleChange(e, setDiscount)}
            />
            <span>%</span>
          </div>
        </div>
        <div className="tax">
          <p>Tax</p>
          <div>
            <input
              type="text"
              value={tax}
              onChange={(e) => handleChange(e, setTax)}
            />
            <span>%</span>
          </div>
        </div>
        <div className="total">
          <p className="tag">Total</p>
          <span>Rs.{total}</span>
        </div>
        <div className="amtpaid">
          <p>Amount Paid</p>
          <div>
            <span>Rs.</span>
            <input
              type="text"
              value={amtPaid}
              onChange={(e) => handleChange(e, setAmtPaid)}
            />
          </div>
        </div>
        <div className="blndue">
          <p className="tag">Balance Due</p>
          <span>Rs.{blcDue}</span>
        </div>
      </div>
    </div>
  );
}

export default InvoiceResult;
