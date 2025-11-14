# Donation Types Setup for Sponsorship Impact Panel

## Overview
The Sponsorship Impact Panel requires specific donation types to be created in the database for the payment functionality to work correctly.

## Required Donation Types

The following donation types need to be added to the database via the API endpoint `/api/donation-types/seed` or manually through the database:

### 1. School Materials - $50
- **Amount**: 50.00
- **Name**: "School Materials"
- **Description**: "Provide essential school materials for students"

### 2. School Meals - $150
- **Amount**: 150.00
- **Name**: "One Month of School Meals"
- **Description**: "Feed students for one month"

### 3. English & Technology Resources - $500
- **Amount**: 500.00
- **Name**: "English & Technology Resources"
- **Description**: "Support language learning and technology access"

### 4. Classroom Materials - $2,000
- **Amount**: 2000.00
- **Name**: "Classroom Materials for a Year"
- **Description**: "Equip a classroom with necessary materials for an entire year"

### 5. Student Sponsorship - $7,000
- **Amount**: 7000.00
- **Name**: "Sponsor One Student (Full Year)"
- **Description**: "Cover all expenses for one student for a full academic year"

### 6. Teacher Salary - $18,000
- **Amount**: 18000.00
- **Name**: "Sponsor One Teacher's Annual Salary"
- **Description**: "Support a qualified teacher for one year"

### 7. Infrastructure Development - $100,000
- **Amount**: 100000.00
- **Name**: "Build or Expand PCCS Schools"
- **Description**: "Major infrastructure development for PCCS schools in the Dominican Republic"

## How to Create These Donation Types

### Option 1: Using the Seed API (Recommended)
If you have a seed endpoint implemented at `/api/donation-types/seed`, you can POST the above donation types.

### Option 2: Manual Database Entry
Directly insert these records into your donation_types table using your database management tool.

### Option 3: Admin Panel
If you have an admin panel for managing donation types, create these entries through the UI.

## Implementation Details

### SponsorshipCard Component
Location: `/src/components/donations/SponsorshipCard.tsx`

The component:
- Receives a `donationType` prop that is matched based on the numeric amount
- Displays a payment button only if a matching donation type exists
- Shows a disabled button if no matching donation type is found
- Features a loading skeleton while donation types are being fetched

### Mapping Logic
Location: `/src/app/donations/page.tsx`

The `getSponsorshipDonationType()` function:
```typescript
const getSponsorshipDonationType = (level: { amount: string; description: string }): DonationType | undefined => {
  const numericAmount = getNumericAmount(level.amount);
  return donationTypes.find(type => type.amount === numericAmount);
};
```

This function:
1. Extracts the numeric value from the sponsorship level amount string (e.g., "$50" → 50)
2. Searches for a donation type with a matching amount
3. Returns the matching donation type or `undefined` if not found

## Verification

After creating the donation types:
1. Visit `/donations` page
2. Scroll to "Sponsorship Impact Panel"
3. Verify that all 7 sponsorship cards display active "Donate Now" buttons (not disabled gray buttons)
4. Click a button to test the payment flow

## Translation Support

All sponsorship levels are fully translated:
- English translations: `/src/lib/i18n/translations/en.ts`
- Spanish translations: `/src/lib/i18n/translations/es.ts`

The descriptions shown to users come from the translation files, while the payment descriptions sent to the payment gateway combine "Sponsorship - " with the translated description.
