FROM node:12.18.2
COPY . /app

EXPOSE 3000
RUN yarn install

CMD ["yarn", "--cwd","/app","start"]