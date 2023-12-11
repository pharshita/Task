import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function EditModal(props) {
    const [taskDescription, setTaskDescription] = useState('');

    const handleEdit = () => {
        props.onEdit({ id: props.editedTask.id, title: props.editedTask.title, description: taskDescription, time: props.editedTask.time });
        props.onHide();
    };

    useEffect(() => {
        setTaskDescription(props.editedTask.description)
    }, [props])

    return (
        <div>
            <Modal show={props.open} onHide={props.onHide} dialogClassName="modal-100w" contentClassName="modal-content-100h">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} noValidate autoComplete="off" >
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={4}
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                        />
                    </Box>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleEdit}>Update</Button>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditModal;
