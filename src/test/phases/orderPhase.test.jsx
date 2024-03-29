import {
  getRoles,
  logRoles,
  render,
  screen,
  within,
} from "@testing-library/react";


import App from "../../App.jsx";
import userEvent from "@testing-library/user-event";

test("order phase for Happy Path", async () => {
  const user = userEvent.setup();
  // render App

  const { container } = render(<App />);

  logRoles(container);

  // add ice cream and scoops

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const checkBoxCherries = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });

  await user.clear(vanillaInput);

  await userEvent.type(vanillaInput, "1");

  await user.click(checkBoxCherries);

  const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i });
  expect(grandTotal).toHaveTextContent("3.50");

  const buttonConfirmation = screen.getByRole("button", {
    name: /order sundae!/i,
  });
  await user.click(buttonConfirmation);

  logRoles(container);

  const scoopsTotal = await screen.findByRole("heading", { name: /scoops:/i });
  const toppingsTotal = await screen.findByRole("heading", {
    name: /toppings:/i,
  });

  // check summary information bases in a order

  expect(scoopsTotal).toHaveTextContent("2.00");
  expect(toppingsTotal).toHaveTextContent("1.50");

  const confirmOrderButtton = screen.getByRole("button", { name: /confirm/i });

  const checkButtonTermsAndConditions = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  // accept terms and conditions and click the button to confirm order

  await user.click(checkButtonTermsAndConditions);

  // confirm order number on confirmation page

  await user.click(confirmOrderButtton);

  logRoles(container);

  // confirm order number on confirmation page

  const spinnerComponent = screen.getByRole("status");

  expect(spinnerComponent).toBeInTheDocument();

  const orderIdComponent = await screen.findByRole("heading", {
    name: /Your order Number is: /i,
  });

  logRoles(container);

  expect(spinnerComponent).not.toBeInTheDocument();

  expect(orderIdComponent).toBeInTheDocument();

  // click ner order button in confirmation page

  const newOrderButton = await screen.findByRole("button", {
    name: /Create new order/i,
  });

  await user.click(newOrderButton);

  screen.debug();

  // check scoops and toppings sub totals reset

  logRoles(container);

  const scoopsInitial = await screen.findByText("Scoops total: $0.00");

  expect(scoopsInitial).toBeInTheDocument();
});

test("If any toopings is selected, toppings seccion no render in OrderSummary Page", async () => {
  const user = userEvent.setup();

  const { container } = render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(vanillaInput);

  await userEvent.type(vanillaInput, "1");

  await user.clear(chocolateInput);

  await userEvent.type(chocolateInput, "2");

  // find all elements for toppings in the OrderEntry page
  const allToppings = await screen.findAllByRole("checkbox");

  allToppings.forEach((element) => expect(element).not.toBeChecked());

  //logRoles(container);

  //screen.debug();

  const buttonOrder = await screen.findByRole("button", {
    name: /order sundae!/i,
  });

  await user.click(buttonOrder);


  screen.debug();

  const scoopsHeading = screen.getByRole("heading", {name: /scoops/i});

  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", {name: /toppings/i});

  expect(toppingsHeading).not.toBeInTheDocument();

});
