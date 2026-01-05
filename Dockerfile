# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the frontend
RUN npm run build

# Verify build output exists
RUN echo "=== Build output ===" && ls -la dist/ && ls -la dist/assets/ && echo "=== FULL index.html ===" && cat dist/index.html

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies only
COPY package*.json ./
RUN npm install --omit=dev

# Copy built frontend from build stage
COPY --from=build /app/dist ./dist

# Copy server file
COPY server.js ./

# Cloud Run uses port 8080
EXPOSE 8080

# Start the server
CMD ["npm", "start"]

