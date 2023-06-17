import { initMongoose } from "@/lib/mongoose";
import { buffer } from "micro";
import Order from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  await initMongoose();
  const signingSecret =
    "whsec_544d29a23a1aab3d67458331af4a3aafa66c8815fb3859edba442dad6ed18497";
  const payload = await buffer(req);
  const signature = req.headers["stripe-signature"];
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    signingSecret
  );
  if (event?.type === "checkout.session.completed") {
    const metadata = event.data?.object?.metadata;
    const paymentStatus = event.data?.object?.payment_status;
    if (metadata?.orderId && paymentStatus === "paid") {
      await Order.findByIdAndUpdate(metadata.orderId, { paid: 1 });
      console.log(event);
    }
  }
  res.json("ok");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
