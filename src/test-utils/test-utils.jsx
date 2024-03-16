import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OderDetails";

/**
 * @param ui - cualquier elemento JSX que se quiera envolver con el contexto
 * @param options - tambien tomara un objeto de opciones, como lo haria el metodo render original
 */
const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithContext as render };
