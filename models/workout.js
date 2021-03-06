const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutsSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      name: {
        type: String,
        trim: true,
        required: "Enter a name for your exercise"
      },
      type: {
        type: String,
        trim: true,
        required: "Enter a name for type"
      },
      duration: {
        type: Number,
        required: "Enter a duration"
      },
      weight: {
        type: Number,
        required: "Enter a weight"
      },
      reps: {
        type: Number,
        required: "Enter reps"
      },
      sets: {
        type: Number,
        required: "Enter sets"
      }
    }
  ]
},{
    toJSON: {
        virtuals: true
    }
});

workoutsSchema.virtual("totalDuration").get(function () {
  return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
  }, 0);
})

const Workout = mongoose.model("Workout", workoutsSchema);

module.exports = Workout;
