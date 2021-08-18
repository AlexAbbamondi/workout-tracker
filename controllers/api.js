const router = require('express').Router();
const Workout = require('../models/workout');

// route to post workouts
router.post('/workouts', ({body}, res) => {
    const workout = body;
    console.log("workout:" + workout);
    Workout.create(workout)
        .then(dbWorkout => {
          console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
})

// route to update workout
router.put('/workouts/:id', ({body, params}, res) => {
  console.log("body:" + body);
  console.log("params:" + params)
    Workout.findByIdAndUpdate(params.id,
        {
            $push: {
                exercises: body
            }
        },
        {
            new: true
        }
    )
        .then(dbWorkout => {
          console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
    
})

// route to get all workouts
router.get('/workouts', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .then((dbWorkouts) => {
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // route to get the last 7 workouts
  router.get('/workouts/range', (req, res) => {
    Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .sort({ _id: -1 })
      .limit(7)
      .then((dbWorkouts) => {
        console.log(dbWorkouts);
        res.json(dbWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

module.exports = router;