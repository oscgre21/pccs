# Componentes UI y Funcionalidad JavaScript

Los componentes UI proporcionan funcionalidad interactiva reutilizable para toda la aplicación.

## Componentes Principales

### VideoModal
- **Ubicación**: `modals/VideoModal.tsx`
- **Descripción**: Modal para reproducir videos de YouTube
- **Características**:
  - Overlay con backdrop semi-transparente
  - Cierre con Escape key o click en backdrop
  - Auto-focus y trap de teclado
  - Responsive design
  - Prevención de scroll en body cuando está abierto

### Carousel
- **Ubicación**: `carousel/Carousel.tsx`
- **Descripción**: Carrusel/slider responsive con auto-play
- **Características**:
  - Auto-play configurable (pausa en hover)
  - Navegación con flechas y dots
  - Navegación por teclado (arrow keys)
  - Transiciones suaves
  - Barra de progreso opcional
  - Completamente accesible

### Button
- **Ubicación**: `buttons/Button.tsx`
- **Descripción**: Componente de botón altamente configurable
- **Características**:
  - 5 variantes: primary, secondary, outline, ghost, gradient
  - 4 tamaños: sm, md, lg, xl
  - Estados: loading, disabled
  - Iconos izquierda y derecha
  - Funciona como botón o enlace
  - Efectos hover y transformaciones

## Custom Hooks

### useModal
- **Ubicación**: `hooks/useModal.ts`
- **Descripción**: Hook para manejar estado de modales
- **API**:
  ```tsx
  const { isOpen, openModal, closeModal, toggleModal } = useModal();
  ```

### useInView
- **Ubicación**: `hooks/useInView.ts`
- **Descripción**: Hook para detectar cuando un elemento entra en viewport
- **Características**:
  - Basado en Intersection Observer
  - Configurable threshold y rootMargin
  - Opción triggerOnce para animaciones únicas
- **API**:
  ```tsx
  const { ref, isInView } = useInView({ threshold: 0.1 });
  ```

## Funcionalidades Implementadas

### Animaciones en Scroll
- **StatsSection**: Contadores animados al entrar en viewport
- Usa `useInView` hook para detección
- Animaciones numéricas suaves

### Modales de Video
- **FeaturesSection**: Integrado con VideoModal
- Click en botón play abre modal con video de YouTube
- Gestión completa de estado modal

### Navegación Interactiva
- **Header/Navigation**: Dropdowns con hover
- **MobileMenu**: Slide-in animation con overlay
- Transiciones suaves y efectos visuales

### Responsive Design
- Todos los componentes son completamente responsive
- Breakpoints consistentes con Tailwind CSS
- Touch-friendly en dispositivos móviles

## Uso

### VideoModal
```tsx
import { VideoModal } from '@/components/ui';
import { useModal } from '@/hooks';

function MyComponent() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <button onClick={openModal}>Play Video</button>
      <VideoModal
        isOpen={isOpen}
        onClose={closeModal}
        videoId="your-youtube-id"
        title="Video Title"
      />
    </>
  );
}
```

### Carousel
```tsx
import { Carousel } from '@/components/ui';

function MyCarousel() {
  const slides = [<div>Slide 1</div>, <div>Slide 2</div>];

  return (
    <Carousel
      autoPlay={true}
      autoPlayInterval={5000}
      showDots={true}
      showArrows={true}
    >
      {slides}
    </Carousel>
  );
}
```

### Button
```tsx
import { Button } from '@/components/ui';

function MyButtons() {
  return (
    <>
      <Button variant="primary" size="lg">
        Primary Button
      </Button>
      <Button
        variant="gradient"
        leftIcon={<Icon />}
        isLoading={loading}
      >
        With Icon
      </Button>
      <Button href="/link" variant="outline">
        As Link
      </Button>
    </>
  );
}
```

## Dependencias

- **@heroicons/react**: Para iconos en componentes
- **Tailwind CSS**: Para todos los estilos
- **React**: Para hooks y componentes
- **YouTube API**: Para embeds de video