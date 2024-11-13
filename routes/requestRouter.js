const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/User");
const ConnectionRequest = require("../models/connectionRequest");

//Send the connection Request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      //checking invalid status type
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: " Invalid status type: " + status });
      }

      const toUser = await User.findById(toUserId);
      // if user not found in DB
      if (!toUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existisngConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existisngConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists" });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

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

//review the connection request
requestRouter.post(
  "/request/review/:status/:requesId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      // console.log(loggedInUser)

      const { status, reqestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];

      //check status is valid or not
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Status not allowed!" });
      }

      //find request in db
      const connectionRequest = await ConnectionRequest.findOne({
        _id: reqestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });

      //if request is not present in db
      if (!connectionRequest) {
        return res
          .status(400)
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
