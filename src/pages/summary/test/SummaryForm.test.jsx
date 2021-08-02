import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  render(<SummaryForm />);
  const checkedElement = screen.getByRole("checkbox", { id: "agreement" });
  expect(checkedElement).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: "Confirm order" });
  expect(confirmButton).toBeDisabled();
});

test("checkbox checked when clicked and unchecked when clicked second time", () => {
  render(<SummaryForm />);
  const checkedElement = screen.getByRole("checkbox", { id: "agreement" });
  const confirmButton = screen.getByRole("button", { name: "Confirm order" });

  fireEvent.click(checkedElement);
  expect(confirmButton).toBeEnabled();

  fireEvent.click(checkedElement);
  expect(confirmButton).toBeDisabled();
});
