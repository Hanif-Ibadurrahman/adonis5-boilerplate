FROM node:19.3.0-alpine AS base

FROM base AS build-stage
WORKDIR /app
RUN apk update \
  && apk --update --no-cache --virtual build-dependencies add \
  py-pip \
  g++ \
  make \
  && rm -rf /var/cache/apk/*
COPY yarn.lock ./
COPY package.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build


FROM base AS final-stage
WORKDIR /app
RUN apk update \
  && apk add bash
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/build ./
COPY ./start.sh ./
RUN chmod +x ./start.sh
CMD ["/bin/bash", "-c", "/app/start.sh"]
