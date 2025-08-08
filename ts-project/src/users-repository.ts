import { v4 as uuidv4 } from "uuid";

type Role = "user" | "admin" | "guest";

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

interface User {
  readonly id: string;
  name: string;
  email: string;
  isActive: boolean;
  role: Role;
  phoneNumber?: string;
  address?: Address;
}

export class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  findAll() {
    return this.users;
  }

  getAllUsers<K extends keyof User>(desiredParams: K[]): Pick<User, K>[] {
    if (!desiredParams || desiredParams.length === 0) return this.users;

    return this.users.reduce((acc, user) => {
      return [
        ...acc,
        desiredParams.reduce((picked, currentParam) => {
          return {
            ...picked,
            [currentParam]: user[currentParam],
          };
        }, {} as Pick<User, K>),
      ];
    }, [] as Pick<User, K>[]);
  }

  findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  create(userToAdd: Omit<User, "id">) {
    const user = {
      ...userToAdd,
      id: uuidv4(),
    };
    this.users.push(user);
    return user;
  }

  update(id: string, updateData: Partial<Omit<User, "id">>) {
    const userToUpdate = this.users.find((item) => item.id === id);

    if (!userToUpdate) {
      throw new Error(`[UserRepository.update] User with id ${id} not found`);
    }

    const userUpdated = { ...userToUpdate, ...updateData };
    const userToUpdateIndex = this.users.findIndex((item) => item.id === id);

    this.users[userToUpdateIndex] = userUpdated;
    return userUpdated;
  }

  remove(id: string) {
    const userToRemove = this.findById(id);

    if (!userToRemove) {
      throw new Error(`User with id ${id} not found`);
    }

    const usersAfterRemove = this.users.filter((item) => item.id !== id);
    this.users = usersAfterRemove;

    return userToRemove;
  }

  update2(id: string, updateData: Partial<Omit<User, "id">>) {
    const index = this.users.findIndex((item) => item.id === id);
    const userToUpdate = this.users[index];

    if (userToUpdate) {
      this.users[index] = { ...userToUpdate, ...updateData };
      return this.users[index];
    }
    return null;
  }
}

const usersRepository = new UsersRepository();

usersRepository.create({
  name: "Alice",
  email: "alice@email.com",
  isActive: true,
  role: "admin",
  phoneNumber: "123-456-7890",
  address: { street: "123 Main St", city: "Wonderland", zipCode: "12345" },
});

usersRepository.create({
  name: "Bob",
  email: "bob@email.com",
  isActive: false,
  role: "user",
});

const usersFiltered = usersRepository.getAllUsers(["name", "id"]);

console.log(usersFiltered);
