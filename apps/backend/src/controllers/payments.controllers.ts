import { Request, Response } from "express";
import { dodopayments } from "./../index";

export async function checkoutSubscription(req: Request, res: Response) {
    try {
        const { email: userEmail } = req.user;
        const { fullName, streetAddress, city, state, zipCode, country } = req.body;

        const response = await dodopayments.subscriptions.create({
            billing: {
                city: city,
                country: country,
                state: state,
                street: streetAddress,
                zipcode: zipCode,
            },
            customer: {
                email: userEmail,
                name: fullName,
            },
            payment_link: true,
            product_id: process.env.DODO_PRODUCT_ID ?? "",
            quantity: 1,
            return_url: process.env.RETURN_URL,
        });
        res.status(200).json(response)
    } catch (e) {
        console.error("error", e);
        res.status(500).json({ error: "Subscription creation failed" });
    };
};