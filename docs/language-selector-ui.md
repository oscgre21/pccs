# Language Selector UI - Design Documentation

## Overview

The Language Selector is a sophisticated UI component that allows users to switch between English and Spanish seamlessly. It features different presentations for desktop and mobile devices, with smooth animations and modern design.

## Design Specifications

### Desktop Version

**Location**: Top header bar (next to social links)

**Design Features**:
- Toggle-style button group
- Semi-transparent background with glassmorphism effect
- Rounded pill-shaped container
- Active state with white background and shadow
- Smooth transitions and scale effects
- Ping animation on active language for visual feedback

**Visual Hierarchy**:
```
┌─────────────────────────────────┐
│  🇺🇸 EN  │  🇪🇸 ES              │  ← Container with bg-white/10
│  [Active]   [Inactive]          │
└─────────────────────────────────┘
```

**States**:
- **Active**: White background, purple-900 text, shadow-lg, scale-105, ping animation
- **Inactive**: Transparent background, white text, hover:bg-white/20

### Mobile Version

**Location**: Mobile menu header

**Design Features**:
- Dropdown menu style
- Globe icon for better recognition
- Current language flag and code displayed
- Chevron icon that rotates when open
- Animated dropdown with fade-in effect
- Backdrop overlay for focus
- Full language names with native spelling

**Visual Hierarchy**:
```
┌────────────────────┐
│ 🌐 🇺🇸 EN    ▼   │  ← Trigger button
└────────────────────┘
        ↓ (when open)
┌────────────────────────┐
│ 🇺🇸  English          │
│     English         ✓ │  ← Active with checkmark
├────────────────────────┤
│ 🇪🇸  Español           │
│     Spanish            │
└────────────────────────┘
```

## Technical Implementation

### Component Structure

```typescript
interface LanguageOption {
  code: Language;        // 'en' | 'es'
  name: string;          // 'English' | 'Spanish'
  flag: string;          // Emoji flag
  nativeName: string;    // 'English' | 'Español'
}
```

### Responsive Behavior

- **Desktop (md+)**: Toggle buttons visible
- **Mobile (<md)**: Dropdown menu visible
- Uses Tailwind's `hidden md:flex` and `md:hidden` classes

### Animation Details

#### Desktop Animations
1. **Hover State**: Background color transition (200ms)
2. **Active State**:
   - Scale transform to 105%
   - Box shadow appearance
   - Ping animation (infinite)
3. **Click Transition**: All properties transition smoothly (300ms)

#### Mobile Animations
1. **Dropdown Open**: Fade-in animation (600ms)
2. **Chevron Rotation**: 180° rotation when open (200ms)
3. **Menu Items Hover**: Background color change (150ms)

### Color Palette

**Desktop**:
- Container: `bg-white/10` (10% opacity white)
- Active button: `bg-white` with `text-purple-900`
- Inactive button: `text-white` with `hover:bg-white/20`
- Shadow: `shadow-lg`

**Mobile**:
- Trigger button: `bg-white/10` with `hover:bg-white/20`
- Dropdown: `bg-white` with `shadow-xl`
- Active item: `bg-purple-50` with `text-purple-900`
- Inactive item: `text-gray-700` with `hover:bg-gray-50`
- Backdrop: `fixed inset-0` transparent overlay

## User Experience Flow

### Desktop Flow
1. User sees both language options side by side
2. Current language is highlighted with white background
3. User clicks desired language
4. Smooth transition with scale and fade effects
5. Page content updates instantly

### Mobile Flow
1. User sees compact button with globe icon and current language
2. User taps button
3. Dropdown menu appears with fade-in animation
4. User selects desired language from list
5. Menu closes automatically
6. Page content updates instantly

## Accessibility Features

1. **ARIA Labels**:
   - "Switch to English" / "Cambiar a Español"
   - "Select language" for mobile trigger

2. **Keyboard Navigation**:
   - Tab navigation support
   - Enter/Space to activate buttons
   - Escape to close mobile dropdown

3. **Visual Indicators**:
   - Clear active state
   - Checkmark icon for selected option
   - High contrast colors

4. **Focus States**:
   - Visible focus rings (will follow system preferences)
   - Clear tab order

## Icon Set

Using Heroicons (outline):
- `GlobeAltIcon` - For mobile trigger button
- `ChevronDownIcon` - For dropdown indicator
- Custom SVG checkmark - For selected state

## Flags Used

- 🇺🇸 US Flag - English
- 🇪🇸 Spanish Flag - Spanish

## Integration Points

The Language Selector is integrated in:

1. **Desktop Header** ([Header.tsx](../src/components/layout/header/Header.tsx)):
   - Located in top bar next to social links
   - Always visible on desktop

2. **Mobile Menu** ([MobileMenu.tsx](../src/components/layout/header/MobileMenu.tsx)):
   - Located in menu header next to close button
   - Accessible when mobile menu is open

## Performance Considerations

- **No External Assets**: Flags use Unicode emojis (no image downloads)
- **CSS Transitions**: Hardware-accelerated animations
- **Minimal Re-renders**: Only affected components update on language change
- **No Network Requests**: Instant language switching

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Emoji Flags**: Native Unicode support (no fallback needed)
- **CSS Features**:
  - Backdrop blur (progressive enhancement)
  - Transform animations (widely supported)
  - Flexbox (full support)

## Future Enhancements

Potential improvements for future versions:

1. **Additional Languages**:
   - French 🇫🇷
   - Portuguese 🇵🇹
   - Chinese 🇨🇳
   - etc.

2. **Advanced Features**:
   - Keyboard shortcut (e.g., Alt+L)
   - Auto-detect location for regional flags
   - Remember last used language per session
   - Smooth content transition animations

3. **Analytics**:
   - Track language preferences
   - A/B test different UI variations
   - Monitor usage patterns

## Code Examples

### Basic Usage

```typescript
import { LanguageSelector } from '@/components/ui/LanguageSelector';

function MyComponent() {
  return (
    <div>
      <LanguageSelector />
    </div>
  );
}
```

### Accessing Current Language

```typescript
import { useTranslation } from '@/contexts/LanguageContext';

function MyComponent() {
  const { language, setLanguage } = useTranslation();

  console.log('Current language:', language); // 'en' or 'es'

  // Programmatically change language
  setLanguage('es');
}
```

## Testing Checklist

### Visual Testing
- [ ] Desktop toggle renders correctly
- [ ] Mobile dropdown renders correctly
- [ ] Flags display properly
- [ ] Active state is clearly visible
- [ ] Hover states work on all buttons
- [ ] Animations play smoothly

### Functional Testing
- [ ] Clicking EN switches to English
- [ ] Clicking ES switches to Spanish
- [ ] Language persists after page reload
- [ ] Mobile dropdown opens/closes correctly
- [ ] Backdrop closes dropdown on click
- [ ] All content updates after language change

### Responsive Testing
- [ ] Toggle visible on desktop
- [ ] Dropdown visible on mobile
- [ ] Breakpoint transition works smoothly
- [ ] No layout shifts during language change

### Accessibility Testing
- [ ] Tab navigation works
- [ ] ARIA labels present
- [ ] Screen reader announces changes
- [ ] High contrast mode works
- [ ] Keyboard shortcuts functional

## Design Rationale

### Why Two Different UIs?

1. **Desktop**: Toggle style is more efficient
   - Only 2 languages, so side-by-side works well
   - Immediate visual feedback
   - No extra clicks needed

2. **Mobile**: Dropdown conserves space
   - Limited screen real estate
   - Can scale to more languages easily
   - Familiar mobile pattern

### Why Flags?

- **Universal Recognition**: Flags are instantly recognizable
- **No Translation Needed**: Visual symbols transcend language
- **Compact**: Takes minimal space
- **Engaging**: More interesting than plain text

### Why Glassmorphism?

- **Modern Aesthetic**: Trending design pattern
- **Brand Alignment**: Matches PCCS modern, fresh identity
- **Readability**: Semi-transparent design doesn't overpower
- **Professional**: Conveys quality and attention to detail

---

**Component Location**: [src/components/ui/LanguageSelector.tsx](../src/components/ui/LanguageSelector.tsx)

**Last Updated**: November 14, 2025
**Version**: 2.0 (Enhanced UI)
**Status**: Production Ready
