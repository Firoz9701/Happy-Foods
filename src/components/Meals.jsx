import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MealItem from './MealItem.jsx'
import useHttp from '../hooks/useHttp.js'
import Error from './Error.jsx'
const requestConfig = {}
 const Meals = () => {
 /* const [meals,setMeals] = useState([]) */
  const {data:meals,isLoading,error}  = useHttp('http://localhost:3000/meals',requestConfig,[])
  console.log(error)
  if(isLoading){
    return <p className='center'>Fecthing meals...</p>
  }
/*  useEffect( () => {
    async  function fetchMeals(){
    try {
            const response =  await fetch('http://localhost:3000/meals')
            const meals = await response.json()
            setMeals(meals)
    } catch (error) {
        console.log(error)
    }
  }
  fetchMeals()
   },[]) */
  if(error){
    return <Error title="Failed to fetch meals" message={error} />
   }
  return (
    <ul id='meals'>
        {meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
        ))}
      
    </ul>
  )
}
export default Meals
