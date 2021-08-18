import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings checked", async () => {
  render(<Options optionType="toppings" />);

  const toppingSubTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubTotal).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesInput);
  expect(toppingSubTotal).toHaveTextContent("1.50");

  const hotFudgeInput = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeInput);
  expect(toppingSubTotal).toHaveTextContent("3.00");

  userEvent.click(cherriesInput);
  expect(toppingSubTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    render(<OrderEntry />);

    const total = screen.getByText("Grand total: $", { exact: false });
    expect(total).toHaveTextContent("0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const total = screen.getByText("Grand total: $", { exact: false });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(total).toHaveTextContent("2.00");

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesInput);
    expect(total).toHaveTextContent("3.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const total = screen.getByText("Grand total: $", { exact: false });

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesInput);
    expect(total).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(total).toHaveTextContent("3.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const total = screen.getByText("Grand total: $", { exact: false });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(total).toHaveTextContent("2.00");

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesInput);
    expect(total).toHaveTextContent("3.50");

    userEvent.click(cherriesInput);
    expect(total).toHaveTextContent("2.00");

    userEvent.type(vanillaInput, "0");
    expect(total).toHaveTextContent("0.00");
  });
});
