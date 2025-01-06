const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { firstName, email, type, comment } = req.body;

    if (!firstName || !email || !type || !comment) {
      return res
        .status(400)
        .json({ type: "error", message: "All fields are required." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.RECEIVING_EMAIL,
      subject: `New Contact Form Submission: ${type}`,
      text: `Name: ${firstName}\nEmail: ${email}\nMessage: ${comment}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res
        .status(200)
        .json({ type: "success", message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ type: "error", message: "Failed to send email." });
    }
  } else {
    // Handle unsupported methods
    res.setHeader("Allow", ["POST"]);
    return res
      .status(405)
      .json({ type: "error", message: `Method ${req.method} Not Allowed` });
  }
}
