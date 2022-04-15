import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Form, Modal, Table} from "react-bootstrap";
// import api from "../utils/api";
import axios from "axios";



export default function Student(props) {
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [student, setStudent] = useState([])
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
        await axios.post('/students', {firstname: formValue.firstname, lastname: formValue.lastname, personalNo: formValue.personal_no,email: formValue.email, birthDate: formValue.birth_date});
        await getStudent();
    }
    const deleteStudent = async (id) =>{
        await axios.delete(`/students/${id}`)
        await getStudent();
    }
    // const updateStudent = async (id) =>{
    //     await axios.put(`/students/${id}`)
    // }
    // მონაცემის აბდეითი
    return (

        <div>

            <Table striped bordered hover >

                <thead>

                <tr className={'text-center'} >

                    <th >Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Personal No</th>
                    <th>Email</th>
                    <th>Birth Date</th>
                </tr>
                </thead>
                <tbody style={{cursor:"pointer"}}>

                {
                    student.map((student) =>
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.personalNo}</td>
                            <td>{student.email}</td>
                            <td>{(student.birthDate)?student.birthDate.slice(0,10):""}</td>
                            <td>
                                <Button className={"m-2"} variant="warning" onClick={() => setUpdateModal(true)}>Update</Button>
                                <Modal show={updateModal} onHide={()=> setUpdateModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Update Date</Modal.Title>
                                    </Modal.Header>
                                </Modal>
                                <Button className={"m-2"} variant="danger" onClick={() => setDeleteModal(true) }>Delete</Button>
                                <Modal show={deleteModal} onHide={()=> setDeleteModal(false)} >
                                    <Modal.Header  closeButton >
                                        <Modal.Title>Are you sure ?</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <div style={{display: "flex", alignItems: "center", justifyContent: "center" }} >
                                            <Button  style={{marginRight: 2.5}} onClick={()=>{setDeleteModal(false) ; deleteStudent(student.id).catch(console.error)}} >
                                                Yes
                                            </Button>
                                            <Button  style={{marginLeft: 2.5}} onClick={()=> setDeleteModal(false)}>
                                                No
                                            </Button>
                                        </div>
                                    </Modal.Body>
                                </Modal>
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

