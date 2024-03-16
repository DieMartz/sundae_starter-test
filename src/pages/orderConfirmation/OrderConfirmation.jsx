import axios from "axios";
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../context/OderDetails";
import { Spinner } from "react-bootstrap";

export default function OrderConfirmation() {
  const { resetOrder } = useOrderDetails();
  const [idPedido, setIdPedido] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((respopnse) => setIdPedido(respopnse.data.orderNumber))
      .catch((error) => {});

    return () => {};
  }, [idPedido]);

  const handleClick = (e) => {
    resetOrder();
  };

  return (
    <>
      {idPedido || <Spinner animation="border" role="status" />}
      <h1>Thank you! </h1>
      <h2>
        Your order Number is: <p>`${idPedido}`</p>
      </h2>
      <p> as per our terms and conditions, nothing will happen now </p>
      <Button variant="primary" type="submit" onClick={handleClick}>
        Create new order
      </Button>
    </>
  );
}
