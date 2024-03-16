import "./App.css";
import Container from "react-bootstrap/Container";
import OrderEntry from "./pages/orderEntry/OrderEntry.jsx";

import { OrderDetailsProvider } from "./context/OderDetails.jsx";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
