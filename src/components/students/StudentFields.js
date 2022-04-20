import React from "react";
import {Form} from "react-bootstrap";

export default function studentFields({register}) {

    return (
        <>
            <Form.Group className={"mt-3"}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    placeholder="Enter First Name"
                    type="text"
                    {...register('firstname')}
                />
            </Form.Group>
            <Form.Group className={"mt-3"}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    placeholder="Enter Last Name"
                    {...register('lastname')}
                />
            </Form.Group>
            <Form.Group className={"mt-3"}>
                <Form.Label>Personal No</Form.Label>
                <Form.Control
                    type="int"
                    placeholder="Enter Personal No"
                    {...register('personalNo')}
                />
            </Form.Group>
            <Form.Group className={"mt-3"}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    placeholder="Enter Email"
                    {...register('email')}
                />
            </Form.Group>
            <Form.Group className={"mt-3"}>
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                    placeholder="Enter Birth Date (yyyy-mm-dd)"
                    {...register('birthDate')}
                />
            </Form.Group>
        </>

    )
}