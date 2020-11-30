FROM node:12.18.2
COPY . /app

EXPOSE 3000
RUN cd /app/ && yarn install

CMD ["yarn", "--cwd","/app","start"]