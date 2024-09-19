# Use a Node.js base image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Install necessary system dependencies
RUN apk add --no-cache python3 make g++

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Expose port 3003
EXPOSE 3009

# Command to run the application
CMD ["node", "index.js"]

