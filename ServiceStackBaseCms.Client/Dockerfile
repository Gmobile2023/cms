# Step 1: Build the React app with Vite
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./package.json .

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the Vite project
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:stable-alpine

# Copy the default Nginx configuration file
COPY ServiceStackBaseCms.Client/default.conf /etc/nginx/conf.d/default.conf

# Copy the built files from the build stage to the Nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
