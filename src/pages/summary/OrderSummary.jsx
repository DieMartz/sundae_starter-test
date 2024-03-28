import React from "react";
import FormCheckButton from "../../components/orderSummary/FormCheckButton.jsx";
import { useOrderDetails } from "../../context/OderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();
  const { scoops, toppings } = optionCounts;

  const scoopArray = Object.entries(scoops); // [["chocolate", 2], ["chocolate", 2]]
  const scoopList = scoopArray.map((key, value) => {
    <li key={value}>
      {value} {key}
    </li>;
  });

  const hasToppings = totals.toppings > 0;
  let toppingsDisplay 

  if (hasToppings) {
    const toppingArray = Object.keys(toppings); //["M&Ms", "GummyBears"]
    const toppingList = toppingArray.map((key) => {
      <li key={key}>{key}</li>;
    });
    
    toppingsDisplay = (
      <>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <ul>{toppingList}</ul>
      </>
    )
  }

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {toppingsDisplay}     
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)} </h2>
      <FormCheckButton setOrderPhase={setOrderPhase} />
    </div>
  );
}
