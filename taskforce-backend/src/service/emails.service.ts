import { config } from "dotenv";
import { ReactNode } from "react";
import { CreateEmailResponse, Resend } from "resend";
import logger from "../utils/logger";
config();

type EmailOptions = {
  to: string;
  subject: string;
  react?: ReactNode;
  html?: string;
};

class EmailService {
  private resend: Resend;
  private email_from: string;

  constructor(api_key: string, from_email: string) {
    this.resend = new Resend(api_key);
    this.email_from = from_email;
  }

  async sendOTP(data: EmailOptions, Template: ReactNode): Promise<CreateEmailResponse> {
    try {
      return this.resend.emails.send({
        from: this.email_from,
        to: data.to,
        subject: data.subject,
        react: Template,
      });
    } catch (error) {
      logger.error("Error sending email with Resend:", error);
      throw error;
    }
  }

  async sendBudgetNotification(email: string, message: string): Promise<void> {
    try {
      await this.resend.emails.send({
        from: this.email_from,
        to: email,
        subject: 'Budget Exceeded Notification',
        html: `<p>${message}</p>`,
      });
    } catch (error) {
      logger.error("Error sending budget notification email:", error);
      throw error;
    }
  }
}

export default new EmailService(
  process.env.RESEND_API_KEY as string,
  process.env.EMAIL_FROM as string
);