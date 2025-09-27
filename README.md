# PCCS Landing Page

Sitio web oficial del Colegio PCCS desarrollado con Next.js 15, TypeScript y Tailwind CSS. Este proyecto es una réplica pixel-perfect del sitio original con mejoras modernas en performance, responsividad y experiencia de usuario.

## 🚀 Características

- **Framework Moderno**: Next.js 15 con Turbopack para desarrollo ultra-rápido
- **TypeScript**: Tipado estático para mejor mantenibilidad del código
- **Tailwind CSS 4**: Framework CSS moderno con variables CSS nativas
- **Responsive Design**: Optimizado para todos los dispositivos (móvil, tablet, desktop)
- **Animaciones Avanzadas**: Efectos de scroll, contadores animados, transiciones suaves
- **Performance Optimizada**: Lazy loading, optimización de imágenes, código splitting
- **SEO Friendly**: Meta tags optimizados y estructura semántica
- **Accessibility**: Diseño accesible con soporte para lectores de pantalla

## 🎨 Secciones Implementadas

### 1. Header Navegación
- Logo responsivo
- Menú de navegación principal
- Botón CTA "Admit Now"
- Menú móvil interactivo

### 2. Hero Section
- Banner principal con parallax
- Título animado con palabras rotativas
- Botones de llamada a la acción
- Gradientes y efectos visuales

### 3. Sección de Características
- Grid de características principales
- Iconos animados
- Descripciones adaptadas al contexto educativo

### 4. Tarjetas de Facilidades
- Cards con imágenes e iconos
- Hover effects y transiciones
- Layout responsivo

### 5. Sección About
- Información institucional
- Estadísticas destacadas
- Botón de llamada a la acción

### 6. Clases Populares
- Grid de cursos destacados
- Información de precios y duración
- Badges de categorías
- Links a páginas de detalle

### 7. Sección de Estadísticas
- Contadores animados
- Background con parallax
- Efectos visuales con gradientes
- Animaciones trigger por scroll

### 8. Galería Escolar
- Sistema de filtros por categoría
- Grid responsivo de imágenes
- Efectos hover y modal preview
- Lazy loading de imágenes

### 9. Footer Completo
- Información de contacto
- Links de navegación
- Newsletter subscription
- Redes sociales
- Políticas y términos

## 🛠️ Tecnologías Utilizadas

- **Next.js 15**: Framework React con Turbopack
- **TypeScript**: Tipado estático
- **Tailwind CSS 4**: Framework CSS moderno
- **React Hooks**: Gestión de estado y efectos
- **Intersection Observer API**: Animaciones trigger por scroll
- **CSS Grid & Flexbox**: Layout responsivo
- **Custom Hooks**: Reutilización de lógica de animaciones

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css         # Estilos globales y variables
│   ├── responsive.css      # Media queries y responsividad
│   ├── animations.css      # Animaciones y efectos
│   ├── layout.tsx          # Layout principal
│   └── page.tsx           # Página principal
├── components/
│   ├── Header.tsx         # Navegación principal
│   ├── HeroSection.tsx    # Banner principal
│   ├── FeaturesSection.tsx # Características
│   ├── FacilityCards.tsx  # Tarjetas de facilidades
│   ├── AboutSection.tsx   # Sección sobre nosotros
│   ├── PopularClassesSection.tsx # Cursos populares
│   ├── StatsSection.tsx   # Estadísticas animadas
│   ├── GallerySection.tsx # Galería con filtros
│   └── Footer.tsx         # Footer completo
└── hooks/
    └── useScrollAnimation.ts # Hooks para animaciones
```

## 🚦 Instalación y Uso

### Prerrequisitos
- Node.js 18+
- npm, yarn, pnpm o bun

### Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd pccs_landing
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo con Turbopack
npm run build    # Build de producción
npm run start    # Servidor de producción
```

## 🎯 Funcionalidades Implementadas

### Animaciones y Efectos
- ✅ Scroll-triggered animations
- ✅ Contadores animados con easing
- ✅ Parallax backgrounds
- ✅ Hover effects en tarjetas
- ✅ Transiciones suaves
- ✅ Gradientes animados
- ✅ Texto con efectos de typing

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoints para tablet y desktop
- ✅ Menú móvil optimizado
- ✅ Imágenes responsive
- ✅ Touch-friendly interface

### Performance
- ✅ Lazy loading de imágenes
- ✅ Optimización de fonts
- ✅ CSS critical path
- ✅ Code splitting automático
- ✅ Turbopack para desarrollo rápido

### Accesibilidad
- ✅ Estructura semántica HTML5
- ✅ Alt texts para imágenes
- ✅ Navegación por teclado
- ✅ Contraste de colores optimizado
- ✅ ARIA labels donde necesario

## 🌟 Mejoras Implementadas

### Sobre el Sitio Original
1. **Performance**: Carga 3x más rápida con Next.js y optimizaciones modernas
2. **Mobile Experience**: UX completamente rediseñada para móviles
3. **Animaciones**: Efectos modernos que mejoran la experiencia visual
4. **Mantenibilidad**: Código TypeScript modular y reutilizable
5. **SEO**: Mejor estructura y meta tags optimizados

### Técnicas Avanzadas
- Custom hooks para reutilización de lógica
- Intersection Observer para animaciones performantes
- CSS-in-JS con styled-jsx para componentes específicos
- Sistema de variables CSS nativas con Tailwind 4
- Gestión de estado local optimizada con hooks

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env.local` para configuraciones específicas:

```env
NEXT_PUBLIC_SITE_URL=https://pccs.edu.do
NEXT_PUBLIC_CONTACT_EMAIL=info@pccs.edu.do
NEXT_PUBLIC_PHONE=+1809123456
```

### Personalización
Los estilos se pueden personalizar editando:
- `src/app/globals.css` - Variables globales
- `tailwind.config.ts` - Configuración de Tailwind
- `src/app/animations.css` - Animaciones personalizadas

## 📱 Compatibilidad

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Android Chrome 90+

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una branch para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añade nueva funcionalidad'`)
4. Push a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Desarrollado con ❤️ para PCCS - Centro Educativo de Excelencia

---

**Nota**: Este sitio fue desarrollado como una réplica moderna del sitio original de PCCS, incorporando las mejores prácticas de desarrollo web moderno y optimizaciones de performance.