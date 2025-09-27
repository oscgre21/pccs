# Estructura del Proyecto PCCS Landing

## Organización de Carpetas

```
src/
├── app/                     # Next.js App Router
├── components/              # Componentes React
│   ├── layout/             # Componentes de layout
│   │   ├── header/         # Componentes del header
│   │   ├── footer/         # Componentes del footer
│   │   └── navigation/     # Componentes de navegación
│   ├── sections/           # Secciones principales de la página
│   │   ├── hero/           # Sección hero/banner
│   │   ├── about/          # Sección "About Kindergarten"
│   │   ├── features/       # Sección de características
│   │   ├── staff/          # Sección "Meet Our Staffs"
│   │   ├── gallery/        # Galería de imágenes
│   │   ├── testimonials/   # Testimonios
│   │   ├── blog/           # Sección de blog/noticias
│   │   └── stats/          # Contadores/estadísticas
│   ├── ui/                 # Componentes UI reutilizables
│   │   ├── buttons/        # Botones personalizados
│   │   ├── cards/          # Tarjetas (staff, cursos, etc.)
│   │   ├── carousel/       # Componentes de carrusel
│   │   └── modals/         # Modales y popups
│   └── forms/              # Formularios de contacto
├── data/                    # Datos estáticos
│   ├── navigation/         # Datos de navegación/menús
│   └── content/            # Contenido de texto e imágenes
├── hooks/                   # Custom React hooks
├── lib/                     # Utilidades y configuraciones
├── styles/                  # Estilos CSS
│   ├── components/         # Estilos específicos de componentes
│   └── globals/            # Estilos globales
└── types/                   # Definiciones de TypeScript
```

## Convenciones de Nomenclatura

- **Componentes**: PascalCase (ej: `HeroSection.tsx`)
- **Archivos de datos**: camelCase (ej: `navigationData.ts`)
- **Estilos**: kebab-case (ej: `hero-section.css`)
- **Hooks**: camelCase con prefijo "use" (ej: `useCarousel.ts`)

## Arquitectura de Componentes

Cada sección principal tendrá:
- Un componente principal (ej: `HeroSection.tsx`)
- Subcomponentes si es necesario
- Archivo de tipos TypeScript correspondiente
- Estilos específicos si es requerido

## Migración desde HTML Original

La estructura está diseñada para mapear directamente las secciones identificadas en el HTML original:
- Header con navegación y redes sociales
- Banner/Hero con texto animado
- Secciones de contenido (About, Features, Staff, etc.)
- Footer con información de contacto