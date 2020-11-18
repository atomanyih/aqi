import Koa from "koa";
import ParticleReading from "../models/ParticleReading";

export default () => {
  const app = new Koa();

  app.use(async ctx => {
    ctx.body = await ParticleReading.query();
  });

  app.listen(3000);
}