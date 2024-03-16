import { logRoles, render, screen } from "../../test-utils/test-utils";

import Options from "../../pages/orderEntry/Options";

test("displays image for each scoop option from server", async () => {
  const { container } = render(<Options optionType="scoops" />);

  logRoles(container);
  /*
   * Como se esta esperando que el componente de imagenes tenga la terminacion scoops
   * por lo cual se asigna el caracter $
   * */
  // finding the element
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  /*
   * Cuando se esta trabajando con valores primitivos 'String, Number'
   * para poder realizar una asercion se requiere utilizar el ToBe
   *
   * cuando se esta trabajando con objetos o arreglos
   * para realizar la asercion se utiliza el toEqual
   *
   * */
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays each Toppings in Screen", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  // @ts-ignore
  const imageTitle = toppingImages.map((element) => element.alt);
  expect(imageTitle).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
