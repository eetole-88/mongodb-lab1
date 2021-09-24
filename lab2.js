// #1
db.people.aggregate([
  {
    $group: { _id: null, averageAge: { $avg: "$age" } },
  },
  {
    $project: { _id: 0 },
  },
]);
// #2
db.people.aggregate([
  {
    $group: { _id: "$gender", averageAge: { $avg: "$age" } },
  },
]);
// #3
db.people.aggregate([
  {
    $group: { _id: "$gender", count: { $sum: 1 } },
  },
]);
// #4
db.people.aggregate([
  {
    $sort: { age: -1 },
  },
  {
    $limit: 3,
  },
]);
// #5
db.people.aggregate([
  {
    $sort: { age: 1 },
  },
  {
    $limit: 5,
  },
  {
    $project: {
      fullName: { $concat: ["$first_name", " ", "$last_name"] },
      age: 1,
      _id: 0,
    },
  },
]);
// #6
db.people.aggregate([
  {
    $group: {
      _id: null,
      averageChildren: { $avg: { $size: "$children" } },
    },
  },
]);
// #9
db.orders.aggregate([
  {
    $group: { _id: null, sumPrice: { $sum: "$total" } },
  },
  { $project: { _id: 0 } },
]);
// #10
db.orders.aggregate([
  {
    $match: { date: "2017-05-22" },
  },
  {
    $group: { _id: null, sumPrice: { $sum: "$total" } },
  },
]);
// #11
db.orders.aggregate([
  {
    $sort: {},
  },
]);
