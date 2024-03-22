import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../context/OderDetails";
import { formatCurrency } from "../../utilities";
import Button from "react-bootstrap/Button";

export default function OrderEntry( { setOrderPhase } ) {

    const { totals } = useOrderDetails();
    return (
        <div>
            <Options optionType="scoops"/>
            <Options optionType="toppings"/>
            <h2>Grand total: {formatCurrency( totals.scoops + totals.toppings )} </h2>
            <Button onClick={() => setOrderPhase( "review" )}>Order Sundae!</Button>
        </div>
    );
}
