FROM node:12.18.2

WORKDIR /usr/app

EXPOSE 3000
COPY ./package.json /usr/app
RUN  cd /usr/app && yarn install
COPY ./ /usr/app

CMD ["yarn", "--cwd","/usr/app","start"]