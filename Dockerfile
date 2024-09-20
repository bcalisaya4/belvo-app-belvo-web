FROM node:18
WORKDIR /app
COPY package.json /app
RUN yarn install
#RUN npm run build
COPY . /app
ENV HOST 0.0.0.0
EXPOSE 80
#CMD [ "npm", "start" ]
RUN yarn build
