# Use the official Node.js image
FROM node:14-alpine

# Set the working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npx", "ts-node", "src/server.ts"]
