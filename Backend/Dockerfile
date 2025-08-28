# Use official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies, including nodemon globally
RUN npm install && npm install -g nodemon

# Copy the rest of the application files
COPY . .

# Expose port 8000
EXPOSE 8000

# Start the application using nodemon
CMD ["npm", "start"]
