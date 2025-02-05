import { Resend } from 'resend';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import BudgetNotificationEmail from '../emails/BudgetNotificationEmail';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, message: string) => {
  const emailHtml = ReactDOMServer.renderToStaticMarkup(React.createElement(BudgetNotificationEmail, { message }));

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'default@example.com',
      to,
      subject,
      html: emailHtml,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendBudgetNotificationEmail = async (to: string, message: string) => {
  await sendEmail(to, 'Budget Exceeded Notification', message);
};