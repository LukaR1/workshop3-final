import React  from "react";
import {Button, Modal} from "react-bootstrap";


export default function DeleteModal({show, setShow, id, handleDelete}){

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure ? </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <Button style={{marginRight: 2.5}} onClick={() => {
                        setShow(false)
                        handleDelete(id)
                    }}>
                        Yes
                    </Button>
                    <Button style={{marginLeft: 2.5}} onClick={() => setShow(false)}>
                        No
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}