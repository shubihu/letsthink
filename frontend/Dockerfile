FROM node:20.9-bullseye-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json /app/

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY ./ /app/

# Expose port 5002 to access the server
# EXPOSE 5002
ENV PORT 5002
ENV HOST 0.0.0.0

# Command to run the application
CMD ["npm", "run", "start"]
