const mongoose = require('mongoose');

const workoutSchema = new workoutSchema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: {

    },

})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout