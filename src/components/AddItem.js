import "./AddItem.css";
import { useState, useEffect, useRef } from "react";
import Item from "./sub-components/Item";

function AddItem({ setSubTotal, setInvoiceItemData }) {
  //state variables
  // 1. item description
  // 2. quantity
  // 3. rate
  // 4. amount
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(0);
  const [amt, setAmt] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [totalAmt, setTotalAmt] = useState(0);

  //Reference variable
  const inputEl = useRef(null);

  //focus the description section on clicking edit button
  const editItem = (id, item) => {
    inputEl.current.focus();
    const { title, qty, rate } = item;
    setTitle(title);
    setQty(qty);
    setRate(rate);

    setItems(items.filter((item, i) => i !== id));
    setTotalAmt(totalAmt - item.amt);
  };

  //Delete item
  const deleteItem = (id, item) => {
    setItems(items.filter((item, i) => i !== id));
    setTotalAmt(totalAmt - item.amt);
  };

  //handle Change function :
  const handleChange = (e, setChange) => {
    setChange(e.target.value);
  };

  //localstorage: getting item from storage
  // (--Initial Rendering--)
  useEffect(() => {
    const responseObj = JSON.parse(localStorage.getItem("invoiceItem"));
    const total = Number(localStorage.getItem("subTotal"));
    if (responseObj && total) {
      setIsClicked(true);
      setItems(responseObj);
      setTotalAmt(total); //setting total amt in state
    }
  }, []);

  //setItems in localstorage when items changes
  useEffect(() => {
    localStorage.setItem("invoiceItem", JSON.stringify([...items]));
    localStorage.setItem("subTotal", totalAmt);
  }, [items, totalAmt]);

  useEffect(() => {
    setAmt(parseInt(qty) * parseInt(rate));
  }, [qty, rate]);

  //add item (when clicked submit button)
  //---main functionality of additem component
  //------------------->>>>>>>>>>>>>>>
  const addItem = (e) => {
    e.preventDefault();

    if (title === "" || qty === "") return;
    const obj = {
      title: title,
      qty: qty,
      rate: rate,
      amt: amt,
    };

    setItems([...items, obj]);
    setIsClicked(true);

    setTotalAmt(totalAmt + amt);

    setTitle("");
    setQty(1);
    setRate(0);
    inputEl.current.focus();

    setInvoiceItemData([...items, obj]);
  };

  useEffect(() => {
    setSubTotal(totalAmt);
  }, [totalAmt]);

  return (
    <form onSubmit={addItem}>
      <table className="item-container">
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Rate</th>
          <th className="amt-title">Amount</th>
        </tr>
        {isClicked ? (
          <Item items={items} editItem={editItem} deleteItem={deleteItem} />
        ) : (
          <small></small>
        )}
        <tr>
          <td>
            <input
              type="text"
              onChange={(e) => handleChange(e, setTitle)}
              value={title}
              placeholder="Item description"
              ref={inputEl}
            />
          </td>
          <td>
            <input
              type="number"
              onChange={(e) => handleChange(e, setQty)}
              value={qty}
              placeholder="Quantity"
              className="qty-input"
            />
          </td>
          <td className="rate">
            <span>Rs.</span>
            <input
              type="text"
              onChange={(e) => handleChange(e, setRate)}
              className="rate-input"
              value={rate}
              placeholder="Rate"
            />
          </td>
          <td className="amount">Rs. {amt}</td>
        </tr>
      </table>

      <input type="submit" className="add-item" value="+Add Item" />
    </form>
  );
}

export default AddItem;
