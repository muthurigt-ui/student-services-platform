// ==================== STRIPE CONFIGURATION ====================
// Replace these with your actual Stripe keys from https://dashboard.stripe.com/test/apikeys

const STRIPE_CONFIG = {
    // Publishable Key (starts with pk_test_ for test mode)
    publishableKey: 'pk_test_YOUR_PUBLISHABLE_KEY_HERE',

    // Price IDs for each subscription tier
    // Create these in Stripe Dashboard: Products → Add Product → Add Recurring Price
    prices: {
        basic: 'price_BASIC_PRICE_ID',      // $19/month
        pro: 'price_PRO_PRICE_ID',          // $49/month
        premium: 'price_PREMIUM_PRICE_ID'   // $99/month
    },

    // Success and cancel URLs (update after deployment)
    successUrl: window.location.origin + '/success.html',
    cancelUrl: window.location.origin + '/index.html#pricing'
};

// ==================== INSTRUCTIONS ====================
/*
SETUP STEPS:

1. Create a Stripe account at https://stripe.com (free)

2. Get your Publishable Key:
   - Go to https://dashboard.stripe.com/test/apikeys
   - Copy the "Publishable key" (starts with pk_test_)
   - Replace 'pk_test_YOUR_PUBLISHABLE_KEY_HERE' above

3. Create Products and Prices:
   - Go to https://dashboard.stripe.com/test/products
   - Click "Add product"
   
   For BASIC plan:
   - Name: "Basic Plan"
   - Description: "5 essay reviews, basic materials, flashcards"
   - Pricing: Recurring, $19/month
   - Copy the Price ID (starts with price_) and replace 'price_BASIC_PRICE_ID'
   
   For PRO plan:
   - Name: "Pro Plan"
   - Description: "Unlimited reviews, full suite, priority support"
   - Pricing: Recurring, $49/month
   - Copy the Price ID and replace 'price_PRO_PRICE_ID'
   
   For PREMIUM plan:
   - Name: "Premium Plan"
   - Description: "Everything + coaching, 24/7 support"
   - Pricing: Recurring, $99/month
   - Copy the Price ID and replace 'price_PREMIUM_PRICE_ID'

4. Test the integration:
   - Use test card: 4242 4242 4242 4242
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code

5. For production:
   - Switch to live mode in Stripe Dashboard
   - Get live publishable key (starts with pk_live_)
   - Create live products and prices
   - Update this config file
*/

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = STRIPE_CONFIG;
}
