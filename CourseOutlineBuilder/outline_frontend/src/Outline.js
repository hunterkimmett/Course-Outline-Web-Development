import React from 'react';
import { useState, useEffect } from "react";
import { ButtonGroup } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid'
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default Outline;


const useStyles = makeStyles((theme) => ({
    background: {
        color: 'primary'
    },
    toolbarButtons: {
        marginLeft: 'auto',
    }

}));

const baseUrl = 'http://localhost:8000/';

function Outline() {

    const classes = useStyles;

    // Getting the outlint rest Url.
    const location = useLocation();
    const [outlineID, setOutlineID] = useState(location.state.outlineID);
    const [outline, setOutline] = useState({});

    const getOutline = async () => {
        try {
            axios.get(`${baseUrl}outlines/${outlineID}/`)
                .then((response) => setOutline(response.data));

        } catch (error) {
            console.error(error);
        }
    };

    // Initial render use effect
    useEffect(() => {
        console.log(`outline ${outlineID} has been opened...`);
        console.log('loading outline from backend...');
        getOutline();
    }, [])

    // Save states
    const handleSaveOpen = () => setSave(true);
    const handleSaveClose = () => setSave(false);
    const [save, setSave] = useState(false);

    const handleSave = () => {
        console.log('saving...');
        handleSaveOpen()
    };

    return (

        <div className="Outline">
            <MenuBar handleSaveOpen={handleSaveOpen} handleSave={handleSave} />
            <Grid container justify='center' align='center'>
                <Box alignItems='center' justifyContent='center' width={0.95}>
                    <Box component={Paper} align='left'>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h1>
                            {`${outline.faculty} ${outline.number} `}
                            <br />
                            {`${outline.description}`}
                        </h1>
                        <h2>
                            {`${outline.term}`}
                        </h2>
                        <h2>
                            {`Section: ${outline.section}`}
                        </h2>
                        <br></br>

                        <Box border={2} align='center' width={1}>
                            <CalendarInfo outlineID={outlineID} save={save} />
                        </Box>
                        <br></br>
                        <br></br>

                        <Box border={2} align='center'>
                            <LearningOutcomes save={save} outlineID={outlineID} />
                        </Box>
                        <br></br>
                        <br></br>

                        <Box border={2} align='center'>
                            <Timetable save={save} outlineID={outlineID} />
                        </Box>
                        <br></br>
                        <br></br>

                        <Box border={2} align='center'>
                            <CourseInstructors save={save} outlineID={outlineID} />
                        </Box>
                        <br></br>
                        <br></br>

                        <Box border={2} align='center'>
                            <Examinations save={save} outlineID={outlineID} />
                        </Box>
                        <br></br>
                        <br></br>

                        <Box border={2} align='center'>
                            <UseOfCalculators save={save} outlineID={outlineID} />
                        </Box>
                        <br></br>
                        <br></br>

                        <Box border={2} align='center'>
                            <FinalGradeDetermination save={save} outlineID={outlineID} />
                        </Box>
                        <br></br>
                        <br></br>

                        <Box border={2} align='center'>
                            <Textbook save={save} outlineID={outlineID} />
                        </Box>
                        <br></br>
                        <br></br>

                        <Box border={2} align='center'>
                            <CoursePolicies save={save} outlineID={outlineID} />
                        </Box>
                        <br></br>
                        <br></br>

                        <CreateSaveDialog open={save} handleSaveClose={handleSaveClose} />
                    </Box>
                </Box>
            </Grid>
        </div >
    );
}


function CalendarInfo(props) {

    const createCalendarInfo = (id, description, hours, credit, calendar_reference, outline) => {
        return { id, description, hours, credit, calendar_reference, outline }
    }

    const { outlineID, save } = props
    const [calendarInfo, setCalendarInfo] = useState(createCalendarInfo(null, "", "", "", "", outlineID));

    const [courseDesc, setCourseDesc] = useState(calendarInfo.description);
    const [courseHours, setCourseHours] = useState(calendarInfo.hours);
    const [courseCredits, setCourseCredits] = useState(calendarInfo.credit);
    const [calendarRef, setCalendarRef] = useState(calendarInfo.calendar_reference);

    const getCalendarInformation = async () => {
        try {
            axios.get(`${baseUrl}calendarinformation/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('calendar data found');
                        setCalendarInfo(response.data[0]);
                    } else {
                        console.log('no calendar data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const saveCalendarInfo = async () => {
        if (calendarInfo.id == null) {
            try {
                console.log('posting calendar info')
                axios.post(`${baseUrl}calendarinformation/`, {
                    description: calendarInfo.description,
                    hours: calendarInfo.hours,
                    credit: calendarInfo.credit,
                    calendar_reference: calendarInfo.calendar_reference,
                    outline: outlineID
                }
                ).then((response) => {
                    setCalendarInfo(response.data);
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                console.log('putting calendar info')
                axios.put(`${baseUrl}calendarinformation/${calendarInfo.id}/`, {
                    description: calendarInfo.description,
                    hours: calendarInfo.hours,
                    credit: calendarInfo.credit,
                    calendar_reference: calendarInfo.calendar_reference,
                    outline: outlineID
                }
                ).then((response) => {
                    setCalendarInfo(response.data);
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (save == true) {
            saveCalendarInfo();
        }
    }, [save])

    useEffect(() => {
        setCalendarInfo(createCalendarInfo(
            calendarInfo.id, courseDesc, calendarInfo.hours,
            calendarInfo.credits, calendarInfo.calendar_reference, outlineID))
    }, [courseDesc])

    useEffect(() => {
        setCalendarInfo(createCalendarInfo(
            calendarInfo.id, calendarInfo.description, courseHours,
            calendarInfo.credits, calendarInfo.calendar_reference, outlineID))
    }, [courseHours])

    useEffect(() => {
        setCalendarInfo(createCalendarInfo(
            calendarInfo.id, calendarInfo.description, calendarInfo.hours,
            courseCredits, calendarInfo.calendar_reference, outlineID))
    }, [courseCredits])

    useEffect(() => {
        setCalendarInfo(createCalendarInfo(
            calendarInfo.id, calendarInfo.description, calendarInfo.hours,
            calendarInfo.credit, calendarRef, outlineID))
    }, [calendarRef])

    useEffect(() => {
        getCalendarInformation();
    }, [])

    return (
        <Box width="95%" align='left'>
            <h2>
                1. Calendar Information
            </h2>
            <h3>
                Course Description
            </h3>
            <TextField
                multiline={true}
                rows={12}
                rowsMax={12}
                fullWidth={true}
                value={calendarInfo.description}
                placeholder="Enter Course Description"
                onChange={(e) => setCourseDesc(e.target.value)}
            />
            <h3>
                Course Hours
                </h3>

            <TextField
                multiline={true}
                value={calendarInfo.hours}
                placeholder="Enter Course Hours"
                onChange={(e) => setCourseHours(e.target.value)}
            />

            <h3>
                Academic Credit
                </h3>
            <TextField
                multiline={true}
                value={calendarInfo.credit}
                placeholder="Enter Number of Credits"
                onChange={(e) => setCourseCredits(e.target.value)}
            />
            <h3>
                Calendar Reference
                </h3>
            <TextField
                multiline={true}
                fullWidth={true}
                value={calendarInfo.calendar_reference}
                placeholder="Enter Calendar Reference URL"
                onChange={(e) => setCalendarRef(e.target.value)}
                border={1}
            />

            <br></br>
            <br></br>
        </Box>
    );
};

function LearningOutcomes(props) {

    const { save, outlineID } = props

    const createLearningOutcome = (id, number, outcome, attribute, level, outline) => {
        return { id, number, outcome, attribute, level, outline }
    }

    const [learningOutcomes, setLearningOutcomes] = useState([createLearningOutcome(null, "0", "", "", "", outlineID)]);

    const [postReady, setPostReady] = useState(false)

    const getLearningOutcomes = async () => {
        try {
            axios.get(`${baseUrl}learningoutcomes/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('learning outcome data found');
                        setLearningOutcomes(response.data);
                    } else {
                        console.log('no learning outcome data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const manageLearningOutcomes = async () => {

        try {
            axios.get(`${baseUrl}learningoutcomes/?outline=${outlineID}`)
                .then((response) => {
                    response.data.map((record) => {
                    axios.delete(`${baseUrl}learningoutcomes/${record.id}/`);
                    })
                })
                .then(() => {
                    learningOutcomes.map((row) => {
                        axios.post(`${baseUrl}learningoutcomes/`, {
                            number: row.number,
                            outcome: row.outcome,
                            attribute: row.attribute,
                            level: row.level,
                            outline: outlineID
                        }
                        )
                    })
                }).then(() => console.log('updated learning outcomes in backend'))

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (save == true) {
            manageLearningOutcomes()
        }
    }, [save])

    useEffect(() => {
        getLearningOutcomes();
    }, [])


    const setValue = (index, column, value) => {

        let newRows = [...learningOutcomes]
        newRows[index][column] = value;
        setLearningOutcomes(newRows);
    };

    const deleteRow = (index) => {
        let arr = [...learningOutcomes]
        arr.splice(index, 1)
        setLearningOutcomes(arr)
    };

    const addRow = () => {
        let arr = [...learningOutcomes]
        arr = arr.concat(createLearningOutcome(null, (arr.length - 1), "", "", "", outlineID))
        setLearningOutcomes(arr)
    };

    const [editIdx, setEditIdx] = useState(-1);
    const startEdit = idx => {
        setEditIdx(idx);
    };
    const stopEdit = () => {
        setEditIdx(-1);
    };

    return (
        <Box Box width="95%" align='left'>
            <h2>
                2. Learning Outcomes
            </h2>
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Learning Outcome</TableCell>
                                <TableCell>Grade Attribute</TableCell>
                                <TableCell>Instruction Level</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {learningOutcomes.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell align="left">
                                        {index + "  "}
                                    </TableCell>
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.outcome}
                                                onChange={(e) => setValue(index, 'outcome', e.target.value)} placeholder='Enter Learning Outcome' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.outcome}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <Select
                                                defaultValue={row.attribute}
                                                onChange={(e) => setValue(index, 'attribute', e.target.value)} >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={"A1"}>A1</MenuItem>
                                                <MenuItem value={"A2"}>A2</MenuItem>
                                                <MenuItem value={"A3"}>A3</MenuItem>
                                                <MenuItem value={"A4"}>A4</MenuItem>
                                                <MenuItem value={"A5"}>A5</MenuItem>
                                                <MenuItem value={"A6"}>A6</MenuItem>
                                                <MenuItem value={"A7"}>A7</MenuItem>
                                                <MenuItem value={"A8"}>A8</MenuItem>
                                                <MenuItem value={"A9"}>A9</MenuItem>
                                                <MenuItem value={"A10"}>A10</MenuItem>
                                                <MenuItem value={"A11"}>A11</MenuItem>
                                                <MenuItem value={"A12"}>A12</MenuItem>
                                            </Select>
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.attribute}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <Select
                                                defaultValue={row.level}
                                                onChange={(e) => setValue(index, 'level', e.target.value)} >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={"I"}>I</MenuItem>
                                                <MenuItem value={"D"}>D</MenuItem>
                                                <MenuItem value={"A"}>A</MenuItem>
                                            </Select>
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.level}
                                        </TableCell>)}
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <EditIcon onClick={() => startEdit(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CheckIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <DeleteIcon onClick={(e) => deleteRow(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CloseIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <div>
                    <Button onClick={addRow} variant='contained' color='primary'>
                        Create Row
                            </Button>
                </div>
            </div>
            <br></br>
            <br></br>
        </Box>
    );
};

function Timetable(props) {

    const { save, outlineID } = props

    const createTimetable = (id, section, days, time, location, outline) => {
        return { id, section, days, time, location, outline }
    }

    const [timetables, setTimetables] = useState([createTimetable(null, "", "", "", "", outlineID)]);

    const getTimetables = async () => {
        try {
            axios.get(`${baseUrl}timetables/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('timetable data found');
                        setTimetables(response.data);
                    } else {
                        console.log('no timetable data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const manageTimetables = async () => {

        try {
            axios.get(`${baseUrl}timetables/?outline=${outlineID}`)
                .then((response) => {
                    response.data.map((record) => {
                    axios.delete(`${baseUrl}timetables/${record.id}/`);
                    })
                })
                .then(() => {
                    timetables.map((row) => {
                        axios.post(`${baseUrl}timetables/`, {
                            section: row.section,
                            days: row.days,
                            time: row.time,
                            location: row.location,
                            outline: outlineID
                        }
                        )
                    })
                }).then(() => console.log('timetables updated in backend'))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (save == true) {
            manageTimetables()
        }
    }, [save])

    useEffect(() => {
        getTimetables();
    }, [])

    const setValue = (index, column, value) => {
        let newRows = [...timetables];
        newRows[index][column] = value;
        setTimetables(newRows);
    };

    const deleteRow = (index) => {
        let arr = [...timetables]
        arr.splice(index, 1)
        setTimetables(arr)
    };

    const addRow = () => {
        let arr = [...timetables]
        arr = arr.concat(createTimetable(null, "", "", "", "", outlineID))
        setTimetables(arr);
    };

    const [editIdx, setEditIdx] = useState(-1);
    const startEdit = idx => {
        setEditIdx(idx);
    };
    const stopEdit = () => {
        setEditIdx(-1);
    };

    return (
        <Box Box width="95%" align='left'>
            <h2>
                3. Timetable
            </h2>

            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Section</TableCell>
                                <TableCell>Day(s) of Week</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {timetables.map((row, index) => (
                                <TableRow key={index}>
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.section}
                                                onChange={(e) => setValue(index, 'section', e.target.value)} placeholder='Enter Section' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.section}
                                        </TableCell>)}

                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.days}
                                                onChange={(e) => setValue(index, 'days', e.target.value)} placeholder='Enter Day(s) of Week' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.days}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.time}
                                                onChange={(e) => setValue(index, 'time', e.target.value)} placeholder='Enter Time' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.time}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.location}
                                                onChange={(e) => setValue(index, 'location', e.target.value)} placeholder='Enter Location' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.location}
                                        </TableCell>)}
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <EditIcon onClick={() => startEdit(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CheckIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <DeleteIcon onClick={(e) => deleteRow(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CloseIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <br />

                <div>
                    <Button onClick={addRow} variant='contained' color='primary'>
                        Create Row
                            </Button>
                </div>
            </div>

            <br></br>
            <br></br>
        </Box>
    );
};

function CourseInstructors(props) {

    const { save, outlineID } = props

    const createInstructor = (id, section, first_name, last_name, phone, office, email, outline) => {
        return { id, section, first_name, last_name, phone, office, email, outline }
    }

    const [instructors, setInstructors] = useState([createInstructor(null, "", "", "", "", "", "", outlineID)]);


    const getInstructors = async () => {
        try {
            axios.get(`${baseUrl}instructors/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('instructor data found');
                        setInstructors(response.data);
                    } else {
                        console.log('no instructor data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const manageInstructors = async () => {

        try {
            axios.get(`${baseUrl}instructors/?outline=${outlineID}`)
                .then((response) => {
                    response.data.map((record) => {
                    axios.delete(`${baseUrl}instructors/${record.id}/`);
                    })
                })
                .then(() => {
                    instructors.map((row) => {
                        axios.post(`${baseUrl}instructors/`, {
                            section: row.section,
                            first_name: row.first_name,
                            last_name: row.last_name,
                            phone: row.phone,
                            office: row.office,
                            email: row.email,
                            outline: outlineID
                        }
                        )
                    })
                }).then(() => console.log('instructors updated in backend'))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (save == true) {
            manageInstructors()
        }
    }, [save])

    

    useEffect(() => {
        getInstructors();
    }, [])


    const setValue = (index, column, value) => {
        let newRows = [...instructors];
        newRows[index][column] = value;
        setInstructors(newRows);
    };

    const deleteRow = (index) => {
        let arr = [...instructors];
        arr.splice(index, 1);
        setInstructors(arr);
    };

    const addRow = () => {
        let arr = [...instructors]
        arr = arr.concat(createInstructor(null, "", "", "", "", "", "", outlineID))
        setInstructors(arr);
    };

    const [editIdx, setEditIdx] = useState(-1);
    const startEdit = idx => {
        setEditIdx(idx);
    };
    const stopEdit = () => {
        setEditIdx(-1);
    };

    return (
        <Box Box width="95%" align='left'>
            <h2>
                4. Course Instructors
            </h2>

            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Section</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Office</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {instructors.map((row, index) => (
                                <TableRow key={index}>
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.section}
                                                onChange={(e) => setValue(index, 'section', e.target.value)} placeholder='Enter Section' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.section}
                                        </TableCell>)}

                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.first_name}
                                                onChange={(e) => setValue(index, 'first_name', e.target.value)} placeholder='Enter First Name' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.first_name}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.last_name}
                                                onChange={(e) => setValue(index, 'last_name', e.target.value)} placeholder='Enter Family Name' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.last_name}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.phone}
                                                onChange={(e) => setValue(index, 'phone', e.target.value)} placeholder='Enter Phone' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.phone}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.office}
                                                onChange={(e) => setValue(index, 'office', e.target.value)} placeholder='Enter Office' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.office}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.email}
                                                onChange={(e) => setValue(index, 'email', e.target.value)} placeholder='Enter Email' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.email}
                                        </TableCell>)}
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <EditIcon onClick={() => startEdit(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CheckIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <DeleteIcon onClick={(e) => deleteRow(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CloseIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <br />

                <div>
                    <Button onClick={addRow} variant='contained' color='primary'>
                        Create Row
                            </Button>
                </div>
            </div>

            <br></br>
            <br></br>
        </Box>
    );
};


function Examinations(props) {

    const { save, outlineID } = props

    const createExamination = (id, text, outline) => {
        return { id, text, outline }
    }

    const [examinations, setExaminations] = useState(createExamination(null, "", outlineID));

    const [examInfo, setExamInfo] = useState(examinations.text);

    const getExaminations = async () => {
        try {
            axios.get(`${baseUrl}examinations/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('examination data found');
                        setExaminations(response.data[0]);
                    } else {
                        console.log('no examination data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const saveExaminations = async () => {
        if (examinations.id == null) {
            try {
                console.log('posting examinations')
                axios.post(`${baseUrl}examinations/`, {
                    text: examinations.text,
                    outline: outlineID
                }
                ).then((response) => {
                    setExaminations(response.data);
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                console.log('putting examinations')
                axios.put(`${baseUrl}examinations/${examinations.id}/`, {
                    text: examinations.text,
                    outline: outlineID
                }
                ).then((response) => {
                    setExaminations(response.data);
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        if (save == true) {
            saveExaminations();
        }
    }, [save])

    useEffect(() => {
        getExaminations();
    }, [])

    useEffect(() => {
        setExaminations(createExamination(examinations.id, examInfo, examinations.outline));
    }, [examInfo])

    return (
        <Box Box width="95%" align='left'>
            <h2>
                5. Examinations
                </h2>
            <h3>
                Examination Information
                </h3>
            <TextField
                multiline={true}
                rows={12}
                rowsMax={12}
                fullWidth={true}
                value={examinations.text}
                placeholder="Enter Examination Information"
                onChange={(e) => setExamInfo(e.target.value)}
            />
            <br></br>
            <br></br>
        </Box>
    );

};

function UseOfCalculators(props) {

    const { save, outlineID } = props;

    const createCalculator = (id, text, outline) => {
        return { id, text, outline }
    }

    const [calculators, setCalculators] = useState(createCalculator(null, "", outlineID));

    const [calculatorsInfo, setCalculatorsInfo] = useState(calculators.text);

    const getCalculators = async () => {
        try {
            axios.get(`${baseUrl}calculators/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('calculators data found');
                        setCalculators(response.data[0]);
                    } else {
                        console.log('no calculators data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const saveCalculators = async () => {
        if (calculators.id == null) {
            try {
                console.log('posting calculators')
                axios.post(`${baseUrl}calculators/`, {
                    text: calculators.text,
                    outline: outlineID
                }
                ).then((response) => {
                    setCalculators(response.data);
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                console.log('putting calculators')
                axios.put(`${baseUrl}calculators/${calculators.id}/`, {
                    text: calculators.text,
                    outline: outlineID
                }
                ).then((response) => {
                    setCalculators(response.data);
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        setCalculators(createCalculator(calculators.id, calculatorsInfo, calculators.outline));
    }, [calculatorsInfo])

    useEffect(() => {
        getCalculators();
    }, [])

    useEffect(() => {
        if (save == true) {
            saveCalculators();
        }
    }, [save])

    return (
        <Box width="95%" align='left'>
            <h2>
                6. Use Of Calculators in Examinations
        </h2>

            <TextField

                fullWidth={true}
                placeholder="Enter Calculator Policy"
                value={calculators.text}
                onChange={(e) => setCalculatorsInfo(e.target.value)}
                border={1}
            />

            <br></br>
            <br></br>
        </Box>
    );
};

function FinalGradeDetermination(props) {

    const { save, outlineID } = props

    const createGradeComponent = (id, component, outcomes, weight, outline) => {
        return { id, component, outcomes, weight, outline }
    }

    const [gradeComponents, setGradeComponents] = useState([createGradeComponent(null, "", outlineID)]);

    const getGradeComponents = async () => {
        try {
            axios.get(`${baseUrl}finalgradecomponents/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('final grade component data found');
                        setGradeComponents(response.data);
                    } else {
                        console.log('no final grade component data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const [sum, setSum] = useState(0);

    const setValue = (index, column, value) => {
        let newRows = [...gradeComponents];
        newRows[index][column] = value;
        setGradeComponents(newRows);
        updateSum();
    };

    const deleteRow = (index) => {
        let arr = [...gradeComponents]
        arr.splice(index, 1)
        setGradeComponents(arr)
        let total = 0;
        updateSum();
    };

    const addRow = () => {
        let arr = [...gradeComponents]
        arr = arr.concat([createGradeComponent(null, "", "", "", outlineID)])
        setGradeComponents(arr);
    };

    const updateSum = () => {
        let total = 0;
        for (let i = 0; i < gradeComponents.length; i++) {
            let n = parseInt(gradeComponents[i]["weight"])
            Number.isInteger(n) ?
                (total += n) :
                (total += 0)

        };
        setSum(total);
    };
    const [editIdx, setEditIdx] = useState(-1);
    const startEdit = idx => {
        setEditIdx(idx);
    };
    const stopEdit = () => {
        setEditIdx(-1);
    };

    const manageGradeComponents = async () => {

        try {
            axios.get(`${baseUrl}finalgradecomponents/?outline=${outlineID}`)
                .then((response) => {
                    response.data.map((record) => {
                    axios.delete(`${baseUrl}finalgradecomponents/${record.id}/`);
                    })
                })
                .then(() => {
                    gradeComponents.map((row) => {
                        axios.post(`${baseUrl}finalgradecomponents/`, {
                            component: row.component,
                            outcomes: row.outcomes,
                            weight: row.weight,
                            outline: outlineID
                        }
                        )
                    })
                }).then(() => console.log('final grade components updated in backend'))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (save == true) {
            manageGradeComponents();
        }
    }, [save])

    useEffect(() => {
        getGradeComponents();
    }, [])

    useEffect(() => {
        updateSum();
    }, [gradeComponents])


    return (
        <Box Box width="95%" align='left'>
            <h2>
                7. Final Grade Determination
            </h2>

            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Component</TableCell>
                                <TableCell>Learning Outcomes Evaluated</TableCell>
                                <TableCell>Weight</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {gradeComponents.map((row, index) => (
                                <TableRow key={index}>
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.component}
                                                onChange={(e) => setValue(index, 'component', e.target.value)} placeholder='Enter Component' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.component}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.outcome}
                                                onChange={(e) => setValue(index, 'outcome', e.target.value)} placeholder='Enter Outcomes' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.outcome}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.weight}
                                                onChange={(e) => setValue(index, 'weight', e.target.value)} placeholder='Enter Weight' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.weight}
                                        </TableCell>)}
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <EditIcon onClick={() => startEdit(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CheckIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <DeleteIcon onClick={(e) => deleteRow(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CloseIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell align="left"></TableCell>
                                <TableCell align="right">Total Weight:</TableCell>
                                <TableCell align="left">{sum}</TableCell>
                                <TableCell align="left"></TableCell>
                                <TableCell align="left"></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <br />

                <div>
                    <Button onClick={addRow} variant='contained' color='primary'>
                        Create Row
                            </Button>
                </div>
            </div>

            <br></br>
            <br></br>
        </Box>
    );

};

function Textbook(props) {

    const { save, outlineID } = props

    const createTextbook = (id, title, author, year, publisher, requirement, outline) => {
        return { id, title, author, year, publisher, requirement, outline }
    }

    const [textbooks, setTextbooks] = useState([createTextbook(null, "", "", "", "", "", outlineID)]);

    const getTextbooks = async () => {
        try {
            axios.get(`${baseUrl}textbooks/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('textbook data found');
                        setTextbooks(response.data);
                    } else {
                        console.log('no textbook data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const manageTextbooks = async () => {

        try {
            axios.get(`${baseUrl}textbooks/?outline=${outlineID}`)
                .then((response) => {
                    response.data.map((record) => {
                    axios.delete(`${baseUrl}textbooks/${record.id}/`);
                    })
                })
                .then(() => {
                    textbooks.map((row) => {
                        axios.post(`${baseUrl}textbooks/`, {
                            title: row.title,
                            author: row.author,
                            year: row.year,
                            publisher: row.publisher,
                            requirement: row.requirement,
                            outline: outlineID
                        }
                        )
                    })
                }).then(() => console.log('final grade components updated in backend'))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (save == true) {
            manageTextbooks();
        }
    }, [save])

    useState(() => {
        getTextbooks();
    }, [])

    const setValue = (index, column, value) => {
        let newRows = [...textbooks];
        newRows[index][column] = value;
        setTextbooks(newRows);
    };

    const deleteRow = (index) => {
        let arr = [...textbooks]
        arr.splice(index, 1)
        setTextbooks(arr)
    };
    const addRow = () => {
        let arr = [...textbooks]
        arr = arr.concat(createTextbook(null, "", "", "", "", "", outlineID))
        setTextbooks(arr);
    };
    const [editIdx, setEditIdx] = useState(-1);
    const startEdit = idx => {
        setEditIdx(idx);
    };
    const stopEdit = () => {
        setEditIdx(-1);
    };

    return (
        <Box Box width="95%" align='left'>
            <h2>
                8. Textbook
            </h2>

            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Author</TableCell>
                                <TableCell>Edition, Year</TableCell>
                                <TableCell>Publisher</TableCell>
                                <TableCell>Required/ Recommended</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {textbooks.map((row, index) => (
                                <TableRow key={index}>
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.title}
                                                onChange={(e) => setValue(index, 'title', e.target.value)} placeholder='Enter Title' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.title}
                                        </TableCell>)}

                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.author}
                                                onChange={(e) => setValue(index, 'author', e.target.value)} placeholder='Enter Author' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.author}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.year}
                                                onChange={(e) => setValue(index, 'year', e.target.value)} placeholder='Enter Edition, Year' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.year}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.publisher}
                                                onChange={(e) => setValue(index, 'publisher', e.target.value)} placeholder='Enter Publisher' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.publisher}
                                        </TableCell>)}
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <Select
                                                defaultValue={row.requirement}
                                                onChange={(e) => setValue(index, 'requirement', e.target.value)} >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={"Required"}>Required</MenuItem>
                                                <MenuItem value={"Recommended"}>Recommended</MenuItem>
                                            </Select>
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.requirement}
                                        </TableCell>)}
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <EditIcon onClick={() => startEdit(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CheckIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <DeleteIcon onClick={(e) => deleteRow(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CloseIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <br />

                <div>
                    <Button onClick={addRow} variant='contained' color='primary'>
                        Create Row
                            </Button>
                </div>
            </div>

            <br></br>
            <br></br>
        </Box>
    );
};

function CoursePolicies(props) {

    const { save, outlineID } = props

    const createPolicy = (id, policy, outline) => {
        return { id, policy, outline }
    }

    const [policies, setPolicies] = useState([createPolicy(null, "", outlineID)]);

    const getPolicies = async () => {
        try {
            axios.get(`${baseUrl}policies/?outline=${outlineID}`)
                .then((response) => {
                    if (response.data.length !== 0) {
                        console.log('policy data found');
                        setPolicies(response.data);
                    } else {
                        console.log('no policy data found');
                    }
                })
        } catch (error) {
            console.error(error);
        }
    }

    const managePolicies = async () => {

        try {
            axios.get(`${baseUrl}policies/?outline=${outlineID}`)
                .then((response) => {
                    response.data.map((record) => {
                    axios.delete(`${baseUrl}policies/${record.id}/`);
                    })
                })
                .then(() => {
                    policies.map((row) => {
                        axios.post(`${baseUrl}policies/`, {
                            policy: row.policy,
                            outline: outlineID
                        }
                        )
                    })
                }).then(() => console.log('final grade components updated in backend'))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (save == true) {
            managePolicies();
        }
    }, [save])

    useEffect(() => {
        getPolicies();
    }, [])

    const setValue = (index, column, value) => {
        let newRows = [...policies];
        newRows[index][column] = value;
        setPolicies(newRows);
    };

    const deleteRow = (index) => {
        let arr = [...policies]
        arr.splice(index, 1)
        setPolicies(arr)
    };

    const addRow = () => {
        let arr = [...policies]
        arr = arr.concat(createPolicy(null, "", outlineID))
        setPolicies(arr);
    };

    const [editIdx, setEditIdx] = useState(-1);
    const startEdit = idx => {
        setEditIdx(idx);
    };
    const stopEdit = () => {
        setEditIdx(-1);
    };

    return (
        <Box Box width="95%" align='left'>
            <h2>
                9. Course Policies
            </h2>

            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Policy</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {policies.map((row, index) => (
                                <TableRow key={index}>
                                    {editIdx === index ? (
                                        <TableCell align="left">
                                            <TextField defaultValue={row.policy}
                                                multiline={true}
                                                rows={12}
                                                rowsMax={12}
                                                fullWidth={true}
                                                onChange={(e) => setValue(index, 'policy', e.target.value)} placeholder='Enter Policy' />
                                        </TableCell>) :
                                        (<TableCell>
                                            {row.policy}
                                        </TableCell>)}
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <EditIcon onClick={() => startEdit(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CheckIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                    <TableCell>
                                        {editIdx !== index ? (
                                            <DeleteIcon onClick={(e) => deleteRow(index)} style={{ cursor: "pointer" }} />
                                        ) : (
                                                <CloseIcon onClick={stopEdit} style={{ cursor: "pointer" }} />
                                            )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <br />

                <div>
                    <Button onClick={addRow} variant='contained' color='primary'>
                        Create Row
                            </Button>
                </div>
            </div>

            <br></br>
            <br></br>
        </Box>
    );
};

function MenuBar({ handleSaveOpen, handleSave }) {

    const classes = useStyles()

    return (
        <AppBar Position='static'>
            <Toolbar>
            
                    <Box >
                        <h1>
                            Course Outline Builder
                        </h1>
                    </Box>
                    
                    <Box className={classes.toolbarButtons}>
                        <ButtonGroup variant="contained" color="secondary" aria-label="outlined primary button group" >
                            <Button variant="contained" color="secondary" onClick={handleSave} align="left">
                                Save
                            </Button>
                            <Button component={ Link } to="/" variant="contained" color="secondary" align="left">
                                Home
                            </Button>
                        </ButtonGroup>
                    </Box>

                
            </Toolbar>
        </AppBar>



    );
};

function CreateSaveDialog({ open, handleSaveClose }) {
    return (
        <Dialog open={false}>
            <DialogTitle>
                Outline Created
        </DialogTitle>
            <DialogContent>
                <Box>
                    <body>
                        This is a dummy button to demonstrate that the inputs will be recorded into a database.
            </body>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSaveClose} color="primary">
                    Cancel
                 </Button>
            </DialogActions>
        </Dialog>
    );
};