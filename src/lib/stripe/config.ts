/**
 * Stripe Client Configuration
 * Public configuration that can be used on the client side
 */

export function getStripePublicConfig() {
  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  return {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    successUrl: process.env.NEXT_PUBLIC_STRIPE_SUCCESS_URL || `${baseUrl}/stripe/success`,
    cancelUrl: process.env.NEXT_PUBLIC_STRIPE_CANCEL_URL || `${baseUrl}/stripe/cancel`,
  };
}
