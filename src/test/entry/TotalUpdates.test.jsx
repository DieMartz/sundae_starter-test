import { render, screen } from "../../test-utils/test-utils";
import userEvent from "@testing-library/user-event";
import Options from "../../pages/orderEntry/Options";
import { OrderDetailsProvider } from "../../context/OderDetails";
import OrderEntry from "../../pages/orderEntry/OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();

  // se reenderiza el componente que contiene las imagenes de los sabores de los helados
  render(<Options optionType="scoops" />);

  /*
        Como se trata de obtner una coincidencia no es exacta debido a que no se esta mostrando el valor
        inicial de el Subtotal y como se puede ver en la documentacion de este metodo la propiedad exact 
        ya que esta nos permitira hacer busquedas aunque no se coloque o conozca la cadena completa

        Tip: si se tiene un componente el cual algun valor dentro de sus propiedades va a cambiar por la 
        interaccion del usuaria, se recomienda buscar ese componente omitiendo el valor que va a cambiar
    */

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });

  // iniciamos calculando el subtotal, mostrando en pantalla $0.00

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // se actualiza a una bola del sabor vainilla y se verifica el subtotal

  /*
     el elmento para ver las cantidades de bolas es asuncrono debido a que el nombre de sabores de helados
     viene de la API este se renderiza una vez la informacion es consumida exitosamente

  */

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const ChocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  /*
      como el componente de conteo de cuantas bolas de nieve se actualiza dependiendo la 
      interaccion del usuario y como el contenido del texto tiene un valor inicial de 0
      se debe de limpiar el componente antes de que el usuario ingrese que va a querer
      una bola del sabor seleccionado, para que aparezca el valor seleccionado y no una 
      concatenacion con el valor asignado.

      
      checar la documentacion de API del metodo clear 
      https://testing-library.com/docs/user-event/utility#clear
      
      debido a que el elemento que se usa para posteriormente sustituir el valor realiza una concatenacion 
  */

  await user.clear(vanillaInput);

  await userEvent.type(vanillaInput, "1");

  /*
    se espera que en el total (monetario) se tenga el valor de 2 ya que cada bola de helado cuesta 2
  */

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // se selecciona una bola de chocolate a 2 y se verifica el subtotal

  await user.clear(ChocolateInput);
  await userEvent.type(ChocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update total Amount for toppings", async () => {
  const user = userEvent.setup();

  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  const checkBoxCherries = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });

  const checkBoxMandms = await screen.findByRole("checkbox", { name: /M&Ms/i });

  // iniciamos calculando el subtotal, mostrando en pantalla $0.00

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  await user.click(checkBoxCherries);

  expect(checkBoxCherries).toBeChecked();

  expect(toppingsSubtotal).toHaveTextContent("1.5");

  await user.click(checkBoxMandms);

  expect(checkBoxMandms).toBeChecked();

  expect(toppingsSubtotal).toHaveTextContent("3");

  await user.click(checkBoxCherries);

  expect(checkBoxCherries).not.toBeChecked();

  expect(toppingsSubtotal).toHaveTextContent("1.5");
});

describe("grand Total", () => {
  
  test("grand total starts", () => {
    const { unmount } =  render(<OrderEntry />);
  
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i });
    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });

  test("grand total updates properly if scoop is added first", async() => {
    render(<OrderEntry />);
    
    const user = userEvent.setup();
    
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i });
    
   //const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });


    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await userEvent.type(vanillaInput, "1");


    expect(grandTotal).toHaveTextContent("2.00");


    const checkBoxCherries = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });


    await user.click(checkBoxCherries);

    expect(checkBoxCherries).toBeChecked();


    expect(grandTotal).toHaveTextContent("3.50");
  

  });
  test("grand total updates properly if topping is added first", async() => {
    render(<OrderEntry />);
    
    const user = userEvent.setup();


    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i });


    const checkBoxCherries = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });


    await user.click(checkBoxCherries);

    expect(checkBoxCherries).toBeChecked();

    expect(grandTotal).toHaveTextContent("1.50");


    
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);

    await userEvent.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");

  });
  test("grand total updates properly if item is removed", async() => {
    render(<OrderEntry />);
    
    const user = userEvent.setup();
    
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/i });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });


    const checkBoxCherries = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    await user.clear(vanillaInput);

    await userEvent.type(vanillaInput, "1");

    await user.click(checkBoxCherries);

    expect(checkBoxCherries).toBeChecked();

    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(checkBoxCherries);

    expect(checkBoxCherries).not.toBeChecked();

    expect(grandTotal).toHaveTextContent("2.00");


    
  });
});
