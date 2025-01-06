const nodemailer = require("nodemailer");
console.log("Request body:", req.body);


module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { firstName, email, type, comment } = req.body;

    if (!firstName || !email || !type || !comment) {
      return res.status(400).json({ type: "error", message: "All fields are required." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Add to Vercel Environment Variables
        pass: process.env.EMAIL_PASS, // Add to Vercel Environment Variables
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.RECEIVING_EMAIL, // Add your receiving email in Vercel Environment Variables
      subject: `New Contact Form Submission: ${type}`,
      text: `Name: ${firstName}\nEmail: ${email}\nMessage: ${comment}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ type: "success", message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ type: "error", message: "Failed to send email." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ type: "error", message: `Method ${req.method} Not Allowed` });
  }
};
