import Button from "react-bootstrap/Button";
import Options from "./Options";

export default function OrderEntry({ setOrderPhase }) {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
    </div>
  );
}
