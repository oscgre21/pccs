# Estilos CSS Optimizados para Next.js

La migración de estilos se ha realizado utilizando Tailwind CSS como base, manteniendo la fidelidad visual del diseño original mientras se optimiza para performance y mantenibilidad.

## Estructura de Estilos

```
src/styles/
├── globals/
│   └── theme.css          # Variables CSS globales y estilos base
├── components/            # Estilos específicos de componentes (si necesario)
└── README.md             # Esta documentación
```

## Configuración de Tailwind

### Colores Personalizados
- **Primary**: `#3E64DE` - Color principal del tema original
- **Secondary**: `#FF6B35` - Color secundario para acentos
- **Accent**: Azul claro para elementos decorativos

### Tipografías
- **Fredoka One**: Para títulos principales (mantiene el estilo lúdico)
- **Open Sans**: Para contenido general (legibilidad)
- **Roboto**: Para texto adicional

### Gradientes Customizados
```css
--gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
--gradient-4: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
```

### Sombras Mejoradas
- **soft**: Sombras sutiles para tarjetas
- **medium**: Sombras medias para elementos elevados
- **strong**: Sombras pronunciadas para modales
- **color**: Sombras con color del tema
- **color-lg**: Sombras grandes con color

## Animaciones CSS

### Animaciones Disponibles
- `animate-fade-in`: Aparición gradual
- `animate-slide-in-up`: Deslizamiento desde abajo
- `animate-slide-in-down`: Deslizamiento desde arriba
- `animate-scale-in`: Escalado de entrada
- `animate-bounce-slow`: Rebote lento
- `animate-pulse-slow`: Pulso lento

### Keyframes Personalizados
Todas las animaciones incluyen keyframes optimizados para suavidad y performance.

## Variables CSS Globales

### Colores
```css
:root {
  --color-primary: #3E64DE;
  --color-primary-rgb: 62, 100, 222;
  --body-color: #212327;
  --border-color: #E3E5EB;
}
```

### Transiciones
```css
:root {
  --transition-base: all 0.3s ease;
  --transition-fast: all 0.15s ease;
  --transition-slow: all 0.5s ease;
}
```

## Clases Utilitarias Personalizadas

### Layout
- `.container`: Contenedor responsive máximo 1320px
- `.btn-hover-lift`: Efecto de elevación en hover
- `.card-hover`: Efecto de tarjeta en hover

### Estados
- `.loading-shimmer`: Efecto de carga esqueleto
- `.focus-visible`: Estados de foco accesibles

### Efectos Visuales
- `.text-gradient`: Texto con gradiente
- `.shadow-soft/medium/strong`: Sombras personalizadas

## Responsive Design

### Breakpoints Utilizados
- `sm`: 640px - Móviles grandes
- `md`: 768px - Tablets
- `lg`: 1024px - Laptops
- `xl`: 1280px - Desktops
- `2xl`: 1536px - Pantallas grandes

### Estrategia Mobile-First
Todos los componentes están diseñados con enfoque mobile-first, escalando hacia pantallas más grandes.

## Accesibilidad

### Características Implementadas
- **Modo de alto contraste**: Soporte para `prefers-contrast: high`
- **Movimiento reducido**: Soporte para `prefers-reduced-motion`
- **Estados de foco**: Indicadores visuales claros
- **Contraste de colores**: Cumple WCAG 2.1 AA

### Estados de Foco
```css
.focus-visible {
  @apply outline-none ring-2 ring-blue-500 ring-offset-2;
}
```

## Performance

### Optimizaciones Implementadas
1. **Critical CSS**: Estilos críticos inline
2. **CSS Purging**: Solo CSS utilizado en producción
3. **Compresión**: Gzip/Brotli para archivos CSS
4. **Lazy Loading**: Estilos no críticos cargados bajo demanda

### Bundle Size
- Base Tailwind: ~3KB (comprimido)
- Estilos custom: ~1KB (comprimido)
- Total: ~4KB CSS

## Dark Mode (Preparado)

La estructura está preparada para dark mode:
```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

## Uso en Componentes

### Ejemplo de Uso
```tsx
// Componente con estilos optimizados
function MyComponent() {
  return (
    <div className="container py-16 lg:py-24">
      <div className="card-hover bg-white rounded-2xl shadow-soft p-8">
        <h2 className="text-gradient text-4xl font-heading mb-6">
          Título con Gradiente
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Contenido del componente
        </p>
        <button className="btn-hover-lift bg-primary-500 text-white px-8 py-4 rounded-full">
          Botón Interactivo
        </button>
      </div>
    </div>
  );
}
```

### Clases Recomendadas
- Usar `container` para layout principal
- Aplicar `card-hover` en tarjetas
- Usar `btn-hover-lift` en botones
- Implementar `animate-fade-in` para entradas
- Aplicar sombras `shadow-soft/medium/strong`

## Mantenimiento

### Guidelines
1. **Consistencia**: Usar variables CSS para colores y espaciado
2. **Performance**: Evitar CSS inline, usar clases Tailwind
3. **Accesibilidad**: Siempre incluir estados de foco
4. **Responsive**: Mobile-first approach
5. **Semántica**: Usar clases descriptivas y utilitarias

### Debugging
- Usar DevTools para inspeccionar clases Tailwind
- Verificar variables CSS en `:root`
- Validar responsive design en diferentes viewport