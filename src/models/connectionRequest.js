const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to user model by id
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to user model by id
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 }); //index on fromUserId & toUserId compound index
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //check if from userid is same as to user id
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("you cannot send request to yourself");
  }
  next();
});
const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);
module.exports = ConnectionRequestModel;
