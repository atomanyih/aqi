import Koa from "koa";

export default () => {
  const app = new Koa();

  app.use(ctx => {
    ctx.body = 'Hello Koa';
  });

  app.listen(3000);
}