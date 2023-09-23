import formatDistanceToNow from 'date-fns/formatDistanceToNow'



const WorkoutD = ({ workout }) => {


    return (
        <div className="workoutD">
        <h4>{workout.bright}</h4>
        <p><strong>Load (kg):</strong> {workout.dare} </p>
        <p><strong>Reps:</strong> {workout.boss} </p>
        <p>{formatDistanceToNow(new Date(workout.createdAt))}</p>
        </div>
    )
}

export default WorkoutD;