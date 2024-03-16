import React from "react";
import SummaryForm from "./SummaryForm";
import FormCheckButton from "../../components/FormCheckButton";
import { useOrderDetails } from "../../context/OderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2], ["chocolate", 2]]
  const scoopList = scoopArray.map((key, value) => {
    <li key={value}>
      {value} {key}
    </li>;
  });

  const toppingArray = Object.keys(optionCounts.toppings); //["M&Ms", "GummyBears"]
  const toppingList = toppingArray.map((key) => {
    <li key={key}>{}</li>;
  });

  return (
    <div>
      <h1>OrderSummary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      <h2>Scoops: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingList}</ul>
      <FormCheckButton />
    </div>
  );
}
