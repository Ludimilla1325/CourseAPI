import { UserService } from "./UserService";

describe("UserService", () => {
  let userService: UserService;
  
  beforeAll(() => {
    process.env.SECRET_KEY = 'your_test_secret_key';
  });

  beforeEach(() => {
    userService = new UserService();
  });

  describe("login", () => {
    it("should return a token if the username and password are correct", async () => {
      await userService.createUser("test", "test");
      const token = userService.login("test", "test");
      expect(token).toBeTruthy();
    });
    it("should return null if the username does not exist", async () => {
      const token = await userService.login("test", "test");
      expect(token).toBeNull();
    });
    it("should return null if the password is incorrect", async () => {
      await userService.createUser("test", "test");
      const token = await userService.login("test", "wrongPassword");
      expect(token).toBeNull();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const user = await userService.createUser("test", "test");
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("username", "test");
    });
  });

  describe("getUserById", () => {
    it("should return the user by id", async () => {
      const user = await userService.createUser("test", "test");
      if(user){
        const response = userService.getUserById(user.id);
        expect(response).toHaveProperty("id", user.id);
        expect(response).toHaveProperty("username", "test");
      }
    });
    it('should return "User not found" if the user does not exist', () => {
      const response = userService.getUserById("nonexistent");
      expect(response).toBe("User not found");
    });
  });

  describe("getUser", () => {
    it("should return the user by username", async () => {
      await userService.createUser("test", "test");
      const response = userService.getUser("test");
      expect(response).toHaveProperty("username", "test");
    });
    it('should return "User not found" if the user does not exist', () => {
      const response = userService.getUser("nonexistent");
      expect(response).toBe("User not found");
    });
  });

  describe("getUsers", () => {
    it("should return all users", async () => {
      await userService
        .createUser("test1", "test")
      await userService
        .createUser("test2", "test")
      await userService
        .createUser("test3", "test")
        const users = userService.getUsers();
        expect(users).toHaveLength(3);
    })
    });


  describe("updateUser", () => {
    it("should update the user password", async() => {
      const user = await userService.createUser("test", "test");
      const updatedUser = userService.updateUser(user.id, "newPassword");
      expect(updatedUser).toHaveProperty("id", user.id);
      expect(updatedUser).toHaveProperty("username", "test");
    });

    it('should return "User not found" if the user does not exist', () => {
      const response = userService.updateUser("nonexistent", "newPassword");
      expect(response).toBe("User not found");
    });
  });

  describe("deleteUser", () => {
    it("should delete the user", async() => {
      const user = await userService.createUser("test", "test");
      userService.deleteUser(user.id);
      const response = userService.getUserById(user.id);
      expect(response).toBe("User not found");
    });

    it('should return "User not found" if the user does not exist', () => {
      const response = userService.deleteUser("nonexistent");
      expect(response).toBe("User not found");
    });
  });
});
