import { useState } from "react";
import Container from "react-bootstrap/Container";

import OrderEntry from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

export default function App() {
  // orderPhase needs to be 'inProgress', 'review' or 'completed'
  const [orderPhase, setOrderPhase] = useState("inProgress");

  let Component = OrderEntry; // default to order page

  return (
    <OrderDetailsProvider>
      <Container>{<Component />}</Container>
    </OrderDetailsProvider>
  );
}
