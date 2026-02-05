import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: {
        email: "hello@demomailtrap.co",
        name: "Mock MERN Auth",
      },
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken,
      ),
      category: "Email Verification",
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: {
        email: "hello@demomailtrap.co",
        name: "Mock MERN Auth",
      },
      to: recipient,
      template_uuid: "0d10a7fc-8350-4517-9149-f4bc479f822d",
      template_variables: {
        company_info_name: "Test_Company_info_name",
        name: "Test_Name",
      },  
    });
    console.log("Email sent:", response);
  } catch (error) {
    console.error("Failed to send verification email:", error.message);
  }
};
