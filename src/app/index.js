const Koa = require("koa");
const Router = require("koa-router");
const koa_body = require("koa-body");
const pool = require('./db/db_connect.js');

const app = new Koa();
const router = new Router();
const db = require("./db/db_operations.js");

const port = process.env.PORT || 80
exports.start = async function () {
    app.use(koa_body());
    app
        .use(router.allowedMethods())
        .use(router.routes())

    app.listen(port, () => {
        console.log("Api is running on port " + port);
    });

    router.get("/", ctx => {
        ctx.body = "Hello world";
    })
    router.get('/users', db.getUsers);
    router.post('/users', db.createUser);
    router.get('/users/:id', db.getUserById);
    router.put('/users/:id', db.updateUser);
    router.delete('/users/:id', db.deleteUser);
};