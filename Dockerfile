# Stage 1: Build the React application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Use nginx to serve static files
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
