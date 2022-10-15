FROM node:18.10.0-bullseye-slim@sha256:d900c28d8cbb51cee5473215e5941b6334d9b02da75ef60f490d4c0c13160bb1
WORKDIR /usr/src/app
COPY . .
RUN npm i -g pnpm
RUN pnpm install --prod
EXPOSE 3200
CMD [ "node", "base","prod" ]
