import { logRoles, render, screen } from "../../test-utils/test-utils";

import Options from "../../pages/orderEntry/Options";
import userEvent from "@testing-library/user-event";

test( "displays image for each scoop option from server", async () => {
    const { container } = render( <Options optionType="scoops"/> );

    logRoles( container );
    /*
     * Como se esta esperando que el componente de imagenes tenga la terminacion scoops
     * por lo cual se asigna el caracter $
     * */
    // finding the element
    const scoopImages = await screen.findAllByRole( "img", { name: /scoop$/i } );

    expect( scoopImages ).toHaveLength( 2 );

    // confirm alt text of images
    // @ts-ignore
    const altText = scoopImages.map( ( element ) => element.alt );
    /*
     * Cuando se esta trabajando con valores primitivos 'String, Number'
     * para poder realizar una asercion se requiere utilizar el ToBe
     *
     * cuando se esta trabajando con objetos o arreglos
     * para realizar la asercion se utiliza el toEqual
     *
     * */
    expect( altText ).toEqual( ["Chocolate scoop", "Vanilla scoop"] );
} );

test( "displays each Toppings in Screen", async () => {
    render( <Options optionType="toppings"/> );

    // find images
    const toppingImages = await screen.findAllByRole( "img", {
        name: /topping$/i,
    } );
    expect( toppingImages ).toHaveLength( 3 );

    // confirm alt text of images
    // @ts-ignore
    const imageTitle = toppingImages.map( ( element ) => element.alt );
    expect( imageTitle ).toEqual( [
        "Cherries topping",
        "M&Ms topping",
        "Hot fudge topping",
    ] );
} );

test( "spinButton add class ionvalid when a no valid input", async () => {
    const user = userEvent.setup();

    const { container } = render( <Options optionType="scoops"/> );

    const scoopVanilla = await screen.findByRole( "spinbutton", { name: /vanilla/i } );

    const scoopsTotal = await screen.findByText( /scoops total: /i, { exact: false } );


    await user.clear( scoopVanilla );

    await user.type( scoopVanilla, "20" );


    expect( scoopsTotal ).toHaveTextContent( "0.00" )


    expect( scoopVanilla ).toHaveClass( "is-invalid" );

    await user.clear( scoopVanilla );
    await user.type( scoopVanilla, "-1" );

    expect( scoopVanilla ).toHaveClass( "is-invalid" );
    //screen.debug();
    expect( scoopsTotal ).toHaveTextContent( "0.00" )

    await user.clear( scoopVanilla );
    await user.type( scoopVanilla, "5" );

    expect( scoopVanilla ).not.toHaveClass( "is-invalid" );

    expect( scoopsTotal ).toHaveTextContent( "10.00" )


    //logRoles( container );
    //screen.debug();
} );
