import axios from "axios";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import ScoopOption from "./ScoopOption";
import Toppings from "./Toppings";
import AlertBanner from "../../components/general/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OderDetails";

export default function Options( { optionType } ) {
    const [items, setItems] = useState( [] );

    const [error, setError] = useState( false );

    const { totals } = useOrderDetails();

    // optionType is 'scoops' or 'toppings
    useEffect( () => {
        // se crea un nuevo objeto llamada abortController para atar la peticion de la API
        // Objeto utiizado para manejar procesos
        const controllerAbort = new AbortController();

        axios
            .get( `http://localhost:3030/${optionType}` )
            .then( ( response ) => setItems( response.data ) )
            .catch( ( error ) => {
                if ( error.name !== "CanceledError" ) setError( true )
            } );

        // aborta la llamada cuando el componente es desmontado
        return () => {
            controllerAbort.abort();
        }
    }, [optionType] );

    if ( error ) {
        return <AlertBanner/>;
    }

    // variable que almacena el JSX componente dependiendo de que se va a anviar el

    const ItemComponent = optionType === "scoops" ? ScoopOption : Toppings;

    const title = optionType[0].toUpperCase() + optionType.slice( 1 ).toLowerCase();

    const optionItems = items.map( ( item ) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ) );

    return (
        <>
            <h2>{title}</h2>
            <p>{formatCurrency( pricePerItem[optionType] )} each</p>
            <p>
                {title} total: {formatCurrency( totals[optionType] )}
            </p>
            <Row>{optionItems}</Row>
        </>
    );
}
