# Componentes de Layout

Los componentes de layout proporcionan la estructura básica de la página, incluyendo header, navigation y footer.

## Componentes Principales

### Header
- **Ubicación**: `header/Header.tsx`
- **Descripción**: Componente principal del header que incluye información de contacto, redes sociales y navegación
- **Características**:
  - Header superior con información de contacto (solo desktop)
  - Logo y navegación principal
  - Menú móvil responsive
  - Redes sociales integradas

### Navigation
- **Ubicación**: `navigation/Navigation.tsx`
- **Descripción**: Sistema de navegación principal con menús dropdown
- **Características**:
  - Menús desplegables en hover
  - Transiciones suaves
  - Estructura de navegación jerárquica
  - Responsive (oculto en móvil)

### Footer
- **Ubicación**: `footer/Footer.tsx`
- **Descripción**: Footer completo con información institucional
- **Características**:
  - Enlaces de navegación organizados por secciones
  - Información de contacto con iconos
  - Redes sociales
  - Copyright y enlaces legales

## Subcomponentes

### ContactInfo
- **Ubicación**: `header/ContactInfo.tsx`
- **Funcionalidad**: Muestra horarios, teléfono y dirección en el header

### SocialLinks
- **Ubicación**: `header/SocialLinks.tsx`
- **Funcionalidad**: Enlaces a redes sociales con iconos SVG

### MobileMenu
- **Ubicación**: `header/MobileMenu.tsx`
- **Funcionalidad**: Menú lateral para navegación móvil
- **Características**:
  - Overlay semitransparente
  - Animaciones de slide
  - Menús expandibles
  - Información de contacto incluida

## Uso

```tsx
import { Header, Footer } from '@/components/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

## Dependencias

- **@heroicons/react**: Para iconos en Navigation y MobileMenu
- **Tailwind CSS**: Para todos los estilos
- **React hooks**: useState para manejo de estado del menú móvil

## Datos de Navegación

La estructura de navegación está definida en cada componente y incluye:

1. **Inicio** (con submenús Home 01-05)
2. **Nosotros** (con submenús de cursos)
3. **Admisiones** (con submenu de shop)
4. **Contactanos** (enlace directo)

Los datos pueden ser extraídos a archivos separados en `src/data/navigation/` para mejor mantenimiento.