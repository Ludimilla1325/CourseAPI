# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the application dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 3000 for the application
EXPOSE 3002

# Define the command to run the application
CMD [ "npm", "start" ]