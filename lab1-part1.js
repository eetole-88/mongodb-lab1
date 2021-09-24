// #1
db.people.find();
// #2
db.people.find().count();
// #3
db.people.find({ state: "Arizona" });
// #4
db.people.find({ state: "Arizona", gender: "Male" });
// #5
db.people.find({ $or: [{ state: "Arizona" }, { state: "New Mexico" }] });
// #6
db.people.find({ age: { $lt: 40 } });
// #7
db.people.find({
  $and: [
    { age: { $gte: 40 } },
    { age: { $lte: 45 } },
    { gender: "Female" },
    { state: "Florida" },
  ],
});
// #8
db.people.find({ first_name: /^H/ });
// #9
db.people.find({ state: "Michigan" }).sort({ first_name: 1 });
// #10
db.people.find({ $or: [{ state: "Virginia" }, { first_name: "Virginia" }] });
// #11
db.people.find({ age: { $lt: 30 } }, { first_name: true, last_name: true });
// #12
db.people.find({ state: "Montana" }, { age: false });
// #13
db.people.find({ email: /.edu$/ }, { email: true, _id: false });
