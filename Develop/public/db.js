let db;
// create a new db request for a "workout" database.
const request = indexedDB.open("workout", 1);

request.onupgradeneeded = function(event) {
   // create object store called "excercises" and set autoIncrement to true
  const db = event.target.result;
  db.createObjectStore("excercises", { autoIncrement: true });
};

request.onsuccess = function(event) {
  db = event.target.result;

  console.log(db);

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function(event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  // create a workout on the excercises db with readwrite access
  const workout = db.workout(["excercises"], "readwrite");

  // access your excercises object store
  const store = workout.objectStore("excercises");

  // add record to your store with add method.
  store.add(record);
}

function checkDatabase() {
  // open a workout on your excercises db
  const workout = db.workout(["excercises"], "readwrite");
  // access your excercises object store
  const store = workout.objectStore("excercises");
  // get all records from store and set to a variable
  const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/workouts", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
        // if successful, open a transaction on your excercises db
        const workout = db.workout(["excercises"], "readwrite");

        // access your excercises object store
        const store = workout.objectStore("excercises");

        // clear all items in your store
        store.clear();
      });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
