const jwt = require('jsonwebtoken');
const {jwtSecret} = require("../config/env");

function jwtRequired(req, res, next) {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

   try {
     jwt.verify(token, jwtSecret, (err, decoded) => {
         if (err) {
             return res.status(401).json({ message: "Unauthorized" });
         }
         req.user = decoded;
         next();
     });
   } catch (error) {
     return res.status(401).json({ message: "Unauthorized" });  
   }
}

function jwtOptional(req, res, next) {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
    try {if (token) req.user = jwt.verify(token, jwtSecret);} catch (error) {}
    next();
}

function socketAuthMiddleware(socket, next) {
  try {
    const token = socket.handshake.auth?.token 
               || (socket.handshake.headers?.authorization?.split(' ')[1]);

    if (token) {
      socket.user = jwt.verify(token, jwtSecret);
    } else {
      // Guest user (customer)
      const { role, id } = socket.handshake.query;

      if (role !== "customer" || !id) {
        return next(new Error("Unauthorized"));
      }

      socket.user = { id, role: "customer", guest: true };
    }

    next();
  } catch (error) {
    next(new Error("Unauthorized"));
  }
}
module.exports = {
    jwtRequired,
    jwtOptional,
    socketAuthMiddleware
};