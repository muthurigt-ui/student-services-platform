// ==================== FLUTTERWAVE CONFIGURATION ====================
// Replace these with your actual Flutterwave keys from https://dashboard.flutterwave.com

const PAYMENT_CONFIG = {
   // Public Key (starts with FLWPUBK_TEST- for test mode)
   publicKey: 'FLWPUBK_TEST-YOUR_PUBLIC_KEY_HERE',

   // Pricing plans (in USD)
   plans: {
      basic: {
         name: 'Basic Plan',
         amount: 19,
         currency: 'USD',
         interval: 'monthly',
         description: '5 essay reviews, basic materials, flashcards, email support'
      },
      pro: {
         name: 'Pro Plan',
         amount: 49,
         currency: 'USD',
         interval: 'monthly',
         description: 'Unlimited reviews, full suite, priority support'
      },
      premium: {
         name: 'Premium Plan',
         amount: 99,
         currency: 'USD',
         interval: 'monthly',
         description: 'Everything + coaching, 24/7 support, early access'
      }
   },

   // Redirect URLs (update after deployment)
   redirectUrl: window.location.origin + '/success.html',

   // Business details
   businessName: 'StudentSuccess Platform',
   businessLogo: 'https://your-logo-url.com/logo.png', // Optional
};

// ==================== INSTRUCTIONS ====================
/*
SETUP STEPS:

1. Create a Flutterwave account at https://flutterwave.com (FREE)
   - Click "Get Started"
   - Select "Kenya" as your country
   - Fill in your business details
   - Verify your email

2. Get your Public Key:
   - Log in to https://dashboard.flutterwave.com
   - Go to Settings → API Keys
   - Copy your "Public Key" (starts with FLWPUBK_TEST- for test mode)
   - Replace 'FLWPUBK_TEST-YOUR_PUBLIC_KEY_HERE' above

3. Configure your business:
   - Go to Settings → Business Details
   - Add your business name, logo, and description
   - Add your bank account for payouts (Kenyan bank account)

4. Test the integration:
   - Use test cards from Flutterwave documentation
   - Test card: 5531886652142950
   - CVV: 564
   - Expiry: Any future date
   - PIN: 3310
   - OTP: 12345

5. Currency options:
   - USD (recommended for US/UK/China clients)
   - GBP (for UK clients)
   - EUR (for European clients)
   - KES (for Kenyan clients)
   - Multiple currencies supported!

6. For production (going live):
   - Complete KYC verification in dashboard
   - Switch to live mode
   - Get live public key (starts with FLWPUBK-)
   - Update this config file with live key

FEES:
- International cards: 3.8% per transaction
- Local cards (Kenya): 1.4% per transaction
- No setup fees, no monthly fees

SUPPORT:
- Documentation: https://developer.flutterwave.com
- Support: support@flutterwave.com
- Dashboard: https://dashboard.flutterwave.com
*/

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
   module.exports = PAYMENT_CONFIG;
}
