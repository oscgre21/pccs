# Internationalization (i18n) Implementation Guide

## Overview

This document describes the multilanguage implementation for the PCCS Landing website. The system supports English (en) and Spanish (es) translations without external dependencies, using React Context API and TypeScript for type safety.

## Architecture

### Core Components

1. **Type System** (`src/lib/i18n/types.ts`)
   - Defines `Language` type: `'en' | 'es'`
   - `Translations` interface with all translatable content
   - `LanguageContextType` interface for context API

2. **Language Context** (`src/contexts/LanguageContext.tsx`)
   - Manages current language state
   - Provides `useTranslation` hook
   - Persists language preference in localStorage
   - Auto-detects browser language on first visit
   - SSR-safe implementation

3. **Translation Files**
   - `src/lib/i18n/translations/en.ts` - English translations
   - `src/lib/i18n/translations/es.ts` - Spanish translations

4. **Language Selector** (`src/components/ui/LanguageSelector.tsx`)
   - Toggle button component for switching languages
   - Placed in Header (desktop) and MobileMenu (mobile)

## File Structure

```
src/
├── lib/
│   └── i18n/
│       ├── types.ts                    # TypeScript interfaces
│       └── translations/
│           ├── en.ts                   # English translations
│           └── es.ts                   # Spanish translations
├── contexts/
│   └── LanguageContext.tsx             # Context provider and hook
└── components/
    └── ui/
        └── LanguageSelector.tsx        # Language toggle component
```

## Translation Structure

### Categories

The translations are organized into logical sections:

- **common** - Shared UI elements (buttons, labels)
- **navigation** - Menu items and links
- **hero** - Hero section content
- **features** - Features section
- **mission, vision, values, purpose** - About sections
- **admissions** - Admissions page content
- **gallery** - Gallery page content
- **donations** - Donations page content
- **contact** - Contact page content
- **footer** - Footer content
- **payment** - Payment flow (approved, declined, cancelled)
- **about** - About page
- **courses** - Courses page with program details
- **staff** - Staff page
- **blog** - Blog page

### Example Translation Entry

```typescript
// src/lib/i18n/translations/en.ts
export const en: Translations = {
  common: {
    readMore: 'Read More',
    learnMore: 'Learn More',
    contactUs: 'Contact Us',
    // ...
  },
  navigation: {
    home: 'HOME',
    aboutUs: 'ABOUT US',
    // ...
  },
  // ...
};
```

## Usage

### 1. In Components

```typescript
'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export function MyComponent() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div>
      <h1>{t.common.title}</h1>
      <p>{t.about.description}</p>
      <button onClick={() => setLanguage('es')}>
        Switch to Spanish
      </button>
    </div>
  );
}
```

### 2. Dynamic Key Access

For accessing translations dynamically:

```typescript
const { t } = useTranslation();
const key = 'home';
const translation = t.navigation[key as keyof typeof t.navigation];
```

### 3. Type-Safe Translation Access

The system provides full TypeScript autocomplete and type checking:

```typescript
// ✅ Valid - TypeScript will autocomplete
t.common.applyNow

// ❌ Invalid - TypeScript will error
t.common.nonExistentKey
```

## Implementation Steps for New Components

### Step 1: Add Translations

Add new keys to both translation files:

```typescript
// src/lib/i18n/translations/en.ts
export const en: Translations = {
  // ... existing translations
  myNewSection: {
    title: 'My New Section',
    description: 'This is a description',
  },
};

// src/lib/i18n/translations/es.ts
export const es: Translations = {
  // ... existing translations
  myNewSection: {
    title: 'Mi Nueva Sección',
    description: 'Esta es una descripción',
  },
};
```

### Step 2: Update Type Definitions

Add the new section to the `Translations` interface:

```typescript
// src/lib/i18n/types.ts
export interface Translations {
  // ... existing sections
  myNewSection: {
    title: string;
    description: string;
  };
}
```

### Step 3: Use in Component

```typescript
'use client';

import { useTranslation } from '@/contexts/LanguageContext';

export function MyNewComponent() {
  const { t } = useTranslation();

  return (
    <section>
      <h2>{t.myNewSection.title}</h2>
      <p>{t.myNewSection.description}</p>
    </section>
  );
}
```

## Migrated Components

### Layout Components
- ✅ [Header.tsx](../src/components/layout/header/Header.tsx) - Added LanguageSelector
- ✅ [Navigation.tsx](../src/components/layout/navigation/Navigation.tsx) - All menu items
- ✅ [Footer.tsx](../src/components/layout/footer/Footer.tsx) - All sections and links
- ✅ [MobileMenu.tsx](../src/components/layout/header/MobileMenu.tsx) - Mobile navigation with LanguageSelector

### Pages
- ✅ [courses/page.tsx](../src/app/courses/page.tsx) - Complete course catalog
- ✅ [staff/page.tsx](../src/app/staff/page.tsx) - Staff page with CTA

### Pending Migrations
The following pages still need translation implementation:
- ⏳ about/page.tsx
- ⏳ contact/page.tsx
- ⏳ blog/page.tsx
- ⏳ donations/page.tsx
- ⏳ admissions/page.tsx
- ⏳ gallery/page.tsx
- ⏳ Payment flow pages (Approved, Declined, Cancel)
- ⏳ Section components (Hero, Features, Mission, Vision, Values, etc.)

## Language Persistence

The system automatically:
1. Detects browser language on first visit
2. Saves language preference to localStorage
3. Loads saved preference on subsequent visits
4. Defaults to English if no preference is found

```typescript
// Automatic in LanguageContext.tsx
useEffect(() => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    setLanguageState(savedLanguage);
  } else {
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    const detectedLang = browserLang.startsWith('es') ? 'es' : 'en';
    setLanguageState(detectedLang);
  }
}, []);
```

## SEO Considerations

### Future Enhancements
For complete SEO support, consider implementing:

1. **Language-specific URLs**
   ```
   /en/about
   /es/about (or /es/acerca-de)
   ```

2. **hreflang tags**
   ```html
   <link rel="alternate" hreflang="en" href="https://pccs.edu.do/en/about" />
   <link rel="alternate" hreflang="es" href="https://pccs.edu.do/es/about" />
   ```

3. **Dynamic metadata per language**
   ```typescript
   export function generateMetadata(): Metadata {
     const { language } = useLanguage();
     return {
       title: language === 'en' ? 'About Us - PCCS' : 'Nosotros - PCCS',
       description: language === 'en' ? '...' : '...',
     };
   }
   ```

4. **Sitemap with language variants**

## Best Practices

### 1. Always Use Translation Keys
❌ Don't hardcode strings:
```typescript
<button>Apply Now</button>
```

✅ Use translation keys:
```typescript
<button>{t.common.applyNow}</button>
```

### 2. Maintain Consistency
- Keep translation keys consistent across both languages
- Use the same structure in `en.ts` and `es.ts`
- Update types when adding new sections

### 3. Component Conversion
When converting a component to use translations:
1. Add `'use client'` directive
2. Import and use `useTranslation` hook
3. Replace all hardcoded strings with translation keys
4. Test both languages

### 4. Handle Dynamic Content
For content from APIs or databases, consider:
```typescript
interface Post {
  title_en: string;
  title_es: string;
  content_en: string;
  content_es: string;
}

function PostComponent({ post }: { post: Post }) {
  const { language } = useTranslation();
  return (
    <div>
      <h2>{post[`title_${language}`]}</h2>
      <p>{post[`content_${language}`]}</p>
    </div>
  );
}
```

## Testing

### Manual Testing Checklist
- [ ] Language selector appears in header (desktop)
- [ ] Language selector appears in mobile menu
- [ ] Clicking EN/ES switches language immediately
- [ ] Language preference persists after page reload
- [ ] All translated components show correct language
- [ ] No console errors or warnings
- [ ] Text doesn't overflow containers in either language
- [ ] Layout remains consistent across languages

### Testing Both Languages
```bash
# Start development server
npm run dev

# In browser:
# 1. Open http://localhost:3000
# 2. Click language selector
# 3. Navigate through pages
# 4. Verify all text changes
# 5. Reload page - language should persist
```

## Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined"**
   - Ensure translation key exists in both `en.ts` and `es.ts`
   - Check TypeScript types are updated

2. **Language doesn't persist**
   - Check localStorage is enabled in browser
   - Verify LanguageProvider wraps the app

3. **Hydration mismatch errors**
   - Ensure LanguageProvider returns `null` until mounted
   - Use `'use client'` directive in components using translations

4. **Build failures**
   ```bash
   # Clear cache and rebuild
   rm -rf .next
   npm run build
   ```

## Performance Considerations

- **Bundle Size**: No external dependencies added
- **Runtime**: Context API is efficient for global state
- **Initial Load**: Minimal overhead (~50KB for both translation files)
- **Language Switch**: Instant (no network requests)

## Future Enhancements

1. **Additional Languages**: Add `fr.ts`, `pt.ts`, etc.
2. **Translation Management**: Consider using a CMS for non-technical editors
3. **RTL Support**: For Arabic, Hebrew, etc.
4. **Pluralization**: Handle singular/plural forms
5. **Date/Number Formatting**: Use `Intl` API
6. **Content Images**: Serve language-specific images

## Migration Progress

### Completed ✅
- Core i18n infrastructure (types, context, hook)
- Language selector component
- Layout integration (Header, Footer, Navigation, MobileMenu)
- Courses page (complete with all programs)
- Staff page (complete with CTA)

### In Progress 🔄
- Documentation (this file)

### Pending ⏳
- Remaining pages (about, contact, blog, donations, admissions, gallery)
- Payment flow pages
- Section components
- SEO optimization
- Metadata localization

## Support

For questions or issues with the i18n system:
1. Check this documentation
2. Review the implementation in migrated components
3. Consult the TypeScript types for available translations
4. Test in both languages before deploying

---

**Last Updated**: November 14, 2025
**Version**: 1.0
**Status**: Core Implementation Complete
