const Koa = require("koa");
const Router = require("koa-router");

const app = new Koa();
const router = new Router();

app
    .use(require("koa-body")())
    .use(router.allowedMethods())
    .use(router.routes())

app.listen(3000);

router.get("/", ctx => {
    ctx.body = "Hello world";
})