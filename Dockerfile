FROM node:18.9-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm i -g pnpm
RUN pnpm install
EXPOSE 3200
CMD [ "node", "base","prod" ]