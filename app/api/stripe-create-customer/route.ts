// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2022-11-15',
// });

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     // Search for existing customer by email
//     const existingCustomers = await stripe.customers.list({
//       email: body.email,
//       limit: 1,
//     });
//     let customer;
//     let isNew = false;
//     if (existingCustomers.data.length > 0) {
//       // Customer already exists, update metadata with product entitlement
//       customer = existingCustomers.data[0];
//       const updatedCustomer = await stripe.customers.update(customer.id, {
//         metadata: {
//           ...customer.metadata,
//           product_entitlement: body.product_entitlement || 'default',
//         },
//       });
//       return NextResponse.json({ customer: updatedCustomer, message: 'Entitlement added to existing customer' });
//     } else {
//       // Create new customer and add product entitlement
//       customer = await stripe.customers.create({
//         email: body.email,
//         name: body.name,
//         metadata: {
//           ...(body.metadata || {}),
//           product_entitlement: body.product_entitlement || 'default',
//         },
//       });
//       isNew = true;
//       return NextResponse.json({ customer, message: 'Customer created and entitlement added' });
//     }
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }
