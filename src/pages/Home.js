import { useEffect} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

import WorkoutD from "../components/WorkoutD"
import WorkoutForm from "../components/WorkoutForm"




function Home () {
//   const [workouts, setWorkouts] = useState(null)

  const {workouts, dispatch} = useWorkoutsContext();
  const {user} = useAuthContext()
  
     useEffect (() => {
        const fetchWorkouts = async () => {

            const response = await fetch ('/api/workout/users', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
                // setWorkouts(json)
           
            }
        }
        if(user) {
            fetchWorkouts()
        }

        
     }, [dispatch, user])

    return (
     <div className="home">
     <div className="workouts">
     {workouts && workouts.map((workout) => (
      
      <WorkoutD  key = {workout._id}  workout = {workout}/>
     
      ))}
      
     </div>
     <WorkoutForm />
     </div>
    )
}

export default Home;

{/* <p key = {workout._id}> {workout.title}</p> */}
     