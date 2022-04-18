import React, {useState} from "react";
import {Button, ButtonToolbar, Form, Modal} from "react-bootstrap";


export default function UpdateModal({showD, setShowD, id, handleUpdate, student}) {

    const [formValue, setFormValue] = useState({
        firstname: "",
        lastname: "",
        personalNo: "",
        email: "",
        birthDate: ""
    });

    return (

        <Modal show={showD} onHide={() => setShowD(false)}>

            <Modal.Header closeButton>
                <Modal.Title>Update data </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                </div>
                <Form>
                    <Form.Group className={"mt-3"}>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            placeholder="Enter First Name"
                            type="text"
                            value={formValue.firstname}
                            onChange={event => setFormValue({...formValue, firstname: event.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className={"mt-3"}>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            placeholder="Enter Last Name"
                            value={formValue.lastname}
                            onChange={event => setFormValue({...formValue, lastname: event.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className={"mt-3"}>
                        <Form.Label>Personal No</Form.Label>
                        <Form.Control
                            type="int"
                            placeholder="Enter Personal No"
                            value={formValue.personalNo}
                            onChange={event => setFormValue({...formValue, personalNo: event.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className={"mt-3"}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            placeholder="Enter Email"
                            value={formValue.email}
                            onChange={event => setFormValue({...formValue, email: event.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className={"mt-3"}>
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control
                            placeholder="Enter Birth Date (yyyy-mm-dd)"
                            value={formValue.birthDate}
                            onChange={event => setFormValue({...formValue, birthDate: event.target.value})}
                        />
                    </Form.Group>
                </Form>

                <ButtonToolbar style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

                    <Button className="justify-content-end mt-3" style={{marginRight: 2.5}} onClick={() => {
                        setShowD(false)
                        handleUpdate(formValue, id)
                    }}>
                        Done
                    </Button>
                    <Button className="justify-content-end mt-3" style={{marginLeft: 2.5}}
                            onClick={() => setShowD(false)}>
                        Exit
                    </Button>
                </ButtonToolbar>
            </Modal.Body>
        </Modal>
    )
}