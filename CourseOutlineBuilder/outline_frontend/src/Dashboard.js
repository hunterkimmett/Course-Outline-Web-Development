import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { TableRow, TableCell, TableContainer, TableHead, TableBody, Table } from '@material-ui/core';
import { Grid, Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import { Paper } from '@material-ui/core';
import axios from 'axios';
import { AppBar, Toolbar } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  toolbarButtons: {
    marginLeft: 'auto',
  },
})

const baseUrl = "http://localhost:8000/";

function OutlineTable(props) {

  const { outlines, itemSelected, setItemSelected } = props;

  const handleSelection = (e, index) => {
    if (itemSelected === index) {
      setItemSelected(null);
    }
    else {
      setItemSelected(index);
    }
  };

  let isSelected = (index) => itemSelected === index;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Faculty</TableCell>
            <TableCell align="left">Course Number</TableCell>
            <TableCell align="left">Term</TableCell>
            <TableCell align="left">Section</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Date Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {outlines.map((row, index) => (
            <TableRow key={index}
              onClick={(e) =>
                handleSelection(e, index)}
              hover role="checkbox"
              selected={isSelected(index)}>
              <TableCell>
                {row.faculty}
              </TableCell>
              <TableCell align="left">{row.number}</TableCell>
              <TableCell align="left">{row.term}</TableCell>
              <TableCell align="left">{row.section}</TableCell>
              <TableCell align="left">{row.description}</TableCell>
              <TableCell align="left">{row.date_created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >
    </TableContainer >
  );
}

function CreateFormDialog({ open, handleCreateClose, outlines, setOutlines }) {

  const [faculty, setFaculty] = useState("");
  const [number, setNumber] = useState("");
  const [term, setTerm] = useState("");
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");

  const postOutline = async (outline) => {
    try {
      axios.post(`${baseUrl}outlines/`, {
        faculty: outline.faculty,
        number: outline.number,
        term: outline.term,
        section: outline.section,
        description: outline.description,
        date_created: outline.date_created
      }).then(response => {
        console.log(`posted outline ${response.data.id} to backend`);
        addOutline(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const addOutline = (outline) => {
    let _outlines = [...outlines]
    _outlines.push(outline)
    setOutlines(_outlines)
  }

  const handleCreate = () => {

    console.log("handling outline creation...");

    const today = new Date();
    const day = ("0" + (today.getDate())).slice(-2);
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();
    const date = `${year}-${month}-${day}`;

    const outline_fields = { faculty: faculty, number: number, term: term, section: section, description: description, date_created: date }

    console.log("creating outline...")
    postOutline(outline_fields)
    handleCreateClose()

  }

  return (
    <Dialog open={open}>
      <DialogTitle>
        Create New Outline
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid container>
            <Grid item xs>
              <TextField label='Faculty' onChange={e => setFaculty(e.target.value)} />
            </Grid>
            <Grid item xs>
              <TextField label='Number' onChange={e => setNumber(e.target.value)} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <TextField label='Term' onChange={e => setTerm(e.target.value)} />
            </Grid>
            <Grid item xs>
              <TextField label='Section' onChange={e => setSection(e.target.value)} />
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <TextField label='Description' fullWidth onChange={e => setDescription(e.target.value)} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function EditFormDialog({ open, handleEditClose, outlines, setOutlines, itemSelected }) {

  const [faculty, setFaculty] = useState("");
  const [number, setNumber] = useState("");
  const [term, setTerm] = useState("");
  const [section, setSection] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (outlines[itemSelected] != null) {
      setFaculty(outlines[itemSelected].faculty)
      setNumber(outlines[itemSelected].number)
      setTerm(outlines[itemSelected].term)
      setSection(outlines[itemSelected].section)
      setDescription(outlines[itemSelected].description)
    }
  }, [open])

  const putOutline = async () => {
    try {
      console.log("entering edit block")
      axios.put(`${baseUrl}outlines/${outlines[itemSelected].id}/`, {
        faculty: faculty,
        number: number,
        term: term,
        section: section,
        description: description,
        date_created: outlines[itemSelected].date_created
      }).then(response => {
        console.log(`put outline ${response.data.id} to backend`);
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfirm = () => {
    console.log("handling outline editing...");
    putOutline();
    let arr = [...outlines]
    arr[itemSelected] = {
      id: outlines[itemSelected].id,
      faculty: faculty,
      number: number,
      term: term,
      section: section,
      description: description,
      date_created: outlines[itemSelected].date_created
    }
    setOutlines(arr);
    handleEditClose();
  }

  return (
    <Dialog open={open}>
      <DialogTitle>
        Edit Outline
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid container>
            <Grid item xs>
              <TextField label='Faculty' onChange={e => setFaculty(e.target.value)}
                value={faculty} />
            </Grid>
            <Grid item xs>
              <TextField label='Number' onChange={e => setNumber(e.target.value)}
                value={number} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs>
              <TextField label='Term' onChange={e => setTerm(e.target.value)}
                value={term} />
            </Grid>
            <Grid item xs>
              <TextField label='Section' onChange={e => setSection(e.target.value)}
                value={section} />
            </Grid>
          </Grid>
        </Grid>
        <Box>
          <TextField label='Description' fullWidth onChange={e => setDescription(e.target.value)}
            defaultValue={description} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditClose} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function MenuBar(props) {

  const { handleCreateOpen, handleOpen, handleDelete, handleEdit } = props

  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar>
        <Box paddingLeft={2}>
          <h1>
            Course Outline Builder
        </h1>
        </Box>
        <Box paddingRight={5} className={classes.toolbarButtons}>
          <ButtonGroup variant="contained" color="secondary" aria-label="outlined primary button group">
            <Button onClick={handleCreateOpen}>Create </Button>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleOpen}>Open </Button>
            <Button onClick={handleDelete}>Delete</Button>

          </ButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

function Dashboard() {

  const createOutline = (id, faculty, number, term, section, description) => {
    return { id, faculty, number, term, section, description }
  }

  const [outlines, setOutlines] = useState([])
  const [open, setCreateOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState();
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    console.log('loading outlines from backend...')
    getOutlines();

  }, [])

  useEffect(() => {
    console.log(itemSelected)
    console.log(outlines[itemSelected])
  }, [itemSelected])

  const getOutlines = async () => {
    try {
      axios.get(`${baseUrl}outlines/`)
        .then((response) => setOutlines(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  const deleteOutline = async (id) => {
    try {
      axios.delete(`${baseUrl}outlines/${id}/`)
      console.log(`deleted outline ${id} from backend`)
    } catch (error) {
      console.error(error);
    }
  }
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => setCreateOpen(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleDelete = () => {
    if (itemSelected >= 0 && itemSelected < outlines.length) {
      deleteOutline(outlines[itemSelected].id)
      let _outlines = [...outlines];
      _outlines.splice(itemSelected, 1);
      setOutlines(_outlines);
    }
  }

  const handleOpen = () => {
    if (itemSelected >= 0 && itemSelected < outlines.length && outlines[itemSelected] != null) {
      const outlineID = outlines[itemSelected].id
      console.log(`opening outline ${outlineID} ...`)
      goToOutline(outlineID)
    } 
  }

  const handleEdit = () => {
    if (itemSelected >= 0 && itemSelected < outlines.length && outlines[itemSelected] != null) {
      const outlineID = outlines[itemSelected].id
      console.log(`editing outline ${outlineID} ...`)
      handleEditOpen()
    } 
  }

  const history = useHistory();

  const goToOutline = (id) => {
    //pushes data to Outline component on click
    history.push('/outline', { outlineID: id })
  }

  return (
    <div className="Dashboard">

      <MenuBar handleCreateOpen={handleCreateOpen} handleOpen={handleOpen} handleDelete={handleDelete} handleEdit={handleEdit} />
      <Box paddingTop={20}>
        <OutlineTable outlines={outlines} itemSelected={itemSelected} setItemSelected={setItemSelected} />
      </Box>
      <CreateFormDialog open={open} handleCreateClose={handleCreateClose} goToOutline={goToOutline} outlines={outlines} setOutlines={setOutlines} />
      <EditFormDialog open={editOpen} handleEditClose={handleEditClose} goToOutline={goToOutline} outlines={outlines} setOutlines={setOutlines} itemSelected={itemSelected} />

    </div >

  );
}

export default Dashboard;
