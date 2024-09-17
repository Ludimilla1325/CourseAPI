import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  users: User[];

  constructor() {
    this.users = [];
  }

  async login(username: string, password: string): Promise<string | null> {
    const user = this.users.find((user) => user.username === username);
    if (!user) return null;
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) return null;

    const token = jwt.sign(
      { username: user.username },
      process.env.SECRET_KEY as string,
      { expiresIn: "1h" }
    );
    return token;
  }

  async createUser(username: string, password: string): Promise<User> {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      const id = uuidv4();
      const user = new User(id, username, hashedPassword);
      this.users.push(user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  getUsers(): Partial<User>[] {
    return this.users.map(({ password, ...rest }) => rest);
  }

  getUser(username: string): Partial<User> | string {
    const user = this.users.find((user) => user.username === username);
    if (!user) return "User not found";
    const { password, ...rest } = user;
    return rest;
  }

  getUserById(id: string): User | string {
    const user = this.users.find((user) => user.id === id);
    if (!user) return "User not found";
    return user;
  }

  updateUser(id: string, newPassword: string): Partial<User> | string {
    const user = this.getUserById(id);
    if (!user || typeof user === "string") return "User not found";
    if (typeof newPassword !== "string") return "New password must be a string";

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    const { password, ...rest } = user;
    return rest;
  }

  deleteUser(id: string): void | string {
    const user = this.getUserById(id);
    if (!user || typeof user === "string") return "User not found";
    this.users = this.users.filter((user) => user.id !== id);
    return "User deleted successfully";
  }
}
