import { Router, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
const models = require("../data/model/user");

export const userController: Router = Router();

//    === LOGIN FIND USER IN DATABASE ===
userController.post("/login", async (req: Request, res: Response) => {
  const token = await jwt.sign({ user: req.body.login }, "xxx", {
    expiresIn: "1h",
  });
  models.findUser(req.body, function (err: Error, user: any) {
    if (err) res.send("Error" + err);
    if (user[0].login && user[0].password) {
      res.json({
        token: token,
        user: user[0].firstName,
      });
    } else {
      res.send([]);
    }
  });
});

//    === REGISTER NEW USER IN DATABASE ===
userController.post("/users", (req: Request, res: Response) => {
  models.newUser(req.body, function (err: Error, user: any) {
    if (err) {
      res.status(404);
      res.json({
        error: "User has not been added",
      });
    } else {
      res.json(user);
    }
  });
});
