// const user = { name: "Alice", age: 25, city: "New York" };

// // Instead of accessing properties like this:
// // console.log(user.name);
// // console.log(user.age);
// // console.log(user.city);

// // Rewrite using destructuring!

// const { name, age, city } = user;

// console.log(name);
// console.log(age);
// console.log(city);

// // =============

// const profile = { username: "JohnDoe", email: "john@example.com" };

// const { username, email, country = "name your country" } = profile;

// console.log(country, username, email);

// // ====================

// const person = { firstName: "Emma", lastName: "Smith", age: 30 };

// // Destructure and rename firstName -> fname, lastName -> lname
// const { firstName: fnam, lastName: lname } = person;

// console.log(fnam, "and", lname);

// //================================

// const employee = { id: 101, name: "David", role: "Developer", salary: 50000 };

// // Use destructuring and the rest (`...`) operator

// const { id, ...rest } = employee;
// console.log(rest);

//=============================
const user = {
  id: 1,
  profile: { username: "JaneDoe", email: "jane@example.com" },
};

// Extract `email` using nested destructuring

const { id, profile: { email},profile: { username} } = user

console.log(username)