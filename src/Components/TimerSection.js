import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ModalFormSection from './ModalFormSection';
import TaskSection from './TaskSection';
import { Button } from '@mui/material';
import './style.css'

const TimerSection = () => {
    const [time, setTime] = useState(0);
    const [timerState, setTimerState] = useState('idle');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let interval;
        if (timerState === 'started') {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [timerState]);

    const startTimer = () => {
        setTimerState('started');
    };

    const pauseTimer = () => {
        setTimerState('paused');
    };

    const saveTask = () => {
        setIsModalOpen(true);
        setTimerState('idle');
    };

    const closeModal = () => {
        setTime(0)
        setIsModalOpen(false);
        setTaskTitle('');
        setTaskDescription('');
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <>
            <div className='container heroSectionStyle'>
                <div >
                    <h1>{formatTime(time)}</h1>
                    <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '50%' }, }} noValidate autoComplete="off" >
                        <TextField
                            id="outlined"
                            label="Title"
                            variant="outlined"
                            disabled={timerState !== 'started'}
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                        />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={4}
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            disabled={timerState !== 'started'}
                        />
                    </Box>
                    <div>
                        <Button onClick={startTimer} disabled={timerState === 'started'} variant="contained" className='startBtn'>
                            Start
                        </Button>
                        <Button onClick={pauseTimer} className='pouseBtn' disabled={timerState !== 'started'} variant="contained" >
                            Pause
                        </Button>
                        <Button
                            variant="contained"
                            className='savebtn'
                            onClick={saveTask}
                            disabled={timerState === 'idle' || !taskTitle}>
                            Save
                        </Button>
                    </div>
                    {
                        isModalOpen &&
                        <ModalFormSection open={isModalOpen} onHide={closeModal} task={{ id: Date.now(), title: taskTitle, description: taskDescription, time: new Date(time * 1000).toISOString().substr(11, 8) }} />
                    }
                </div >
            </div>
            <div className='container'>
                <TaskSection />
            </div>
        </>
    );
};

export default TimerSection;