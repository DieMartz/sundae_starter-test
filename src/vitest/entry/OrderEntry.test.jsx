import { http, HttpResponse } from "msw";

import { server } from "../../mocks/server";

import { logRoles, render, screen } from "../../test-utils/test-utils";
import OrderEntry from "../../pages/orderEntry/OrderEntry";
import userEvent from "@testing-library/user-event";


afterEach(() =>
  server.use(
    http.get("http://localhost:3030/scoops", () => {
      // Note that you DON'T have to stringify the JSON!
      return HttpResponse.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ]);
    }),

    http.get("http://localhost:3030/toppings", () => {
      return HttpResponse.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ]);
    })
  )
);

test("handles error for scoops and toppings routes", async () => {
  /*
      Como se busca simular la funcionalidad en caso de que falle el servidor que trae las 
      imagenes que se renderizaran se crea un nuevo handler (en ese caso se sobreeescribe)
      para que las peticiones fallen y se reenderizen los alert, que se crearon en el codigo 
      para mostrarse al usuario
  
    */
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  const { container } = render(<OrderEntry />);

  /*
  
  los alert que se buscan renderizar (Bootstrap) por defecto no colocan un nombre en la propiedad nombre 
  del Elemento HTMLDiv 
  
  por lo cual si se utiliza el medoro findAllByText, adicional con la propiedad nombre, 
  pero como no se coloca por la configuracion de los componentes de 3ros, solo puede ser
  obtenido ya sea definiendo busuqeda por Rol o busqueda por el texto que se colocara en el componente
  */

  

  const alerts = await screen.findAllByText(
    "An unexpected error ocurred. Please try again later."
  );

  /*
      para poder ver todos los roles involucrados, se debe de colocar, en caso de que se busque
      para saber que rolos se encuentran en el componente que se reenderiza
  
    */
  logRoles(container);
  screen.debug();

  // se espera que se tehnga 2 componentes renderizados debido a que no se pudo encontrar y reenderizar las imagenes

  expect(alerts).toHaveLength(2);

});

test("Disables the Order button if any scoops are selected", async () => {
  const user = userEvent.setup();
// Todo mock prop setOrderPhahse
  const { container } = render(<OrderEntry />);

  const allScoops = await screen.findAllByRole("spinbutton");

  allScoops.forEach(({ value }) => expect(value).toMatch(/0/));

  const buttonOrder = await screen.findByRole("button", {
    name: /order sundae!/i,
  });

  expect(buttonOrder).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  user.clear(vanillaInput);

  user.type(vanillaInput, "2");

  expect(buttonOrder).toBeEnabled();

 // screen.debug();

});



