// #1  Average age
db.people.aggregate([
  {
    $group: { _id: null, averageAge: { $avg: "$age" } },
  },
  {
    $project: { _id: 0 },
  },
]);
// #2  Average age by gender
db.people.aggregate([
  {
    $group: { _id: "$gender", averageAge: { $avg: "$age" } },
  },
]);
// #3  Number of people by gender
db.people.aggregate([
  {
    $group: { _id: "$gender", count: { $sum: 1 } },
  },
]);
// #4  3 oldest people
db.people.aggregate([
  {
    $sort: { age: -1 },
  },
  {
    $limit: 3,
  },
]);
// #5  5 youngest people, display only their names as one value (first + " " + last) and their ages
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
// #6  Average number of children
db.people.aggregate([
  {
    $group: {
      _id: null,
      averageChildren: { $avg: { $size: "$children" } },
    },
  },
]);
// #7  Name and age of children in Michigan who are under age ten
db.people.aggregate([
  {
    $unwind: "$children",
  },
  {
    $match: {
      state: "Michigan",
      "children.age": { $lt: 10 },
    },
  },
  {
    $project: {
      "children.name": 1,
      "children.age": 1,
      _id: 0,
    },
  },
]);

// #8  Average age of child by state, sorted with oldest first
db.people.aggregate([
  {
    $unwind: "$children",
  },
  {
    $group: {
      _id: "$state",
      averageAge: { $avg: "$children.age" },
    },
  },
  {
    $sort: { ageTotal: -1 },
  },
]);
// #9  Find the total dollar amount of all sales ever. Use the total field.
db.orders.aggregate([
  {
    $group: { _id: null, sumPrice: { $sum: "$total" } },
  },
  { $project: { _id: 0 } },
]);
// #10  Find the total dollar amount of sales on 2017-05-22. Use the total field.
db.orders.aggregate([
  {
    $match: { date: "2017-05-22" },
  },
  {
    $group: { _id: null, sumPrice: { $sum: "$total" } },
  },
]);
// #11  Find the date with the greatest number of orders. Include the date and the number of orders.
db.orders.aggregate([
  {
    $group: { _id: "$date", count: { $sum: 1 } },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 1,
  },
]);
// #12  Find the date with the greatest total sales. Include the date and the dollar amount for that day.
db.orders.aggregate([
  {
    $group: { _id: "$date", greatestTotal: { $sum: "$total" } },
  },
  {
    $sort: { greatestTotal: -1 },
  },
  {
    $limit: 1,
  },
]);
// #13  Find the top three products that have had the greatest number sold. Include product name and number sold.
db.orders.aggregate([
  { $unwind: "$items" },
  { $group: { _id: "$items.product", numberSold: { $sum: "$items.count" } } },
  { $sort: { numberSold: -1 } },
  { $limit: 3 },
]);
// #14  Find the top item that has the greatest revenue (number sold * price). Include product name and dollar amount of sales.
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product",
      totalSales: { $sum: { $multiply: ["$items.price", "$items.count"] } },
    },
  },
  { $sort: { totalSales: -1 } },
  { $limit: 1 },
  { $project: { product: "$_id", totalSales: 1, _id: 0 } },
]);
