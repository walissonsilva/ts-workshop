class UsersRepository {
  constructor() {
    this.users = [];
  }

  findAll() {
    return this.users;
  }

  findById(id) {
    return this.users.find((item) => item.id === id);
  }

  create(item) {
    this.users.push(item);
    return item;
  }

  update(id, updateData) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updateData };
      return this.users[index];
    }
    return null;
  }

  remove(id) {
    const userToRemove = this.findById(id);

    if (!userToRemove) {
      throw new Error(`User with id ${id} not found`);
    }

    const usersAfterRemove = this.users.filter((item) => item.id !== id);
    this.users = usersAfterRemove;

    return userToRemove;
  }
}

module.exports = UsersRepository;
