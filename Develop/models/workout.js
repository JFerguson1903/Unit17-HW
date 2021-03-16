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
});

const Workout = mongoose.model("Workout", workoutsSchema);

console.log(Workout);

module.exports = Workout;
