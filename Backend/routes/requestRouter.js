const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/User");

const sendEmail = require("../utils/sendEmail");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      //sending email using AWS SES
      const emailRes = await sendEmail.run(
        `New Connection Request from ${req.user.firstName} on DevTinder!`, // Subject
       
        `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f0f2f5; margin: 0; padding: 0; }
              .content { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0,0,0,0.1); }
              .header { background-color: #1877f2; padding: 16px; text-align: center; color: #ffffff; font-size: 22px; font-weight: bold; border-radius: 8px 8px 0 0; }
              .body-content { padding: 20px; text-align: left; color: #333333; font-size: 16px; }
              .button { background-color: #1877f2; color:#ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; display: inline-block; margin-top: 15px; font-weight: bold; text-align: center; }
              .footer { padding: 15px; text-align: center; font-size: 14px; color: #777777; background: #f0f2f5; border-radius: 0 0 8px 8px; }
            </style>
          </head>
          <body>
            <div class="content">
              <div class="header">🦸🏻 TinderDev</div>
              <div class="body-content">
                <h2>Hey ${toUser.firstName},</h2>
                <p>You've got a new connection request from <strong>${req.user.firstName}</strong>!</p>
                <p>${req.user.firstName} is <strong>${status}</strong> in connecting with you. Don't keep them waiting too long! 😉</p>
                <div style="text-align: center;">
                  <a href="https://tinderdev.in" class="button">View Profile & Respond</a>
                </div>
              </div>
              <div class="footer">
                &copy; 2025 TinderDev | <a href="https://tinderdev.in/unsubscribe" style="color: #1877f2;">Unsubscribe</a>
              </div>
            </div>
          </body>
          </html>
        `
      );
      console.log(emailRes);

      
      res.json({
        message:
          req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;

      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;