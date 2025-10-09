# AZUL Payment Component - Documentation

## Overview

The AZUL Payment Component is a reusable, secure payment integration for the PCCS website that allows users to make donations through the AZUL Payment Gateway. The component follows PCCS brand guidelines and provides a seamless payment experience.

## Features

- ✅ **Secure Payment Processing** - HMAC SHA-512 authentication
- ✅ **Brand-Compliant Design** - Follows PCCS color scheme (#1E1E8C, #2ECC40)
- ✅ **Fully Reusable** - Can be used anywhere in the application
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Responsive Design** - Works on all devices
- ✅ **Loading States** - Clear visual feedback
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Callback Pages** - Success, declined, and cancel pages

## Installation

All components are already installed. No additional dependencies required.

## Configuration

### Environment Variables

Create or update `.env.local` with:

```env
# AZUL Payment Gateway - TEST Environment
NEXT_PUBLIC_AZUL_ENVIRONMENT=test
NEXT_PUBLIC_AZUL_MERCHANT_ID=39038540035
NEXT_PUBLIC_AZUL_MERCHANT_NAME=Punta Cana Christian School
NEXT_PUBLIC_AZUL_MERCHANT_TYPE=ECommerce
NEXT_PUBLIC_AZUL_CURRENCY_CODE=$
NEXT_PUBLIC_AZUL_PAYMENT_URL=https://pruebas.azul.com.do/paymentpage/Default.aspx

# Private keys (server-side only)
AZUL_AUTH_KEY=your-secret-key-here

# Callback URLs
NEXT_PUBLIC_AZUL_APPROVED_URL=http://localhost:3000/Approved
NEXT_PUBLIC_AZUL_DECLINED_URL=http://localhost:3000/Declined
NEXT_PUBLIC_AZUL_CANCEL_URL=http://localhost:3000/Cancel
```

**Important**: Never commit `.env.local` to version control!

For production, update:
- `NEXT_PUBLIC_AZUL_PAYMENT_URL` to production URL
- Callback URLs to production domain
- `AZUL_AUTH_KEY` to production key

## Usage

### Basic Usage

```tsx
import { AzulPaymentButton } from '@/components/payment';

function MyComponent() {
  return (
    <AzulPaymentButton
      amount={50}
      description="Donation to PCCS"
    >
      Donate $50
    </AzulPaymentButton>
  );
}
```

### With Custom Fields

```tsx
<AzulPaymentButton
  amount={100}
  description="Monthly Scholarship"
  customOrderId="SCHOLARSHIP-2024-001"
  customField1={{
    label: 'Donor Name',
    value: 'John Doe'
  }}
  customField2={{
    label: 'Dedication',
    value: 'In honor of...'
  }}
>
  Donate $100
</AzulPaymentButton>
```

### With Callbacks

```tsx
<AzulPaymentButton
  amount={250}
  description="Building Fund"
  onSuccess={(response) => {
    console.log('Payment successful!', response);
    // Track analytics, send confirmation email, etc.
  }}
  onError={(error) => {
    console.error('Payment failed:', error);
    // Log error, show notification, etc.
  }}
>
  Support Building Fund
</AzulPaymentButton>
```

### Custom Styling

```tsx
<AzulPaymentButton
  amount={500}
  description="Major Donation"
  className="w-full text-xl py-6"
>
  Make a Major Impact
</AzulPaymentButton>
```

## Component API

### AzulPaymentButton Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | `number` | Yes | Payment amount in dollars |
| `description` | `string` | Yes | Payment description |
| `customOrderId` | `string` | No | Custom order identifier |
| `customField1` | `{label: string, value: string}` | No | First custom field |
| `customField2` | `{label: string, value: string}` | No | Second custom field |
| `onSuccess` | `(response: AzulPaymentResponse) => void` | No | Success callback |
| `onError` | `(error: Error) => void` | No | Error callback |
| `className` | `string` | No | Additional CSS classes |
| `children` | `React.ReactNode` | No | Button content (default: "Pay $amount") |

## File Structure

```
src/
├── lib/
│   └── azul/
│       ├── types.ts           # TypeScript interfaces
│       ├── hash.ts            # HMAC SHA-512 utilities
│       ├── validator.ts       # Response validation
│       ├── config.ts          # Configuration
│       └── index.ts           # Main export
├── components/
│   └── payment/
│       ├── AzulPaymentButton.tsx  # Main button component
│       ├── AzulPaymentForm.tsx    # Hidden POST form
│       └── index.ts               # Component exports
└── app/
    ├── Approved/page.tsx      # Success page
    ├── Declined/page.tsx      # Declined page
    └── Cancel/page.tsx        # Cancel page
```

## Payment Flow

1. **User clicks payment button** → Component validates amount and configuration
2. **Generate AuthHash** → HMAC SHA-512 hash with merchant data
3. **Create hidden form** → POST form with all payment data
4. **Auto-submit to AZUL** → User redirected to AZUL payment page
5. **User completes payment** → AZUL processes card
6. **Callback redirect** → User returns to `/Approved`, `/Declined`, or `/Cancel`
7. **Validate response** → Verify AuthHash to prevent tampering
8. **Show result** → Display payment confirmation or error

## Callback Pages

### /Approved
- Validates payment response
- Shows success message
- Displays transaction details
- Provides "Return Home" and "Make Another Donation" buttons

### /Declined
- Shows error message with reason
- Displays helpful tips
- Provides "Try Again" button
- Links to contact support

### /Cancel
- Confirms no charges were made
- Explains cancellation
- Shows "Why Your Support Matters"
- Encourages user to try again

## Security

### AuthHash Generation
All requests use HMAC SHA-512 to generate an AuthHash:
- Prevents tampering
- Validates request integrity
- Uses secret key from environment

### Response Validation
All responses from AZUL are validated:
- AuthHash verification
- Required field checks
- Response code validation

### Best Practices
- ✅ Keep `AZUL_AUTH_KEY` secret
- ✅ Never expose private key to client
- ✅ Validate all responses
- ✅ Use HTTPS in production
- ✅ Monitor failed transactions

## Testing

### Test Mode
The component is currently configured for AZUL's test environment:
- URL: `https://pruebas.azul.com.do/paymentpage/Default.aspx`
- MerchantID: `39038540035`

### Test Cards
Use AZUL's test cards to simulate different scenarios:
- **Approved**: Use valid test card numbers
- **Declined**: Use specific test cards for different error codes
- **Cancel**: Click cancel on payment page

Refer to AZUL documentation for specific test card numbers.

## Brand Guidelines

The component follows PCCS brand guidelines:

### Colors
- **Primary Blue**: `#1E1E8C` - Main buttons and headers
- **Tropical Green**: `#2ECC40` - Accents and success states
- **White**: `#FFFFFF` - Text on colored backgrounds
- **Gray Scale**: Various grays for text and backgrounds

### Typography
- **Headings**: Bold, large sizes (text-3xl to text-5xl)
- **Body**: Regular weight, readable sizes
- **Buttons**: Semibold, uppercase when needed

### Interactive Elements
- Rounded corners (`rounded-full` for buttons, `rounded-xl` for cards)
- Hover effects (scale, shadow)
- Smooth transitions (duration-300)
- Loading states with spinners

## Troubleshooting

### "Payment gateway not configured properly"
- Check `.env.local` exists
- Verify all required environment variables are set
- Restart development server after adding variables

### "Invalid AuthHash"
- Verify `AZUL_AUTH_KEY` matches AZUL's configuration
- Check that all required fields are included in hash
- Ensure no extra spaces or encoding issues

### Form doesn't submit
- Check browser console for errors
- Verify `NEXT_PUBLIC_AZUL_PAYMENT_URL` is correct
- Ensure payment button is not disabled

### Callback pages not loading
- Verify callback URLs match environment variables
- Check that pages exist at `/Approved`, `/Declined`, `/Cancel`
- Ensure routes are not blocked

## Examples in the Codebase

### DonationsSection
See [`src/components/sections/donations/DonationsSection.tsx`](../src/components/sections/donations/DonationsSection.tsx) for a complete implementation with multiple donation amounts.

```tsx
<AzulPaymentButton
  amount={25}
  description="Donation - School Supplies"
  customField1={{
    label: 'Donation Type',
    value: 'School Supplies',
  }}
>
  Donate $25
</AzulPaymentButton>
```

## Migration to Production

When ready for production:

1. **Get Production Credentials**
   - Contact AZUL for production MerchantID
   - Obtain production AuthKey
   - Get production payment URL

2. **Update Environment Variables**
   ```env
   NEXT_PUBLIC_AZUL_ENVIRONMENT=production
   NEXT_PUBLIC_AZUL_MERCHANT_ID=your-production-id
   NEXT_PUBLIC_AZUL_PAYMENT_URL=https://pagos.azul.com.do/paymentpage/Default.aspx
   AZUL_AUTH_KEY=your-production-key

   # Update callback URLs to production domain
   NEXT_PUBLIC_AZUL_APPROVED_URL=https://yourdomain.com/Approved
   NEXT_PUBLIC_AZUL_DECLINED_URL=https://yourdomain.com/Declined
   NEXT_PUBLIC_AZUL_CANCEL_URL=https://yourdomain.com/Cancel
   ```

3. **Security Checklist**
   - [ ] Environment variables secured
   - [ ] HTTPS enabled
   - [ ] AuthKey never exposed to client
   - [ ] Response validation enabled
   - [ ] Error logging configured
   - [ ] Transaction monitoring set up

4. **Testing Checklist**
   - [ ] Test successful payment
   - [ ] Test declined payment
   - [ ] Test cancelled payment
   - [ ] Verify AuthHash validation
   - [ ] Check all callback pages
   - [ ] Test on mobile devices
   - [ ] Verify email notifications (if implemented)

## Support

For issues or questions:
- Check AZUL integration documentation: [`docs/INTEGRACION_AZUL.md`](./INTEGRACION_AZUL.md)
- Review PCCS brand guidelines: [`docs/brand-guidelines.md`](./brand-guidelines.md)
- Contact AZUL support for payment gateway issues
- Open an issue in the project repository

## License

This component is part of the PCCS website project and follows the same license.
