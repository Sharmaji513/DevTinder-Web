const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

// This job will run at 8 AM every day
cron.schedule("44 23 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 0);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    console.log("Sending reminders to:", listOfEmails);

    for (const email of listOfEmails) {
      try {
        const subject = "⏳ You have pending friend requests on DevTinder!";
        const body = `
          <div style="font-family: Arial, sans-serif; color: #333; background-color: #f7f7f7; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
              <h2 style="text-align: center; color: #333;">Hey there! 👋</h2>
              <p style="font-size: 16px; line-height: 1.5;">You have new friend requests awaiting your response on <strong>DevTinder</strong>. Don't leave your connections hanging!</p>
              <p style="font-size: 16px; line-height: 1.5;">Click the button below to review and respond to your pending requests:</p>
              <div style="text-align: center;">
                <a href="https://tinderdev.in/requests" style="display:inline-block;padding:12px 24px;background-color:#007bff;color:#ffffff;text-decoration:none;border-radius:5px;font-size:18px;">View Requests</a>
              </div>
              <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">If you’ve already responded, please ignore this email.</p>
              <p style="font-size: 14px; color: #777; text-align: center;">Happy Connecting! 🚀</p>
              <hr style="margin: 20px 0; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #aaa; text-align: center;">This is an automated reminder. Please do not reply to this email.</p>
            </div>
          </div>
        `;
        
        const res = await sendEmail.run(subject, body, email);
        console.log(`Email sent to ${email}:`, res);
      } catch (err) {
        console.error(`Failed to send email to ${email}:`, err);
      }
    }
  } catch (err) {
    console.error("Error in cron job:", err);
  }
});

// cron.schedule("* *  * * *", () => {
//     console.log("Cron job running..." + new Date());
// });
    