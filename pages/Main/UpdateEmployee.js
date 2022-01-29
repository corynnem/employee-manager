import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Edit } from '@material-ui/icons';

const UpdateEmployee = ({ employee, setEmployees }) => {
    const [open, setOpen] = useState(false)
    const [firstName, setFirstName] = useState(employee.firstName)
    const [lastName, setLastName] = useState(employee.lastName)
    const [email, setEmail] = useState(employee.email)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let employeesInStorage = JSON.parse(localStorage.getItem('employees'))
        let newEmployees = employeesInStorage.filter((_, i) => {
            return i !== employee.index
        })
        newEmployees.push({ firstName: firstName, lastName: lastName, email: email })
        localStorage.setItem('employees', JSON.stringify(newEmployees))
        setEmployees(newEmployees)
        setOpen(false);
    }


    return (
        <div id='update'>

            <Edit onClick={handleClickOpen} />

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Employee</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={firstName}
                        type="name"
                        fullWidth
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={lastName}
                        type="name"
                        fullWidth
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label={email}
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

        </div>
    )
}
export default UpdateEmployee