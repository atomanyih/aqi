import Koa from "koa";
import Reading from "../models/Reading";

export default () => {
  const app = new Koa();

  app.use(async ctx => {
    ctx.body = await Reading.query();
  });

  app.listen(3000);
}