import axios from "axios";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../context/OderDetails";
import Spinner from "react-bootstrap/Spinner";
import AlertBanner from "../../components/general/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [idPedido, setIdPedido] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((respopnse) => setIdPedido(respopnse.data.orderNumber))
      .catch((error) => setError(true));

    return () => {};
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    resetOrder();
    setOrderPhase("inProgress");
  };

  const newOrderButton = (
    <Button variant="primary" type="submit" onClick={handleClick}>
      Create new order
    </Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }

  if (idPedido) {
    return (
      <>
        <h1>Thank you! </h1>
        <h2>
          Your order Number is: <p>`${idPedido}`</p>
        </h2>
        <p> as per our terms and conditions, nothing will happen now </p>
        {newOrderButton}
      </>
    );
  } else {
    return <Spinner variant="border" role="status" />;
  }
}
