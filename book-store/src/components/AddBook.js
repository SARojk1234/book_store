import { FormLabel, TextField, Box, Button, FormControlLabel, Checkbox } from '@mui/material'
import React, {useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom'

const AddBook = () => {
  const history = useNavigate();
  const [Inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    author: '',
    image: ''

  })
  const [checked, setChecked] = useState(false);
  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value

    }))

  }
  const sendRequest = async()=>{
    await axios.post("http://localhost:5000/books",{
      name:String(Inputs.name),
      author: String(Inputs.author),
      description:String(Inputs.description),
      price: Number(Inputs.price),
      image: String(Inputs.image),
      available: Boolean(checked)

    }).then(res=>res.data);
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    sendRequest().then(()=>history('/books'))
  }

  return (
  <form onSubmit={handleSubmit}>
    <Box display="flex" flexDirection="column" justifyContent={'center'} maxWidth={700}
    alignContent={"center"} alignSelf={"center"} marginLeft={"auto"} marginRight={"auto"}
    marginTop={10}>
    <FormLabel>Name</FormLabel>
    <TextField value={Inputs.name} onChange={handleChange} margin="normal" fullwidth variant="outlined" name="name" />
    <FormLabel>Author</FormLabel>
    <TextField value={Inputs.author} onChange={handleChange} margin="normal" fullwidth variant="outlined" name="author" />
    <FormLabel>Description</FormLabel>
    <TextField value={Inputs.description} onChange={handleChange}margin="normal" fullwidth variant="outlined" name="description" />
    <FormLabel>Price</FormLabel>
    <TextField value={Inputs.price} onChange={handleChange}type="number" margin="normal" fullwidth variant="outlined" name="price" />
    <FormLabel>Image</FormLabel>
    <TextField value={Inputs.image} onChange={handleChange}margin="normal" fullwidth variant="outlined" name="image" />
    <FormControlLabel control={<Checkbox Checked={checked} onChange={()=>setChecked(!checked)} />} label="Available" />
    <Button variant="contained" type="submit">Add Book</Button>
    </Box>
    
  </form>
  )
}

export default AddBook