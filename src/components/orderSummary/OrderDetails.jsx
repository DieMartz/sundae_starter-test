import React from "react";

export default function OrderDetails({ orderType, orderList }) {
  return (
    <>
      <h2>{orderType}</h2>

      <ul>
        {orderList.map((key) => {
          <li key={key}>{key}</li>;
        })}
      </ul>
    </>
  );
}
