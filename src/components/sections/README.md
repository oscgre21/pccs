# Componentes de Secciones

Los componentes de secciones representan las diferentes áreas de contenido de la página principal, cada una con funcionalidad específica.

## Secciones Principales

### HeroSection
- **Ubicación**: `hero/HeroSection.tsx`
- **Descripción**: Sección principal (banner) con título animado y call-to-actions
- **Características**:
  - Imagen de fondo responsiva
  - Texto animado que cambia entre "Kids", "Child", "youth"
  - Dos botones de acción principales
  - Overlay semitransparente
  - Elemento decorativo SVG en la parte inferior

### FeaturesSection
- **Ubicación**: `features/FeaturesSection.tsx`
- **Descripción**: Sección "Welcome to Our Kidba" con características principales
- **Características**:
  - Grid de 4 características con iconos
  - Imagen lateral con botón de video
  - Gradientes personalizados para cada feature
  - Efectos hover en las tarjetas
  - Layout responsive (1 columna en móvil, 2 en desktop)

### AboutSection
- **Ubicación**: `about/AboutSection.tsx`
- **Descripción**: Sección "About Kindergarten School" informativa
- **Características**:
  - Layout de 2 columnas (imagen + contenido)
  - Lista de características con checkmarks
  - Botón call-to-action
  - Elementos decorativos (círculos de colores)
  - Contenido adaptable

### StatsSection
- **Ubicación**: `stats/StatsSection.tsx`
- **Descripción**: Sección de estadísticas con contadores animados
- **Características**:
  - 4 contadores con animación
  - Iconos personalizados para cada estadística
  - Intersection Observer para activar animaciones
  - Gradientes únicos por tarjeta
  - Efectos de hover con elevación
  - Elementos decorativos de fondo

### StaffSection
- **Ubicación**: `staff/StaffSection.tsx`
- **Descripción**: Sección "Meet Our Staffs" con tarjetas de personal
- **Características**:
  - Grid responsive de tarjetas de personal
  - Overlay con redes sociales en hover
  - Efectos de imagen zoom y elevación
  - Enlaces a perfiles individuales
  - Integración de redes sociales con iconos SVG

## Funcionalidades Implementadas

### Animaciones
- **HeroSection**: Texto que cambia automáticamente cada 2.5 segundos
- **StatsSection**: Contadores animados activados por scroll
- **Todas las secciones**: Efectos hover y transiciones suaves

### Responsive Design
- Grids que se adaptan de 1 columna (móvil) a 4 columnas (desktop)
- Texto que escala según el tamaño de pantalla
- Espaciado responsivo con utilidades de Tailwind

### Interactividad
- Botones con efectos hover y transformaciones
- Overlays que aparecen en hover (StaffSection)
- Video modals (FeaturesSection)
- Enlaces de navegación funcionales

## Uso

```tsx
import {
  HeroSection,
  FeaturesSection,
  AboutSection,
  StatsSection,
  StaffSection
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <StatsSection />
      <StaffSection />
    </>
  );
}
```

## Dependencias

- **Tailwind CSS**: Para todos los estilos y utilidades
- **React Hooks**: useState, useEffect, useRef para funcionalidad
- **Intersection Observer API**: Para activar animaciones on scroll
- **SVG Icons**: Inlinados para mejor performance

## Personalización

Cada sección incluye:
- Prop `className` opcional para estilos adicionales
- Datos configurables (arrays de objetos)
- Colores y gradientes customizables
- Estructura modular para fácil modificación

Los datos pueden ser extraídos a archivos separados en `src/data/content/` para mejor mantenimiento.