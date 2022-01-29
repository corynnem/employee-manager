import React, { useEffect, useState }  from 'react'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Delete } from '@material-ui/icons';

const DeleteEmployee= ({ employee }) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        let employeesInStorage = JSON.parse(localStorage.getItem('employees'))
        let newEmployees =  employeesInStorage.filter((_, i) => {
            return i !== employee.index 
        })
       localStorage.setItem('employees', JSON.stringify(newEmployees))
        window.location.reload()
    }

 
    return (
        <div id='delete'>
            
                    <Delete  onClick={handleClickOpen}/>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Are you sure you want to delete this employee?</DialogTitle>
                    <DialogContent>
                      
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}
export default DeleteEmployee;