FROM node:16-alpine as build
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install --force

COPY . ./
EXPOSE 3000
RUN npm run build

FROM nginx:1.21.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
