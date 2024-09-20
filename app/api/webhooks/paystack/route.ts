import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import crypto from 'crypto';

import db from "@/db/drizzle";
import { userSubscription } from "@/db/schema";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(req: Request) {
  const body = await req.text();
  const paystackSignature = headers().get("x-paystack-signature");

  console.log("Received Paystack webhook:", body);

  // Verify Paystack webhook signature
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(body)
    .digest('hex');

  if (hash !== paystackSignature) {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);
  console.log("Processed event:", event.event);
  if (event.event === "charge.success") {
    // Handle real charge.success event
  } else if (event.event === "test") {
    console.log("Received test webhook from Paystack");

  if (event.event === "subscription.create") {
    const { customer, plan, subscription } = event.data;

    if (!customer.email) {
      return new NextResponse("User email is required", { status: 400 });
    }

    await db.insert(userSubscription).values({
      userId: customer.email, 
      CustomerId: customer.customer_code,
      SubscriptionId: subscription.subscription_code,
      PriceId: plan.plan_code,
      CurrentPeriodEnd: new Date(event.data.next_payment_date),
    });
  }

  if (event.event === "subscription.not_renew" || event.event === "subscription.disable") {
    await db.update(userSubscription).set({
      CurrentPeriodEnd: new Date(event.data.cancellation_date || event.data.next_payment_date),
    }).where(eq(userSubscription.SubscriptionId, event.data.subscription_code));
  }

  if (event.event === "invoice.payment_succeeded") {
    await db.update(userSubscription).set({
      CurrentPeriodEnd: new Date(event.data.next_payment_date),
      PriceId: event.data.plan.plan_code, // Update PriceId in case the plan has changed
    }).where(eq(userSubscription.SubscriptionId, event.data.subscription.subscription_code));
  }
  }
  return new NextResponse(null, { status: 200 });
};