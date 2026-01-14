# Navigation Flow Diagram - PCCS Landing

## 📊 Site Navigation Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                        PCCS Website                             │
│                    https://pccs.edu.do                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ├─ Header (Global)
                              │  ├─ Logo → /
                              │  ├─ Navigation Menu
                              │  └─ Sponsor Button → /donations
                              │
┌─────────────────────────────┴───────────────────────────────────┐
│                                                                  │
▼                                                                  ▼
HOME (/)                                                     FOOTER (Global)
├─ Hero Section                                              ├─ Navigation
│  ├─ APPLY NOW → /admissions                               │  ├─ Home → /
│  └─ OUR CLASSES → /courses                                │  ├─ About Us → /about
├─ Features Section                                          │  ├─ Courses → /courses
├─ Mission Section (#mission)                                │  ├─ Admissions → /admissions
├─ Vision Section (#vision)                                  │  └─ Contact → /contact
├─ Values Section (#values)                                  ├─ Explore
└─ Purpose Section (#purpose)                                │  ├─ Gallery → /gallery
                                                             │  ├─ Our Staff → /staff
▼                                                            │  ├─ Donations → /donations
ABOUT US (/about)                                            │  └─ Blog → /blog
├─ Hero Section                                              ├─ Quick Links
├─ Mission Section (#mission)                                │  ├─ Mission → /#mission
├─ Vision Section (#vision)                                  │  ├─ Vision → /#vision
├─ Values Section (#values)                                  │  ├─ Values → /#values
└─ Purpose Section (#purpose)                                │  └─ Purpose → /#purpose
                                                             └─ Contact Info
▼                                                               ├─ Phone: +1 (849) 855 1635
COURSES (/courses)                                             ├─ Email: info@pccs.edu.do
├─ Hero Section                                                └─ Address: Punta Cana
├─ Course Listings
│  ├─ Early Childhood (3-5 years)
│  ├─ Elementary (6-11 years)
│  └─ Middle School (12-14 years)
├─ Each course → Learn More → /admissions
└─ CTA Section
   ├─ Apply Now → /admissions
   └─ Contact Us → /contact

▼
ADMISSIONS (/admissions)
├─ Hero Section with CTA
│  ├─ View Forms → #formularios
│  └─ Call Now → tel:+1-809-917-7855
├─ Documents List
├─ Forms Section (#formularios)
│  ├─ Schedule Appointment (WhatsApp)
│  ├─ Admission Form (Google Forms)
│  ├─ Scholarship Application (Google Forms)
│  └─ Inquiries (Google Forms)
└─ Quick Contact

▼
GALLERY (/gallery)
├─ Hero Section
└─ Gallery Grid

▼
STAFF (/staff)
├─ Hero Section
├─ Staff Profiles (StaffSection)
└─ Join Our Team CTA → /contact

▼
DONATIONS (/donations)
├─ Hero Section
├─ Impact Section
├─ Donation Types Grid
│  ├─ School Supplies
│  ├─ Scholarships
│  ├─ Infrastructure
│  ├─ General Donation
│  └─ Sponsor a Child
├─ Payment Integration (Azul)
│  └─ API: /api/azul/initiate-payment
└─ Fund Distribution Info

▼
CONTACT (/contact)
├─ Hero Section
├─ Contact Information
│  ├─ Phone: +1 (849) 855 1635
│  ├─ Email: info@pccs.edu.do
│  └─ Location Map
├─ Contact Form
└─ Office Hours

▼
BLOG (/blog)
├─ Hero Section
├─ Coming Soon Message
└─ Newsletter Signup

```

## 🔄 Payment Flow

```
DONATIONS (/donations)
       │
       ├─ User selects donation type
       │
       ├─ Click "Donate Now"
       │
       ▼
API: POST /api/azul/initiate-payment
       │
       ├─ Creates donation in database
       ├─ Generates Azul payment form
       │
       ▼
Azul Payment Gateway
       │
       ├─────────────┬─────────────┬─────────────┐
       │             │             │             │
       ▼             ▼             ▼             ▼
  APPROVED       DECLINED      CANCELLED    ERROR
       │             │             │             │
       ▼             ▼             ▼             ▼
/Approved      /Declined      /Cancel         /
       │             │             │
       ├─ Validate   ├─ Validate   ├─ Validate
       │  Response   │  Response   │  Response
       │             │             │
       ▼             ▼             ▼
/Approved/      Show Error     Show Info
[transactionId] + Try Again   + Try Again
       │             │             │
       └─────────────┴─────────────┘
                     │
                     ▼
              Return Home (/)
           or Try Again (/donations)
```

## 📱 Mobile Navigation

```
Mobile Menu Button
       │
       ▼
Mobile Sidebar Opens
       │
       ├─ Home → /
       │
       ├─ About Us (Dropdown)
       │  ├─ Mission → /#mission
       │  ├─ Vision → /#vision
       │  ├─ Values → /#values
       │  └─ Purpose → /#purpose
       │
       ├─ Courses → /courses
       │
       ├─ Admissions → /admissions
       │
       ├─ Gallery → /gallery
       │
       ├─ Contact Us → /contact
       │
       ├─ Sponsor Button → /donations
       │
       └─ Contact Info Section
          ├─ Phone
          ├─ Email
          └─ Address
```

## 🔗 External Links

### Forms & Applications
- Schedule Appointment: `WhatsApp Business (ToChat)`
- Admission Form: `Google Forms`
- Scholarship Application: `Google Forms`
- Inquiries Form: `Google Forms`

### Social Media (to be configured)
- Facebook
- YouTube
- Instagram
- LinkedIn
- Pinterest

## 🎯 Key User Journeys

### Journey 1: Prospective Parent
```
/ (Home)
  → APPLY NOW button
  → /admissions
  → Fill Google Form
  → Schedule WhatsApp appointment
```

### Journey 2: Donor
```
/ (Home)
  → Sponsor button (Header)
  → /donations
  → Select donation type
  → Complete payment
  → /Approved/[transactionId]
```

### Journey 3: Learn About PCCS
```
/ (Home)
  → ABOUT US (Navigation)
  → /about
  → Read Mission/Vision/Values
  → /contact (CTA)
```

### Journey 4: Explore Courses
```
/ (Home)
  → OUR CLASSES button
  → /courses
  → Browse programs
  → Apply Now
  → /admissions
```

## 📍 Anchor Links on Homepage

- `#mission` - Mission Section
- `#vision` - Vision Section
- `#values` - Values Section
- `#purpose` - Purpose Section

## 🚨 Important Notes

1. All routes are now in English for consistency
2. Payment flow includes validation and error handling
3. Mobile menu provides full navigation access
4. Footer includes all main sections + quick links
5. External forms are hosted on Google Forms and WhatsApp Business

---

**Last Updated**: 2025-11-14
**Version**: 2.0 (English Routes)
