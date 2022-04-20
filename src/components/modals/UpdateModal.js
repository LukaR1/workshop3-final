import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import StudentFields from "../students/StudentFields";

export default function UpdateModal({show, setShow, handleUpdate, register, handleSubmit}) {


    return (

        <Modal show={show} onHide={() => setShow(false)}>

            <Modal.Header closeButton>
                <Modal.Title>Update data </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                </div>
                <Form onSubmit={handleSubmit(handleUpdate)}>
                    <StudentFields register={register}/>
                    <ButtonToolbar style={{display: "flex", alignItems: "center", justifyContent: "center"}}>

                        <Button className="justify-content-end mt-3" style={{marginRight: 2.5}} type="submit">
                            Done
                        </Button>
                        <Button className="justify-content-end mt-3" style={{marginLeft: 2.5}}
                                onClick={() => setShow(false)}>
                            Exit
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Modal.Body>
        </Modal>
    )
}