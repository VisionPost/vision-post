import { Request, Response } from "express";
import { Webhook } from "standardwebhooks";
import { prisma } from "@repo/db";

const webhook = new Webhook(process.env.DODO_PAYMENTS_WEBHOOK_KEY!);

export async function webhookHandler(req: Request, res: Response) {
    try {
        const rawBody = req.body.toString('utf8');
        const headers = req.headers as Record<string,string>;

        const webhookHeaders = {
            'webhook-id':       headers['webhook-id']       || '',
            'webhook-signature':headers['webhook-signature']|| '',
            'webhook-timestamp':headers['webhook-timestamp']|| '',
        };

        await webhook.verify(rawBody, webhookHeaders);

        const payload = JSON.parse(rawBody);
        console.log("payload data:", payload);
        const eventType = payload.type;
        const eventData = payload.data;

        if(eventData.payload_type === 'Subscription') {
            console.log("Subscription plan activated!");
            const user = await prisma.user.update({
                where: { email: eventData.customer.email },
                data: { dodoCustomerId: eventData.customer.customer_id }
            });
            switch (eventType) {
                case "subscription.active":
                    await handleActiveSubscription(eventData, user.id);
                    break;

                case "subscription.renewed":
                    await handleRenewedSubscription(eventData, user.id);
                    break;

                case "subscription.on_hold":
                    await prisma.subscription.update({
                        where: { userId: user.id },
                        data: { 
                            SubscriptionId: eventData.subscription_id,
                            status: "on_hold", 
                            currentPeriodStart: new Date(eventData.previous_billing_date),
                            currentPeriodEnd: new Date(eventData.next_billing_date),
                            cancelAtPeriodEnd: eventData.cancel_at_next_billing_date,
                        }
                    });
                    break;    
                
                case "subscription.paused":
                    await prisma.subscription.update({
                        where: { userId: user.id },
                        data: { 
                            SubscriptionId: eventData.subscription_id,
                            status: "paused",
                            currentPeriodStart: new Date(eventData.previous_billing_date),
                            currentPeriodEnd: new Date(eventData.next_billing_date),
                            cancelAtPeriodEnd: eventData.cancel_at_next_billing_date, 
                        },
                    });
                    break;
                case "subscription.failed":
                    await prisma.subscription.upsert({
                        where: { userId: user.id },
                        update: {
                            SubscriptionId: eventData.subscription_id,
                            status: "failed",
                            currentPeriodStart: new Date(eventData.previous_billing_date),
                            currentPeriodEnd: new Date(eventData.next_billing_date),
                            cancelAtPeriodEnd: eventData.cancel_at_next_billing_date,
                        },
                        create: {
                            SubscriptionId: eventData.subscription_id,
                            status: "active",
                            planId: eventData.product_id,
                            currentPeriodStart: new Date(eventData.previous_billing_date),
                            currentPeriodEnd: new Date(eventData.next_billing_date),
                            cancelAtPeriodEnd: eventData.cancel_at_next_billing_date,
                            userId: user.id,
                        },
                    });
                    break;
                      
                case "subscription.expired":
                    await prisma.subscription.update({
                        where: { userId: user.id },
                        data: { 
                            SubscriptionId: eventData.subscription_id,
                            status: "expired",
                            currentPeriodStart: new Date(eventData.previous_billing_date),
                            currentPeriodEnd: new Date(eventData.next_billing_date),
                            cancelAtPeriodEnd: eventData.cancel_at_next_billing_date,
                         },
                    });
                    break;    
            };
        };

        res.status(200).json({ message: 'Webhook processed successfully' });
    } catch (e) {
        console.error("Webhook verification failed:", e);
        res.status(200).json({ message: 'Webhook processed successfully' });
    }
};

async function handleActiveSubscription(data: any, userId: string) {
    await prisma.subscription.upsert({
        where: { userId: userId },
        update: {
            SubscriptionId: data.subscription_id,
            status: "active",
            planId: data.product_id,
            currentPeriodStart: new Date(data.previous_billing_date),
            currentPeriodEnd: new Date(data.next_billing_date),
            cancelAtPeriodEnd: data.cancel_at_next_billing_date,
        },
        create: {
            SubscriptionId: data.subscription_id,
            status: "active",
            planId: data.product_id,
            currentPeriodStart: new Date(data.previous_billing_date),
            currentPeriodEnd: new Date(data.next_billing_date),
            cancelAtPeriodEnd: data.cancel_at_next_billing_date,
            userId: userId,
        },
    });
};

async function handleRenewedSubscription(data: any, userId: string) {
    await prisma.subscription.upsert({
        where: { userId: userId },
        update: {
            SubscriptionId: data.subscription_id,
            currentPeriodStart: new Date(data.previous_billing_date),
            currentPeriodEnd: new Date(data.next_billing_date),
            status: "active",
            cancelAtPeriodEnd: data.cancel_at_next_billing_date,
        },
        create: {
            SubscriptionId: data.subscription_id,
            planId: data.product_id, 
            currentPeriodStart: new Date(data.previous_billing_date),
            currentPeriodEnd: new Date(data.next_billing_date),
            cancelAtPeriodEnd: data.cancel_at_next_billing_date,
            status: "active",
            userId: userId,
        },
    });
};

