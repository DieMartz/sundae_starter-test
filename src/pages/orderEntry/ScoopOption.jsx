import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../context/OderDetails";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";

export default function ScoopOptions( { name, imagePath } ) {
    const { updateItemCount } = useOrderDetails();

    const [valid, setValid] = useState( false )

    const handleChange = ( e ) => {

        const numberScoops = parseInt( e.target.value );


        if ( numberScoops === 0 || numberScoops < 0 || numberScoops > 10 ) {

            setValid( true )

            updateItemCount( name, 0, "scoops" );

        } else {
            updateItemCount( name, numberScoops, "scoops" );
            setValid( false );
        }

    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
            <img
                style={{ width: "75%" }}
                src={`http://localhost:3030/${imagePath}`}
                alt={`${name} scoop`}
            />

            <Form.Group
                controlId={`${name}-count`}
                as={Row}
                style={{ marginTop: "10px" }}
            >
                <Form.Label column="6" style={{ textAlign: "right" }}>
                    {name}
                </Form.Label>
                <Col xs="5" style={{ textAlign: "left" }}>
                    <Form.Control
                        type="number"
                        defaultValue={0}
                        onChange={handleChange}
                        isInvalid={valid}
                    />
                </Col>
            </Form.Group>
        </Col>
    );
}
