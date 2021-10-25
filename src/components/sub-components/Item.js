import React from "react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Item({ items, editItem, deleteItem }) {
  return items.map((item, id) => (
    <div class="sub-item">
      <div className="item" key={id}>
        <div className="title">
          <p>{item.title}</p>
        </div>
        <div className="qty">
          <p>{item.qty}</p>
        </div>
        <div className="rt">
          <span>Rs.</span>
          {item.rate}
        </div>
        <div className="amt">Rs. {item.amt}</div>
      </div>
      <div className="edit">
        <FaEdit className="edit-btn" onClick={() => editItem(id, item)} />
        <MdDelete className="delete-btn" onClick={() => deleteItem(id, item)} />
      </div>
    </div>
  ));
}

export default Item;
