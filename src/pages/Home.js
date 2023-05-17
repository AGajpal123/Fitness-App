import React,{useState} from 'react'
import {Box} from '@mui/material'
import Excercises from '../components/Excercises'
import SearchExcercises from '../components/SearchExcercises'
import HeroBanner from '../components/HeroBanner'

const Home = () => {
  //changes in this reflected to all other parts of application
  const [bodyPart,setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);
  return (
    <Box>
      <HeroBanner/>
      <SearchExcercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
      <Excercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart}/>
    </Box>
  )
}

export default Home
