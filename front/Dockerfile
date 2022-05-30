FROM node:16 as build

# Build env
WORKDIR /usr/app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./ 
RUN npm ci
COPY ./ /usr/app/
RUN npm run build

# Prod env
FROM nginx:1.20
COPY --from=build /usr/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 4300
CMD ["nginx", "-g", "daemon off;"]