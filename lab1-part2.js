// #1
db.people.insertOne(
  { first_name: "Anna" },
  { last_name: "Harris" },
  { email: "a.harris.5@gmail.com" },
  { gender: "Female" },
  { state: "California" },
  { age: 32 },
  { children: [] }
);
//^above info was added incorrectily. This only added a first_name. Corrected with below info:
db.people.replaceOne(
  { _id: ObjectId("614cc621e7448be191171bf8") },
  {
    first_name: "Sara",
    last_name: "Harris",
    age: 32,
    state: "Maryland",
    children: [],
  }
);
// #2
db.people.insertOne({
  first_name: "Philip",
  last_name: "Mountbatton",
  age: 64,
  state: "New Hampshire",
  children: [
    { name: "Andrew", age: 38 },
    { name: "Anne", age: 34 },
  ],
});
// #3
db.people.updateOne(
  { first_name: "Clarence" },
  { $set: { state: "South Dakota" } }
);
// #4
db.people.updateOne(
  { first_name: "Rebecca", last_name: "Hayes" },
  { $unset: { email: 1 } }
);
// #5
db.people.updateMany({ state: "Missouri" }, { $inc: { age: 1 } });
// #6
db.people.replaceOne(
  { first_name: "Jerry", last_name: "Baker" },
  {
    first_name: "Jerry",
    last_name: "Baker-Mendez",
    email: "jerry@classic.ly",
    gender: "Male",
    age: 28,
    state: "Vermont",
    children: [
      { name: "Alan", age: 18 },
      { name: "Jenny", age: 3 },
    ],
  }
);
// #7
db.people.deleteOne({ first_name: "Wanda", last_name: "Bowman" });
// #8
db.people.deleteMany({ email: null });
// #9
db.submissions.insertMany([
  {
    title: "The River Bend",
    upvotes: 10,
    downvotes: 2,
    artist: ObjectId("614ca0b7e7448be191171b33"),
  },
  {
    title: "Nine Lives",
    upvotes: 7,
    downvotes: 0,
    artist: ObjectId("614ca0b7e7448be191171b61"),
  },
  {
    title: "Star Bright",
    upvotes: 19,
    downvotes: 3,
    artist: ObjectId("614ca0b7e7448be191171be4"),
  },
  {
    title: "Why Like This?",
    upvotes: 1,
    downvotes: 5,
    artist: ObjectId("614ca0b7e7448be191171b6a"),
  },
  {
    title: "Non Sequitur",
    upvotes: 11,
    downvotes: 1,
    artist: ObjectId("614ca0b7e7448be191171b31"),
  },
]);
// #10
db.submissions.updateOne({ title: "The River Bend" }, { $inc: { upvotes: 2 } });
// #11
db.submissions.updateMany(
  { upvotes: { $gt: 10 } },
  { $push: { round2: true } }
);

//Extended Challenges:
// #12
db.people.updateOne(
  { first_name: "Helen", last_name: "Clark" },
  { $push: { children: { name: "Melanie", age: 0 } } }
);
// #13
db.people.updateOne(
  { first_name: "Joan", last_name: "Bishop" },
  { $set: { "children.3.name": "Cat" }, $inc: { "children.3.age": 1 } }
);
