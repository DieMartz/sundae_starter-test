import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormCheckButton from "../../components/orderSummary/FormCheckButton";

describe("Summary Form Interactions and Components", () => {
  test("Button Exist in Page", () => {
    render(<FormCheckButton />);

    const confirmOrderButtton = screen.getByRole("button", {
      name: /confirm/i,
    });

    const checkButtonTermsAndConditions = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    expect(confirmOrderButtton).toBeInTheDocument();
    expect(checkButtonTermsAndConditions).toBeInTheDocument();
  });

  test("Initial State for the Components", () => {
    render(<FormCheckButton />);
    const confirmOrderButtton = screen.getByRole("button", {
      name: /confirm/i,
    });

    const checkButtonTermsAndConditions = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(confirmOrderButtton).toBeDisabled();
    expect(checkButtonTermsAndConditions).not.toBeChecked();
  });

  test("Button enabled If CheckBox is Pressed and Second Click Button Disabled", async () => {
    /*
     * Para poder realizar eventos en los que se puede similar como interactuaria el usuario con la app
     * mienras que el metoddo fireEvent simula eventos de la computadora, al contrario de los
     * UserEvent
     * */
    const user = userEvent.setup();

    render(<FormCheckButton />);
    const confirmOrderButtton = screen.getByRole("button", {
      name: /confirm/i,
    });

    const checkButtonTermsAndConditions = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    /*
     * Siempre se retorna una promesa, por lo cual se nececita esperar a que se realice la accion
     * y continuar con el flujo de la prueba
     * */
    await user.click(checkButtonTermsAndConditions);

    expect(checkButtonTermsAndConditions).toBeChecked();

    expect(confirmOrderButtton).toBeEnabled();

    await user.click(checkButtonTermsAndConditions);

    expect(confirmOrderButtton).toBeDisabled();
    expect(checkButtonTermsAndConditions).not.toBeChecked();
  });

  test("Popover responds to hover", async () => {
    const user = userEvent.setup();

    render(<FormCheckButton />);

    // popOver starts out hidden

    const noPopOver = screen.queryByText(
      /No ice cream wil actually be delivered/i
    );

    expect(noPopOver).not.toBeInTheDocument();
    /**/
    // popover show when mouseover event is performed over the label

    const termsAndConditios = screen.getByText(/terms and conditions/i);

    await user.hover(termsAndConditios);

    const popOver = screen.getByText(/no ice cream wil actually be delivered/i);

    expect(popOver).toBeInTheDocument();

    // popover disaooears when we mouse out/**/

    await user.unhover(termsAndConditios);

    expect(popOver).not.toBeInTheDocument();
  });
});
