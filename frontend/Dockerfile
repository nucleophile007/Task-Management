# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
