FROM node:21-alpine


RUN apk add --no-cache tzdata
ENV TZ=Africa/Nairobi
# RUN apt-get update -y

# RUN apt-get install tzdata -y

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

# RUN node seed.js

EXPOSE 3000

CMD ["npm", "start"]
