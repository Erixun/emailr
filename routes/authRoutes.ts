import { Router } from "express";
import passport from "passport";
const router = Router();

router.get(
  //ERROR: 400: redirect_uri_mismatch ?
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    //aka what access we want to have, from a (key)list of scopes
  })
);

//route to receive accessToken
router.get("/google/callback", passport.authenticate("google"));

router.get("/api/currentUser", (req, res, next) => {
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
