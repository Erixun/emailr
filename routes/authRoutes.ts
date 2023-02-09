import { Router } from "express";
import passport from "passport";
const router = Router();

router.get(
  //ERROR: 400: redirect_uri_mismatch ?
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    //aka what access we want to have, from a (key)list of scopes
  })
);

//route to receive accessToken
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("/surveys");
  }
);

router.get("/api/current_user", (req, res, next) => {
  console.log("call currentUser?");
  res.send(req.user);
});

router.get("/api/logout", (req, res, next) => {
  req.logout({}, (err) => console.error(err));
  res.send(req.user); //should be empty
  //and then "/api/currentUser" will be as well
});

export default router;

//Alternatively:
// module.exports = (app: Express.Application) => {
//   router.get(
//     //ERROR: 400: redirect_uri_mismatch ?
//     "/auth/google",
//     passport.authenticate("google", {
//       scope: ["profile", "email"],
//       //what access we want to have, from a (key)list of scopes
//     })
//   );

//   //route to receive accessToken
//   router.get("/auth/google/callback", passport.authenticate("google"));
// };
