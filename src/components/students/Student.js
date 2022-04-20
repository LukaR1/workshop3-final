import React, {useEffect, useState} from "react";
import {Button, ButtonToolbar, Form, Modal, Table} from "react-bootstrap";
import axios from "axios";
import DeleteModal from '../modals/DeleteModal';
import UpdateModal from "../modals/UpdateModal";
import {useForm} from "react-hook-form";
import StudentFields from "./StudentFields";

export default function Student(props) {

    const {register, handleSubmit, reset} = useForm({})

    const [id, setId] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [student, setStudent] = useState([]);
    const [errors, setErrors] = useState([]);



    const getStudent = async () => {
        const res = await axios.get(`/students`)
        setStudent(res.data)

        console.log("item")

    }
    // console.log("fghjk",student)
    useEffect(() => {
        getStudent().catch(console.error)
    }, [])


    useEffect(() => {
        getStudent()

    }, [refresh])

    const addStudent = data => {
        console.log(data)
        axios.post("/students", data).then(res => {
            if (res.status === 201) {
                setShowModal(false)
                setRefresh(!refresh)
            } else {
                setErrors(res.data)
            }
        })
    }
    const deleteStudent = (id) => {
        axios.delete(`/students/${id}`).then(res => {
            if (res.status === 204) {
                setDeleteModal(false);
                setRefresh(!refresh)
            } else {
                throw "...."
            }
        })
    }

    const updateStudent = data => {
        console.log(data)
        axios.put(`/students/${id}`, data).then(res => {
            if (res.status === 200) {
                setUpdateModal(false);
                setRefresh(!refresh)
            } else {
                throw "...."
            }
        })
    }


    const getStudentData = (id) =>{
        setUpdateModal(true)
        setId(id)
        axios.get(`/students/${id}`).then(res=>{
            if (res.status === 200) {
                reset(res.data)
            }
        }).then().catch().finally()
    }

    const addClick = (id) =>{
        setShowModal(true);
        reset({});
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
                <tbody>
                {
                    student.map((student) =>
                        <tr key={student?.id}>
                            <td>{student?.id}</td>
                            <td>{student?.firstname}</td>
                            <td>{student?.lastname}</td>
                            <td>{student?.personalNo}</td>
                            <td>{student?.email}</td>
                            <td>{(student?.birthDate) ? student.birthDate.slice(0, 10) : ""}</td>
                            <td>
                                <Button style={{cursor: "pointer"}} className={"m-2"} variant="warning" onClick={() =>
                                    // setUpdateModal(true)

                                    // reset(student);
                                    // console.log(student)
                                    getStudentData(student.id)

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

            <Button className={"m-2"} variant="primary" onClick={() => addClick() }>Add</Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter the data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(addStudent)}>
                        <StudentFields register={register}/>
                        <ButtonToolbar className="justify-content-end mt-3">
                            <Button type="submit">
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
                updateModal &&
                <UpdateModal show={updateModal} setShow={setUpdateModal}
                             handleUpdate={updateStudent} register={register} handleSubmit={handleSubmit}/>
            }
        </div>
    );
}

