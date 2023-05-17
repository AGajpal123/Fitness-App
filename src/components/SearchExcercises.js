import React, { useState, useEffect } from 'react'
import { Button, Box, Typography, Stack, TextField } from '@mui/material'
import { fetchData, excerciseOptions } from '../utils/fetchData'
import HorizontalScrollBar from './HorizontalScrollBar';

const SearchExcercises = ({setExercises,bodyPart,setBodyPart}) => {

  const [search, setSearch] = useState('');

  const [bodyParts, setBodyParts] = useState([]);

  //useEffect -> as page loads 
  useEffect(() => {
    const fetchExerciseData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', excerciseOptions);
      setBodyParts(['all', ...bodyPartsData])
      // console.log(bodyPartsData);
    }
    fetchExerciseData();
  }, []);


  const HandleSearch = async () => {
    if (search) {
      const excerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', excerciseOptions);
      console.log(excerciseData);
      const seachedExercises = excerciseData.filter((exercise) => {
        exercise.name.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search)
      });
      setSearch('');
      setExercises(seachedExercises);
    }
  }

  return (
    <Stack alignItems={'center'} mt={5}
      justifyContent={'center'} p="20px">
      <Typography fontWeight={700}
        sx={{
          fontSize: {
            lg: '44px',
            xs: '30px'
          }
        }} mb={5} textAlign={'center'}>
        Awesome Excercises You <br />
        Should Know
      </Typography>
      <Box position={'relative'} mb={10}
      >
        <TextField sx={{
          input: {
            fontWeight: '700',
            border: 'none',
            borderRadius: '4px'
          },
          width: {
            lg: '800px',
            xs: '350px'
          },
          backgroundColor: '#fff',
          borderRadius: '40px'
        }} height='76px' onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder='Search Excercises' value={search} type='text' />
        <Button className='search-btn'
          sx={{
            backgroundColor: '#ff2625',
            color: 'white',
            textTransform: 'none',
            width: {
              lg: '175px',
              xs: '80px'
            },
            fontSize: {
              lg: '20px',
              xs: '14px'
            },
            height: '56px',
            position: 'absolute',
            right: 0
          }} onClick={HandleSearch}>Search</Button>
      </Box>
      <Box sx={{
        position: 'relative',
        width: '100%',
        padding: '20px'
      }}>
        <HorizontalScrollBar data={bodyParts} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
      </Box>
    </Stack>
  )
}

export default SearchExcercises
