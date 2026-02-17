import resend from "@/constants/resend.js";

type Params = {
  to: string;
  subject: string;
  text: string;
  html: string;
};
export const sendMail = async ({ to, subject, text, html }: Params) =>
  await resend.emails.send({
    from: "FormAuth <onboarding@resend.dev>",
    to: "delivered@resend.dev",
    subject,
    html,
  });
