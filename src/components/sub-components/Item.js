import React from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Item({ items, editItem, deleteItem }) {
  return items.map((item, id) => (
    <tr className="item" key={id}>
      <td className="title">
        <p>{item.title}</p>
      </td>
      <td className="qty">
        <p>{item.qty}</p>
      </td>
      <td className="rt">
        <span>Rs.</span>
        {item.rate}
      </td>
      <td className="amount">Rs. {item.amt}</td>
      <td className="edit">
        <FaEdit className="edit-btn" onClick={() => editItem(id, item)} />
        <MdDelete className="delete-btn" onClick={() => deleteItem(id, item)} />
      </td>
    </tr>
  ));
}

export default Item;
