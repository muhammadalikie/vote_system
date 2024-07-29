FROM node:18.18.0
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5173
ENV TZ=Asia/Tehran
RUN yarn build
CMD [ "yarn", "run", "preview" , "--port", "5173", "--host"]
