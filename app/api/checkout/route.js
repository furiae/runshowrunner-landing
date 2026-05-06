import Stripe from "stripe";

const PLANS = {
  starter: {
    name: "Starter",
    amount: 150000, // $1500 in cents
    description: "1 episode per week, fully produced",
  },
  pro: {
    name: "Pro",
    amount: 250000, // $2500 in cents
    description: "Up to 4 episodes per month, fully produced",
  },
};

export async function POST(request) {
  try {
    // Initialize Stripe at runtime, not build time
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { email, plan, successUrl, cancelUrl } = await request.json();

    // Validate inputs
    if (!email || !plan || !successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!PLANS[plan]) {
      return new Response(
        JSON.stringify({ error: "Invalid plan" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const planData = PLANS[plan];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planData.name,
              description: planData.description,
            },
            unit_amount: planData.amount,
            recurring: {
              interval: "month",
              trial_period_days: 14, // 2-week free trial
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Checkout failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
