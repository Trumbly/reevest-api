const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 80

app
    .use(require("koa-body")())
    .use(router.allowedMethods())
    .use(router.routes())

app.listen(port);

router.get("/", ctx => {
    ctx.body = "Hello world";
})

router.get("/user", ctx => {
    ctx.body = "U want to read all users? Sry, but u have to wait until tmrrw, going to bed now, over and out!";
})