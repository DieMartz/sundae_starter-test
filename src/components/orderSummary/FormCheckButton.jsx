import React, { useState } from 'react'
import { Button, Form, OverlayTrigger } from "react-bootstrap";
import Popover from 'react-bootstrap/Popover';

export default function FormCheckButton( { setOrderPhase } ) {

    const [confirmButtonState, setConfirmButtonState] = useState( false );


    const handleClick = ( e ) => {
        e.preventDefault();
        setOrderPhase( "completed" )
    }


    const popover = (
        <Popover id="popover-basic">
            <Popover.Body>
                No ice cream wil actually be delivered
            </Popover.Body>
        </Popover>
    );

    const checkboxLabel = (
        <span>
             I agree to
            <OverlayTrigger placement="right" overlay={popover}>
                <span style={{ color: "blue" }}> Terms and Conditions</span>
            </OverlayTrigger>
        </span>
    );
    return (

        <Form>
            <Form.Group controlId="terms-and-conditions">
                <Form.Check
                    type="checkbox"
                    checked={confirmButtonState}
                    onChange={e => setConfirmButtonState( e.target.checked )}
                    label={checkboxLabel}
                />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!confirmButtonState} onClick={handleClick}>
                Confirm Order
            </Button>
        </Form>
    )
}
