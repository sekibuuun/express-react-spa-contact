import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { router as indexRouter } from "./routes/index";
import { router as usersRouter } from "./routes/users";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// ↓ 下のapp.use((err, req, res, next)=>{...})の引数errに付けるオブジェクトの型。
// errに付ける型として、vscode内のErrorというオブジェクト型があるが、statusというプロパティが無いため、拡張したinterfaceを定義している。
interface ErrorWithStatus extends Error {
  status: number;
}

// error handler
// ↓に関しては、このままだと全引数ともに暗黙的Anyとなってしまう。
// req,res,nextに関しては@types/expressの型を使えるが、errに関しては型拡張の必要あり！(上で定義したinterfaceを用いる。)
app.use(function (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;