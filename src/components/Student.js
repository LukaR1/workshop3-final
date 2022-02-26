import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Form, Modal, Table} from "react-bootstrap";
import api from "../utils/api";
import ModalHeader from "react-bootstrap/ModalHeader";



export default function Student(props) {
    // const [id, setId] = useState() /*აიდის წამოღება*/
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [student, setStudent] = useState([])
    const [formValue, setFormValue] = useState({
        firstname: "",
        lastname: "",
        personal_no: "",
        email: "",
        birth_date: ""
    });

    const getStudent = async () => {
        const res = await api.get('/student')
        setStudent(res.data)
    }

    useEffect(() => {
        getStudent().catch(console.error)
    }, [])


    const addStudent = async (e) => {
        e.preventDefault();
        await api.post('/student', {firstname: formValue.firstname, lastname: formValue.lastname, personalNo: formValue.personal_no,email: formValue.email, birthDate: formValue.birth_date});
        await getStudent();
    }
    const deleteStudent = async (e) =>{
        await api.delete(`/student`) /*აიდით წაშლა*/
    }



    return (
        <div>
            <Table striped bordered hover onClick={() => setUpdateModal(true)}>
                <thead>
                <tr className={'text-center'} >
                    <th>ID</th>
                    <th>FIRSTNAME</th>
                    <th>LASTNAME</th>
                    <th>PERSONAL NO</th>
                    <th>EMAIL</th>
                    <th>BIRTH DATE</th>
                </tr>
                </thead>
                <tbody>
                {
                    student.map((student) =>
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.personalNo}</td>
                            <td>{student.email}</td>
                            <td>{student.birthDate}</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <Modal show={updateModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Change Or Delete Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                    </Form>
                </Modal.Body>
            </Modal>

            <Button className={"m-2"} variant="primary" onClick={() => setShowModal(true)}>Add</Button>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addStudent}>
                        <Form.Group className={"mt-3"}>
                            <Form.Label>FIRSTNAME</Form.Label>
                            <Form.Control
                                placeholder="Enter First Name"
                                type="text"
                                value={formValue.firstname}
                                onChange={event => setFormValue({...formValue, firstname: event.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className={"mt-3"}>
                            <Form.Label>LASTNAME</Form.Label>
                            <Form.Control
                                placeholder="Enter Last Name"
                                value={formValue.lastname}
                                onChange={event => setFormValue({...formValue, lastname: event.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className={"mt-3"}>
                            <Form.Label>PERSONAL NO</Form.Label>
                            <Form.Control
                                type="int"
                                placeholder="Enter Personal No"
                                value={formValue.personal_no}
                                onChange={event => setFormValue({...formValue, personal_no: event.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className={"mt-3"}>
                            <Form.Label>EMAIL</Form.Label>
                            <Form.Control
                                placeholder="Enter Email"
                                value={formValue.email}
                                onChange={event => setFormValue({...formValue, email: event.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className={"mt-3"}>
                            <Form.Label>BIRTH DATE</Form.Label>
                            <Form.Control
                                placeholder="Enter Birth Date (yyyy-mm-dd)"
                                value={formValue.birth_date}
                                onChange={event => setFormValue({...formValue, birth_date: event.target.value})}
                            />
                        </Form.Group>
                        <ButtonToolbar className="justify-content-end mt-3">
                            <Button type="submit" onClick={()=>setShowModal(false)} >
                                Add data
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </Modal.Body>

            </Modal>

        </div>
    );
}

