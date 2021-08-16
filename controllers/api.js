const router = require('express').Router();
const Workout = require('../models/Workout');


router.post('/workouts', ({body}, res) => {
    const workout = body;
    Workout.create(workout)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
})

router.put('/workouts/:id', ({body, params}, res) => {
    Workout.findOneAndUpdate(
        {
            _id: params.id
        },
        {
            $push: {
                exercises: body
            }
        },
        {
            new: true
        }
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        })
    )
})

router.get('/workouts', (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        })
})

router.get('/workouts/range', (req, res) => {
    Workout.find({})
        .limit(7)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.json(err);
        })
})

module.exports = router;