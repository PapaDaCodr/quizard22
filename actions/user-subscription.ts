"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { absoluteUrl } from "@/lib/utils";
import { getUserSubscription } from "@/db/queries";
import axios from 'axios'; 

const returnUrl = absoluteUrl("/shop");
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; 
const PAYSTACK_CUSTOM_LINK = "https://paystack.com/pay/quizard-pro";
const QUIZARD_PRO_PLAN_CODE = process.env.QUIZARD_PRO_PLAN_CODE

export const createPaystackUrl = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const userSubscription = await getUserSubscription();

  if (userSubscription && userSubscription.CustomerId) {
    // For existing customers, we'll create a manage subscription link
    try {
      const response = await axios.post(
        'https://api.paystack.co/subscription',
        {
          customer: userSubscription.CustomerId,
          plan: 'QUIZARD_PRO_PLAN_CODE', 
        },
        {
          headers: {
            Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return { data: response.data.data.manage_subscription_url };
    } catch (error) {
      console.error('Error creating manage subscription URL:', error);
      throw new Error('Failed to create manage subscription URL');
    }
  }

  // For new customers, we'll use the custom Paystack link
  return { data: PAYSTACK_CUSTOM_LINK };
};