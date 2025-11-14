# Components Guide - PCCS Landing

## 📚 Reusable Components Reference

This guide provides documentation for all reusable components in the PCCS Landing project.

---

## Layout Components

### Header Component
**Location**: `src/components/layout/header/Header.tsx`

**Purpose**: Global header with navigation, contact info, and sponsor button.

**Props**:
```typescript
interface HeaderProps {
  className?: string;
}
```

**Features**:
- Top bar with contact information (desktop only)
- Logo with link to home
- Desktop navigation menu
- Sponsor button → /donations
- Mobile menu toggle button

**Usage**:
```tsx
import { Header } from '@/components/layout';

<Header />
```

**Child Components**:
- `ContactInfo` - Top bar contact details
- `SocialLinks` - Social media links
- `Navigation` - Main navigation menu
- `MobileMenu` - Mobile sidebar navigation

---

### Navigation Component
**Location**: `src/components/layout/navigation/Navigation.tsx`

**Purpose**: Desktop navigation menu with dropdown support.

**Menu Structure**:
```typescript
interface MenuItem {
  id: string;
  title: string;
  href: string;
  children?: MenuItem[];
}
```

**Current Menu Items**:
- HOME → `/`
- ABOUT US → `/about` (with dropdown)
  - Mission → `/#mission`
  - Vision → `/#vision`
  - Values → `/#values`
  - Purpose → `/#purpose`
- COURSES → `/courses`
- ADMISSIONS → `/admissions`
- GALLERY → `/gallery`
- CONTACT US → `/contact`

**Features**:
- Hover-activated dropdowns
- Smooth transitions
- Accessible navigation

**Usage**:
```tsx
import { Navigation } from '@/components/layout/navigation/Navigation';

<Navigation />
```

---

### MobileMenu Component
**Location**: `src/components/layout/header/MobileMenu.tsx`

**Purpose**: Responsive sidebar navigation for mobile devices.

**Props**:
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**Features**:
- Slide-in animation
- Expandable submenus
- Contact information section
- Sponsor button
- Overlay backdrop

**Usage**:
```tsx
import { MobileMenu } from '@/components/layout/header/MobileMenu';

const [isOpen, setIsOpen] = useState(false);

<MobileMenu
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
```

---

### Footer Component
**Location**: `src/components/layout/footer/Footer.tsx`

**Purpose**: Global footer with navigation, contact info, and branding.

**Features**:
- Logo and description
- Three-column navigation
- Contact information
- Social media links

**Footer Sections**:
1. **Navigation**: Home, About Us, Courses, Admissions, Contact
2. **Explore**: Gallery, Staff, Donations, Blog
3. **Quick Links**: Mission, Vision, Values, Purpose

**Usage**:
```tsx
import { Footer } from '@/components/layout';

<Footer />
```

---

### ContactInfo Component
**Location**: `src/components/layout/header/ContactInfo.tsx`

**Purpose**: Display contact information in header.

**Data Source**: `src/app/constant.tsx` → `contactInfo` array

**Usage**:
```tsx
import { ContactInfo } from '@/components/layout/header/ContactInfo';

<ContactInfo />
```

---

### SocialLinks Component
**Location**: `src/components/layout/header/SocialLinks.tsx`

**Purpose**: Display social media icons and links.

**Supported Platforms**:
- Facebook
- YouTube
- Instagram
- LinkedIn
- Pinterest

**Note**: Links currently point to `#` and need to be configured.

**Usage**:
```tsx
import { SocialLinks } from '@/components/layout/header/SocialLinks';

<SocialLinks />
```

---

## Section Components

### HeroSection Component
**Location**: `src/components/sections/hero/HeroSection.tsx`

**Purpose**: Animated hero section with image carousel and CTA buttons.

**Props**:
```typescript
interface HeroSectionProps {
  className?: string;
}
```

**Features**:
- Image carousel (2 images with crossfade)
- Animated text rotation ("Kids", "Child", "Youth")
- Two CTA buttons
- Decorative SVG wave at bottom

**Carousel Images**:
- PCCS-12.JPG
- PCCS-56.JPG

**CTA Buttons**:
- APPLY NOW → `/admissions`
- OUR CLASSES → `/courses`

**Usage**:
```tsx
import { HeroSection } from '@/components/sections';

<HeroSection />
```

---

### MissionSection Component
**Location**: `src/components/sections/mission/MissionSection.tsx`

**Purpose**: Display school mission statement.

**Props**:
```typescript
interface MissionSectionProps {
  className?: string;
}
```

**Features**:
- Section ID: `#mission`
- Gradient background
- Full-width section

**Usage**:
```tsx
import { MissionSection } from '@/components/sections';

<MissionSection />
```

---

### VisionSection Component
**Location**: `src/components/sections/vision/VisionSection.tsx`

**Purpose**: Display school vision statement.

**Props**:
```typescript
interface VisionSectionProps {
  className?: string;
}
```

**Features**:
- Section ID: `#vision`
- White background

**Usage**:
```tsx
import { VisionSection } from '@/components/sections';

<VisionSection />
```

---

### ValuesSection Component
**Location**: `src/components/sections/values/ValuesSection.tsx`

**Purpose**: Display core values.

**Props**:
```typescript
interface ValuesSectionProps {
  className?: string;
}
```

**Features**:
- Section ID: `#values`
- Gradient background
- Grid layout for values

**Usage**:
```tsx
import { ValuesSection } from '@/components/sections';

<ValuesSection />
```

---

### PurposeSection Component
**Location**: `src/components/sections/purpose/PurposeSection.tsx`

**Purpose**: Display school purpose.

**Props**:
```typescript
interface PurposeSectionProps {
  className?: string;
}
```

**Features**:
- Section ID: `#purpose`
- Gradient background

**Usage**:
```tsx
import { PurposeSection } from '@/components/sections';

<PurposeSection />
```

---

### FeaturesSection Component
**Location**: `src/components/sections/features/FeaturesSection.tsx`

**Purpose**: Highlight key features and benefits.

**Props**:
```typescript
interface FeaturesSectionProps {
  className?: string;
}
```

**Usage**:
```tsx
import { FeaturesSection } from '@/components/sections';

<FeaturesSection />
```

---

### AdmissionsSection Component
**Location**: `src/components/sections/admissions/AdmissionsSection.tsx`

**Purpose**: Complete admissions information and forms.

**Props**:
```typescript
interface AdmissionsSectionProps {
  className?: string;
}
```

**Features**:
- Full-height hero with background image
- Documents list (14 required documents)
- Four external form links:
  1. Schedule Appointment (WhatsApp)
  2. Admission Form (Google Forms)
  3. Scholarship Application (Google Forms)
  4. Inquiries (Google Forms)
- Image gallery
- Anchor: `#formularios`

**External Links**:
```typescript
- WhatsApp: https://services.tochat.be/...
- Admission Form: https://docs.google.com/forms/d/e/...
- Scholarship: https://docs.google.com/forms/d/e/...
- Inquiries: https://docs.google.com/forms/d/e/...
```

**Usage**:
```tsx
import { AdmissionsSection } from '@/components/sections';

<AdmissionsSection />
```

---

### GallerySection Component
**Location**: `src/components/sections/gallery/GallerySection.tsx`

**Purpose**: Photo gallery display.

**Props**:
```typescript
interface GallerySectionProps {
  className?: string;
}
```

**Usage**:
```tsx
import { GallerySection } from '@/components/sections';

<GallerySection />
```

---

### DonationsSection Component
**Location**: `src/components/sections/donations/DonationsSection.tsx`

**Purpose**: Donation types display with payment integration.

**Props**:
```typescript
interface DonationsSectionProps {
  className?: string;
}
```

**Features**:
- Dynamic donation types loading from API
- Image grid with modals
- Azul payment integration
- Loading states

**Donation Images**:
```typescript
interface DonationImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  donationTypeName: string;
}
```

**API Integration**:
- GET `/api/donation-types` - Loads available types

**Child Components**:
- `AzulPaymentButton` - Payment button

**Usage**:
```tsx
import { DonationsSection } from '@/components/sections';

<DonationsSection />
```

---

### StaffSection Component
**Location**: `src/components/sections/staff/StaffSection.tsx`

**Purpose**: Display staff members.

**Props**:
```typescript
interface StaffSectionProps {
  className?: string;
}
```

**Status**: Available but not currently used on main pages.

**Usage**:
```tsx
import { StaffSection } from '@/components/sections';

<StaffSection />
```

---

### AboutSection Component
**Location**: `src/components/sections/about/AboutSection.tsx`

**Purpose**: About us content section.

**Props**:
```typescript
interface AboutSectionProps {
  className?: string;
}
```

**Status**: Available but commented out in pages.

**Usage**:
```tsx
import { AboutSection } from '@/components/sections';

<AboutSection />
```

---

## Payment Components

### AzulPaymentButton Component
**Location**: `src/components/payment/AzulPaymentButton.tsx`

**Purpose**: Initiate Azul payment gateway transactions.

**Props**:
```typescript
interface AzulPaymentButtonProps {
  amount: number;
  description: string;
  donationTypeId?: string;
  className?: string;
  children?: React.ReactNode;
}
```

**Features**:
- Creates donation record in database
- Generates Azul payment form
- Submits form automatically
- Loading state during processing

**API Integration**:
- POST `/api/azul/initiate-payment`

**Usage**:
```tsx
import { AzulPaymentButton } from '@/components/payment';

<AzulPaymentButton
  amount={50}
  description="School Supplies Donation"
  donationTypeId="abc123"
  className="custom-class"
>
  Donate Now
</AzulPaymentButton>
```

**Flow**:
1. User clicks button
2. Button disabled, shows loading
3. API creates donation record
4. API generates payment form HTML
5. Form injected into hidden iframe
6. Form auto-submitted
7. User redirected to Azul gateway

---

## UI Components

### Button Component
**Location**: `src/components/ui/buttons/Button.tsx`

**Purpose**: Generic button component.

**Usage**:
```tsx
import { Button } from '@/components/ui';

<Button>Click Me</Button>
```

---

### Carousel Component
**Location**: `src/components/ui/carousel/Carousel.tsx`

**Purpose**: Image carousel/slider.

**Usage**:
```tsx
import { Carousel } from '@/components/ui';

<Carousel />
```

---

### VideoModal Component
**Location**: `src/components/ui/modals/VideoModal.tsx`

**Purpose**: Modal for video playback.

**Usage**:
```tsx
import { VideoModal } from '@/components/ui';

<VideoModal />
```

---

## Component Organization

### Barrel Exports

**Layout Barrel** (`src/components/layout/index.ts`):
```typescript
export { Header } from './header/Header';
export { Footer } from './footer/Footer';
```

**Sections Barrel** (`src/components/sections/index.ts`):
```typescript
export { HeroSection } from './hero/HeroSection';
export { FeaturesSection } from './features/FeaturesSection';
export { MissionSection } from './mission/MissionSection';
export { VisionSection } from './vision/VisionSection';
export { ValuesSection } from './values/ValuesSection';
export { PurposeSection } from './purpose/PurposeSection';
export { AdmissionsSection } from './admissions/AdmissionsSection';
export { GallerySection } from './gallery/GallerySection';
export { DonationsSection } from './donations/DonationsSection';
export { StaffSection } from './staff/StaffSection';
export { AboutSection } from './about/AboutSection';
```

**Payment Barrel** (`src/components/payment/index.ts`):
```typescript
export { AzulPaymentButton } from './AzulPaymentButton';
```

**UI Barrel** (`src/components/ui/index.ts`):
```typescript
export { Button } from './buttons/Button';
export { Carousel } from './carousel/Carousel';
export { VideoModal } from './modals/VideoModal';
```

---

## Styling Guidelines

### Color Palette

**Primary Colors**:
- Primary Blue: `#1E1E8C`
- Secondary Purple: `#4433BB`
- Tropical Green: `#2ECC40`
- Accent Blue: `#4A90E2`

**Usage in Components**:
```tsx
// Primary actions
style={{ backgroundColor: '#1E1E8C' }}

// Secondary actions
style={{ backgroundColor: '#2ECC40' }}

// Backgrounds
style={{ backgroundColor: '#4433BB' }}
```

### Responsive Design

**Breakpoints** (Tailwind):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Common Patterns**:
```tsx
className="text-sm md:text-base lg:text-lg"
className="px-4 lg:px-8"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## Best Practices

### Component Creation

1. **Use TypeScript**: Define prop interfaces
2. **Export Props**: Make interfaces exportable for reuse
3. **Default Props**: Use default parameters
4. **Accessibility**: Include ARIA labels
5. **Responsive**: Mobile-first approach

### Example Template

```tsx
'use client';

import React from 'react';

interface MyComponentProps {
  title: string;
  className?: string;
}

export function MyComponent({
  title,
  className = ''
}: MyComponentProps) {
  return (
    <section className={`my-section ${className}`}>
      <h2>{title}</h2>
    </section>
  );
}
```

### Performance

- Use `'use client'` only when necessary
- Implement lazy loading for images
- Use Next.js Image component
- Minimize re-renders with memoization

---

## Icons

**Library**: Heroicons v2
**Import**: `@heroicons/react/24/outline` or `/24/solid`

**Common Icons**:
```tsx
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
```

---

## Constants

**Location**: `src/app/constant.tsx`

**Contact Information**:
```typescript
export const contactInfo: ContactInfo[] = [
  {
    icon: '...', // SVG path
    text: '+1 (849) 855 1635',
    href: 'tel:+18498551635'
  },
  // ...
];
```

---

**Last Updated**: 2025-11-14
**Version**: 2.0
