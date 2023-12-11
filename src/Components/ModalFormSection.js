import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ModalFormSection = (props) => {
    const saveData = () => {
        const existingTasksList = JSON.parse(localStorage.getItem("TaskList")) || []
        const NewTasks = [...existingTasksList, props.task]
        localStorage.setItem("TaskList", JSON.stringify(NewTasks));
        props.onHide()
    }
    
    return (
        <div>
            <Modal show={props.open} onHide={props.onHide} dialogClassName="modal-100w" contentClassName="modal-content-100h">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Title <span>{props.task.title}</span></h5>
                        <h5>Description <span>{props.task.description}</span></h5>
                        <h5>Time <span>{props.task.time}</span></h5>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveData}>Save</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalFormSection
