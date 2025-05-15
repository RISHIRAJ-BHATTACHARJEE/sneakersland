import { Request, Response } from "express";
import { createMockOrder } from "../utils/paymentService";
import crypto from "crypto";

// Create a mock payment order for testing
export const createPaymentOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { amount, currency = "INR" } = req.body; // Amount in paise (1 INR = 100 paise)

    if (!amount) {
      res.status(400).json({ message: "Amount is required" });
      return;
    }

    // Call the mock Razorpay order creation function
    const order = createMockOrder(amount, currency);

    // Send back the mock order ID and Razorpay key
    res.status(200).json({
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID || "mock_key_for_testing", // Use a mock key for testing
    });
  } catch (error) {
    console.error("Error creating payment order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleWebhook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "mock_webhook_secret"; // Mock secret key for testing

  try {
    // Simulating Razorpay webhook signature verification
    const hmac = crypto.createHmac("sha256", secret);
    const signature = req.headers["x-razorpay-signature"] as string;

    hmac.update(JSON.stringify(req.body));
    const generatedSignature = hmac.digest("hex");

    // Simulating valid signature
    if (generatedSignature !== signature) {
      res.status(400).json({ message: "Invalid signature" });
      return;
    }

    // Handle mock event: payment captured
    const event = "payment.captured"; // Simulate a successful payment event
    if (event === "payment.captured") {
      console.log(
        "Payment captured (mock) for order",
        req.body.payload.payment.entity.order_id
      );
      // Simulate successful payment processing logic (e.g., update order status)
      res.status(200).send("Payment successful (mock)");
    } else {
      console.log(`Unhandled event type: ${event}`);
      res.status(200).send("Webhook event unhandled");
    }
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).send(`Webhook error: ${error}`);
  }
};
