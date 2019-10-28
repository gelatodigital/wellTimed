import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const modalState = props.modalState
  const setModalState = props.setModalState


//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    // If no function is passed
    let copyModalState = {... modalState}
    if (modalState.func === undefined )
    {
      copyModalState.open = false
      setModalState(copyModalState);
    } else {
      // If function is passed, execute
      modalState.func()
    }
};

function handleOnlyClose () {
    let copyModalState = {... modalState}
    copyModalState.open = false
    setModalState(copyModalState);
}



  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={modalState.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{modalState.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {modalState.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnlyClose} color="primary">
            {modalState.btn1}
          </Button>
          <Button onClick={handleClose} color="primary">
          {modalState.btn2}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}