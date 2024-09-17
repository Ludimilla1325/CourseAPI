# Course API

This is a simple Course API built with Express.js. It allows you to create users, create a course, update a course, delete a course, get informations of a course.

## Endpoints

### Courses

- `POST /courses`: Create a new course. The request body should include `title`, `description`, `instructor`, and `duration`.
- `GET /courses`: Retrieves a list of all courses. You can also filter the courses by adding query parameters to the URL. For example, `GET /courses?title=Intro` would return only the courses with 'Intro' in the title.

  **Query Parameters:**

  - `title`: Filter courses by title.
  - `description`: Filter courses by description.
  - `duration`: Filter courses by duration.
  - `instructor`: Filter courses by instructor.

- `GET /courses/:id`: Get the details of a specific course by its ID.
- `PUT /courses/:id`: Update an existing course by its ID. The request body should include `title`, `description`, `instructor`, and `duration`.
- `DELETE /courses/:id`: Delete a specific course by its ID.

### Users

- `POST /users`: Create a new user. The request body should include `username`, and `password`.
- `GET /users`: Retrieve a list of all users.
- `GET /users/:id`: Get the details of a specific user by their ID.
- `PUT /users/:id`: Update an existing user by their ID. The request body should include the `newPassword`.
- `DELETE /users/:id`: Delete a specific user by their ID.

### Authentication

- `POST /login`: Log in a user and return a JWT token. The request body should include `username` and `password`.

## Running the Project

1. Install dependencies with `npm install`.
2. Start the server with `npm start`.
3. The server will start on `localhost:3000` (or the port specified in your `.env` file).

## Testing

You can test the API with any HTTP client, like curl or Postman. See the "Endpoints" section for details on how to use each endpoint.

## Running tests

1. Run with `npm run test`.

## Docker

You can also run the application using Docker. Here are the steps:

1. Build the Docker image: `docker build -t course-app .`
2. Run the Docker container: `docker run course-app`
3. Run Docker Compose `docker-compose up`

### Potential Improvements:

- **Session Management**: Implement user session creation and management to maintain user authentication state across requests.
- **Role-Based Access Control**: Add roles such as admin, user, etc., to manage permissions and control access to different parts of the application.
- **Database Integration**: Connect the application to a database for persistent data storage and retrieval.
- **API Documentation**: Use tools like Swagger to create comprehensive API documentation for better developer experience.
- **Security Enhancements**: Add security features like password hashing, rate limiting, and protection against common vulnerabilities (e.g., SQL injection, XSS).
- **Error Handling Improvements**: Create a global error handling mechanism to manage unexpected errors gracefully.
