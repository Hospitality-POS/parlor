# Use an official Node.js image as the base image
FROM node:21-alpine

RUN apk add --no-cache tzdata
ENV TZ=Africa/Nairobi

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --force

# RUN apt-get install tzdata -y

# Copy the rest of the application code to the container
COPY . .

# Build the app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 5373

# Define the command to run the app
CMD ["npm", "run", "dev"]
