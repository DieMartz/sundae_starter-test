import "./App.css";
import OrderEntry from "./pages/orderEntry/OrderEntry.jsx";

import { OrderDetailsProvider } from "./context/OderDetails.jsx";
import { useState } from "react";
import OrderSummary from "./pages/summary/OrderSummary.jsx";
import OrderConfirmation from "./pages/orderConfirmation/OrderConfirmation.jsx";
import { Container } from "react-bootstrap";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry; // default to order page
  switch (orderPhase) {
    case "inProgress":
      Component = OrderEntry;
      break;
    case "review":
      Component = OrderSummary;
      break;
    case "completed":
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <Container>
      <OrderDetailsProvider>
        <Component setOrderPhase={setOrderPhase} />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
