import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import EditIcon from '@mui/icons-material/Edit';
import './style.css'
import EditModal from './EditModal';


function TaskSection(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editedTask, setEditedTask] = useState(null);
    const [editState, seteditState] = useState(false)

    let getTaskData = JSON.parse(localStorage.getItem('TaskList')) && JSON.parse(localStorage.getItem('TaskList'))
    const openModal = (list) => {
        setEditedTask(list);
        setIsModalOpen(true);
        seteditState(true)
    };

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const handleEdit = (editedItem) => {
        const storedList = JSON.parse(localStorage.getItem('TaskList')) || [];
        const updatedList = storedList.map((item) => {
            if (item.id === editedItem.id) {
                return { ...item, title: editedItem.title, description: editedItem.description };
            }
            return item;
        });

        localStorage.setItem('TaskList', JSON.stringify(updatedList));
    };



    return (
        <div className='taskStyle'>
            <h4>Task List</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Timer</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getTaskData.map((list, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{list.title}</td>
                                    <td>{list.description}</td>
                                    <td>{list.time}</td>
                                    <td><EditIcon style={{color:"green"}} onClick={() => openModal(list)} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            {
                editState &&
                <EditModal
                    open={isModalOpen}
                    onHide={closeModal}
                    editedTask={editedTask}
                    onEdit={handleEdit}
                />
            }
        </div>
    )
}

export default TaskSection
