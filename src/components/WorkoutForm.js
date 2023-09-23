import  {useState}  from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// import Weather from "./Weather"

const WorkoutForm = () => {
   
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [bright, setBright] = useState("")
    const [dare, setDare] = useState("")
    const [boss, setBoss] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
        }
        

        const workout = {bright, dare, boss}

        const response = await fetch ("/api/workout/users", {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                "Content-Type": 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setBright("")
            setBoss("")
            setDare("")
            setError(null)
            console.log('new workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

      
    


    return (
        <div>
        <form action="/users" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Excercise Title</label>
            <input type="text" onChange={(e) => setBright(e.target.value)} value={bright}/>

            <label>Loads</label>
            <input type="number" onChange={(e) => setDare(e.target.value)} value={dare}/>

            <label>Reps</label>
            <input type="number" onChange={(e) => setBoss(e.target.value)} value={boss}/>
            <button>Add Workout</button>
            {error && <div className="errors">{error}</div>}
        </form>

        </div>
        
    )
}

export default WorkoutForm;