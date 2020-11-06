FROM node:current-slim

RUN apt update
RUN apt install tesseract-ocr -y
RUN mkdir /home/app

WORKDIR /home/app

COPY ./built /home/app/src
COPY [".env", "package.json", "package-lock.json", "/home/app"]

RUN cd /home/app && npm ci
CMD ["npm", "run", "docker:container:dev"]
