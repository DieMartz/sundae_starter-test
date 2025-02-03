import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../context/OderDetails";
import { formatCurrency } from "../../utilities";
import { Button } from "./node_modules/react-bootstrap";

export default function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();

  const isEnabled = totals.scoops === 0;

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)} </h2>
      <Button onClick={() => setOrderPhase("review")} disabled={isEnabled}>
        Order Sundae!
      </Button>
    </div>
  );
}
