import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Fab } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        textAlign: 'center',

        '& > *': {
            marginLeft: ' 0px',
            margin: theme.spacing(1),
            width: theme.spacing(40),
            height: theme.spacing(100),
        },
    },
}));

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


function Row({ team }) {
    const [open, setOpen] = React.useState(false);
    const [employees, setEmployees] = useState([])
    const classes = useRowStyles();

    useEffect(() => {
        let storedEmployees = JSON.parse(localStorage.getItem('employees'))
        setEmployees(storedEmployees)
    }, [])

    return (
        <React.Fragment >
            <TableRow className={classes.root} >
                <TableCell  >
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {team.teamName}
                </TableCell>
                <TableCell align="right">{team.assignedProject}</TableCell>
                <TableCell align="right">{team.assignedMembers.length}</TableCell>

            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Employees
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First Name</TableCell>
                                        <TableCell>Last Name</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {employees.map((employee, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {employee.firstName}
                                            </TableCell>
                                            <TableCell>{employee.lastName}</TableCell>
                                            <TableCell align="right">{employee.email}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment>
    );
}



const Team = ({ employees }) => {
    const classes = useStyles()
    const [teams, setTeams] = useState([])
    const [open, setOpen] = useState(false)
    const [teamName, setTeamName] = useState('')
    const [assignedProject, setAssignedProject] = useState('')
    const [assignedMembers, setAssignedMembers] = useState([])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = (e) => {
        let storedTeams = JSON.parse(localStorage.getItem('teams'))
        if (storedTeams !== null && storedTeams.length > 0) {
            let newTeams = [...storedTeams, { teamName: teamName, assignedProject: assignedProject, assignedMembers: assignedMembers }]
            localStorage.setItem('teams', JSON.stringify(newTeams))
            setTeams(newTeams)
        } else {
            let newTeams = [{ teamName: teamName, assignedProject: assignedProject, assignedMembers: assignedMembers }]
            localStorage.setItem('teams', JSON.stringify(newTeams))
            console.log(newTeams)
            setTeams(newTeams)
        }
        handleClose()
    }


    useEffect(() => {
        let teamsInStorage = localStorage.getItem('teams')
        teamsInStorage !== null && teamsInStorage.length > 0 ? setTeams(JSON.parse(teamsInStorage)) : setTeams([])

    }, [])

    return (
        <TableContainer component={Paper} style={{ width: '80vw', marginTop: '8px', height: '72vh' }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Team</TableCell>
                        <TableCell align="right">Assigned Project</TableCell>
                        <TableCell align="right">Assigned Members</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((team) => (
                        <Row key={team.name} team={team} />
                    ))}
                                <br/>
                    <Fab
                        variant="extended"
                        size="medium"
                        color="primary"
                        aria-label="add"
                        style={{ position: 'fixed', marginLeft: '20px', }}
                        onClick={handleClickOpen}
                    >
                        <Add className={classes.extendedIcon} />
                        Team
                    </Fab>
                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Add Team</DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Team Name"
                                type="name"
                                fullWidth
                                onChange={(e) => setTeamName(e.target.value)}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Assigned Project"
                                type="name"
                                fullWidth
                                onChange={(e) => setAssignedProject(e.target.value)}
                            />
                            <label htmlFor="cars">Choose an employee:</label>

                            <select name="employees" id="dropdown" onChange={(e) => setAssignedMembers([...assignedMembers, e.target.value])}>
                                {
                                    employees.map((employee) => {
                                        return <option value={`${employee.firstName} ${employee.lastName}`}> {employee.firstName} {employee.lastName}</option>
                                    })
                                }
                            </select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </TableBody>
            </Table>

        </TableContainer>
    );
}

export default Team;