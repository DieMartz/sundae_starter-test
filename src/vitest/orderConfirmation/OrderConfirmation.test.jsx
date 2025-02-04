import OrderConfirmation from '../../pages/orderConfirmation/OrderConfirmation'
import { render, screen } from '../../test-utils/test-utils'
import { logRoles } from "@testing-library/react";

test( 'Obtains a Order number for a service', async () => {
    const { container } = render( <OrderConfirmation/> )

    //const orderIdComponent = screen.getByRole('heading', {name: /Your order Number is: /i});

    logRoles( container );

    const spinnerComponent = screen.getByRole( 'status' );

    expect( spinnerComponent ).toBeInTheDocument();


    const orderIdComponent = await screen.findByRole( 'heading', { name: /Your order Number is: /i } );

    logRoles( container );

    /*const spinnerComponentNot = screen.getByRole( 'status' );

    expect( spinnerComponentNot ).not.toBeInTheDocument();*/

    expect( spinnerComponent ).not.toBeInTheDocument();

    expect( orderIdComponent ).toBeInTheDocument();


} )