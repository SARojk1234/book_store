import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Checkbox, FormControlLabel, FormLabel, TextField } from '@mui/material';

const BookDetail = () => {
  const [Inputs, setInputs] = useState({});
    const id = useParams().id;
    const [checked, setChecked] = useState(false);
    const history = useNavigate();
    useEffect(()=>{ 
        const fetchHandler = async() =>{
            await axios.get(`http://localhost:5000/books/${id}`)
            .then((res) =>res.data).then(data=>setInputs(data.book));

        }
        fetchHandler();
    },[id])
    const sendRequest = async() => {
      await axios.put(`http://localhost:5000/books/${id}`,{
        name:String(Inputs.name),
      author: String(Inputs.author),
      description:String(Inputs.description),
      price: Number(Inputs.price),
      image: String(Inputs.image),
      available: Boolean(checked)
      }).then(res=>res.data)
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      sendRequest().then(()=>history("/books"))
    }
    const handleChange = (e) => {
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  return <div>
    { Inputs && (<form onSubmit={handleSubmit}>
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
    <Button variant="contained" type="submit">Update Book</Button>
    </Box>
    
  </form>)}
  </div>
}

export default BookDetail