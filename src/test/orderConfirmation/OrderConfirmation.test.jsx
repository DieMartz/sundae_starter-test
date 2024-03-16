import OrderConfirmation from '../../pages/orderConfirmation/OrderConfirmation'
import {getByRole, render, screen} from '../../test-utils/test-utils'

test('Obtains a Order number for a service', async() => { 
    render(<OrderConfirmation />)

    //const orderIdComponent = screen.getByRole('heading', {name: /Your order Number is: /i});

    
    const spinnerComponent = screen.getByRole('status');

    expect(spinnerComponent).toBeInTheDocument();


    const orderIdComponent = await screen.findByRole('heading', {name: /Your order Number is: /i});


    expect(orderIdComponent).toBeInTheDocument();




 })