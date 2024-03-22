import axios from "axios";
import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../context/OderDetails";
import Spinner from "react-bootstrap/Spinner";

export default function OrderConfirmation( { setOrderPhase } ) {
    const { resetOrder }          = useOrderDetails();
    const [idPedido, setIdPedido] = useState( null );

    useEffect( () => {
        axios
            .post( "http://localhost:3030/order" )
            .then( ( respopnse ) => setIdPedido( respopnse.data.orderNumber ) )
            .catch( ( error ) => {
            } );

        return () => {
        };
    }, [] );

    const handleClick = ( e ) => {
        e.preventDefault();
        resetOrder();
        setOrderPhase( "inProgress" )

    };


    if ( idPedido ) {

        return (
            <>
                <h1>Thank you! </h1>
                <h2>
                    Your order Number is: <p>`${idPedido}`</p>
                </h2>
                <p> as per our terms and conditions, nothing will happen now </p>
                <Button variant="primary" type="submit" onClick={handleClick}>
                    Create new order
                </Button>
            </>
        );

    } else {
        return (
            <Spinner variant="border" role="status"/>
        )
    }
}
