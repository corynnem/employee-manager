import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import UpdateEmployee from './UpdateEmployee';
import DeleteEmployee from './DeleteEmployee';



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

const Employee = ({employees, setEmployees}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    // console.log(JSON.parse(storedEmployees))
    const handleSubmit = (e) => {
        let storedEmployees = JSON.parse(localStorage.getItem('employees'))
        console.log(storedEmployees)
        if(storedEmployees !== null && storedEmployees.length > 0 ) {
            let allEmployees = [...storedEmployees, {firstName: firstName, lastName: lastName, email: email}]
            localStorage.setItem('employees', JSON.stringify(allEmployees))
            setEmployees(allEmployees)
        } else {
            let allEmployees = [{firstName: firstName, lastName: lastName, email: email}]
            localStorage.setItem('employees', JSON.stringify(allEmployees))
            setEmployees(allEmployees)
        }
        handleClose() 
    }

    useEffect(() => {
        let employeesInStorage = localStorage.getItem('employees')
        employeesInStorage !== null && employeesInStorage.length > 0 ? setEmployees(JSON.parse(employeesInStorage)) : setEmployees([])
  
    }, [])

    return (
        <div className={classes.root}>
            <Paper elevation={3} >
                <h1>Employees</h1>
                {
                    employees.map((employee, index) => {
                        return <div key={index}>
                            <ListItem button>
                                <ListItemText primary={`${employee.firstName} ${employee.lastName}`}  secondary={employee.email}/>
                                <UpdateEmployee employee={{index: index, firstName: employee.firstName, lastName: employee.lastName, email: employee.email}} setEmployees={setEmployees}/>
                                <DeleteEmployee employee={{index: index, firstName: employee.firstName, lastName: employee.lastName, email: employee.email}} setEmployees={setEmployees}/>
                            </ListItem>
                            <Divider />
                        </div>
                    }) 
                }


                <br/>
                <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    className={classes.margin}
                    style={{ position: 'fixed', left: '60px' }}
                    onClick={handleClickOpen}
                >
                    <AddIcon className={classes.extendedIcon} />
                    Employee
                </Fab>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            First Name
                        </DialogContentText> */}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="First Name"
                            type="name"
                            fullWidth
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Last Name"
                            type="name"
                            fullWidth
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            // autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
            </Paper>
        </div>
    )
}

export default Employee