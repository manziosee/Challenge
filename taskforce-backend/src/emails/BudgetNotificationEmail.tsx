import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import React from "react";

export interface BudgetNotificationEmailProps {
  message: string;
}

const BudgetNotificationEmail: React.FC<BudgetNotificationEmailProps> = ({ message }) => {
  return (
    <Html>
      <Head />
      <Preview>Budget Exceeded Notification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={company}>TaskForce Wallet</Text>
          <Heading style={heading}>Budget Exceeded Notification</Heading>
          <Text style={messageStyle}>{message}</Text>
          <Text style={paragraph}>Please review your budget and adjust accordingly.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BudgetNotificationEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
  textAlign: "center" as const,
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #ddd",
  borderRadius: "5px",
  marginTop: "20px",
  width: "480px",
  maxWidth: "100%",
  margin: "0 auto",
  padding: "12% 6%",
};

const company = {
  fontWeight: "bold",
  fontSize: "18px",
  textAlign: "center" as const,
};

const heading = {
  textAlign: "center" as const,
};

const messageStyle = {
  textAlign: "center" as const,
  margin: "16px 0",
};

const paragraph = {
  color: "#444",
  letterSpacing: "0",
  padding: "0 40px",
  margin: "0",
  textAlign: "center" as const,
};