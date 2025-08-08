const UsersRepository = require("./users-repository");

const usersRepository = new UsersRepository();

const newUser = {
  id: 1,
  name: "John Doe",
  email: "john@email.com",
};

usersRepository.create(newUser);

const users = usersRepository.findAll();
console.log("All Users:", users);
