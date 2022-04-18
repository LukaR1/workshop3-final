import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";
import DeleteModal from './modals/DeleteModal';
import UpdateModal from "./modals/UpdateModal";


export default function Student(props) {
    const [id, setId] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [student, setStudent] = useState([]);
    const [formValue, setFormValue] = useState({
        firstname: "",
        lastname: "",
        personal_no: "",
        email: "",
        birth_date: ""
    });

    const getStudent = async () => {
        const res = await axios.get('/students')
        setStudent(res.data)
    }

    useEffect(() => {
        getStudent().catch(console.error)
    }, [])


    const addStudent = async (e) => {
        e.preventDefault();
        await axios.post('/students', {
            firstname: formValue.firstname,
            lastname: formValue.lastname,
            personalNo: formValue.personal_no,
            email: formValue.email,
            birthDate: formValue.birth_date
        });
        await getStudent();
    }
    const deleteStudent = (id) => {
        axios.delete(`/students/${id}`).then(res => {
            if (res.status === 204) {
                getStudent()
            } else {
                throw "...."
            }
        })
    }

    const updateStudent = (id) => {
        axios.put(`/students/${id}`, {}).then(res => {
            if (res.status === 200) {
                getStudent()
            } else {
                throw "...."
            }
        })
    }

    return (

        <div>

            <Table striped bordered hover>

                <thead>

                <tr className={'text-center'}>

                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Personal No</th>
                    <th>Email</th>
                    <th>Birth Date</th>
                </tr>
                </thead>
                <tbody >

                {
                    student.map((student) =>
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.personalNo}</td>
                            <td>{student.email}</td>
                            <td>{(student.birthDate) ? student.birthDate.slice(0, 10) : ""}</td>
                            <td>
                                <Button style={{cursor: "pointer"}} className={"m-2"} variant="warning" onClick={() => {
                                    setUpdateModal(true)
                                    setId(student.id)
                                }
                                }>
                                    Update
                                </Button>

                                <Button style={{cursor: "pointer"}} className={"m-2"} variant="danger" onClick={() => {
                                    setDeleteModal(true)
                                    setId(student.id)
                                }
                                }>
                                    Delete
                                </Button>

                            </td>
                        </tr>
                    )}

                </tbody>
            </Table>

            <Button className={"m-2"} variant="primary" onClick={() => setShowModal(true)}>Add</Button>

            {/*<Button className={"m-2"} variant="primary">Logout</Button>*/}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={addStudent}>
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
                                value={formValue.personal_no}
                                onChange={event => setFormValue({...formValue, personal_no: event.target.value})}
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
                                value={formValue.birth_date}
                                onChange={event => setFormValue({...formValue, birth_date: event.target.value})}
                            />
                        </Form.Group>
                        <ButtonToolbar className="justify-content-end mt-3">
                            <Button type="submit" onClick={() => setShowModal(false)}>
                                Add data
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </Modal.Body>

            </Modal>


            {
                deleteModal && id &&
                <DeleteModal show={deleteModal} setShow={setDeleteModal} id={id} handleDelete={deleteStudent}/>
            }

            {
                updateModal && id &&
                <UpdateModal showD={updateModal} setShowD={setUpdateModal} id={id} handleUpdate={updateModal}/>
            }

        </div>
    );
}

