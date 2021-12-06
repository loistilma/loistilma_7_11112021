# Projet 7 Groupomania

Groupomania is a minimal social network with some functionnality:

- create account 
- create post and upload media from your computer (jpg, png, gif)
- modify post
- comment post
- delete account
- moderator account who can delete/modify all posts

## Projet environnement

- [Node v16.13.0](https://nodejs.org/en/blog/release/v16.13.0/)

- [MySQL v8.0.27](https://dev.mysql.com/downloads/mysql/)

-------------------------------------------------------------------------

- Frontend: React / Material Ui

- Backend: Express / Sequelize

## Installation

### Client

Install packages :

```bash
npm i # into client folder
```

### Server

Install packages :

```bash
npm i # into server folder
```

#### Create the Database

##### Option A. Create database with Dump20211206.sql :

Import [Dump20211206.sql](https://github.com/loistilma/loistilma_7_11112021/blob/master/Dump20211206.sql) into your database server


Configure your database credentials into .env file : 

```bash
cp .env.example .env # into server folder
```

##### Option B. Add tables in a database with sequelize :

- Create a database

- Configure your database credentials in .env file

- Run `npx sequelize-cli db:migrate` into server folder

- Insert moderator `npx sequelize-cli db:seed:all`

## Launch

### Client and server

Launch single

```bash
npm start # into client and server folder
```

or concurrently

```bash
npm run all # into client folder
```

Visit [http://localhost:8080/](http://localhost:8080/)

## Try moderator user

Connect with moderator :

- username: moderator
- password: moderator