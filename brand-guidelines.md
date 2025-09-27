# Punta Cana Christian School - Color Palette

## 🎨 Brand Colors

Esta es la paleta de colores oficial para **Punta Cana Christian School (PCCS)**, basada en el logo institucional y optimizada para uso web y digital.

---

## 📋 Colores Principales

### 🔵 Azul Institucional (Primary)
```css
--pccs-blue-primary: #1E1E8C;
```
- **Hex:** `#1E1E8C`
- **RGB:** `rgb(30, 30, 140)`
- **HSL:** `hsl(240, 65%, 33%)`
- **Uso:** Logo principal, encabezados, elementos de marca

### 🌴 Verde Tropical
```css
--pccs-green-tropical: #2ECC40;
```
- **Hex:** `#2ECC40`
- **RGB:** `rgb(46, 204, 64)`
- **HSL:** `hsl(127, 63%, 49%)`
- **Uso:** Palmera del logo, elementos naturales, acentos

### 🌳 Marrón Tierra
```css
--pccs-brown-earth: #8B4513;
```
- **Hex:** `#8B4513`
- **RGB:** `rgb(139, 69, 19)`
- **HSL:** `hsl(25, 76%, 31%)`
- **Uso:** Tronco de palmera, elementos orgánicos

### ⚪ Blanco Puro
```css
--pccs-white: #FFFFFF;
```
- **Hex:** `#FFFFFF`
- **RGB:** `rgb(255, 255, 255)`
- **HSL:** `hsl(0, 0%, 100%)`
- **Uso:** Fondos, texto sobre colores oscuros

---

## 🎯 Colores Complementarios

### 💙 Azul Claro (Acento)
```css
--pccs-blue-light: #4A90E2;
```
- **Hex:** `#4A90E2`
- **RGB:** `rgb(74, 144, 226)`
- **HSL:** `hsl(212, 72%, 59%)`
- **Uso:** Links, botones secundarios, hover states

### 🖤 Gris Neutro
```css
--pccs-gray-neutral: #6C757D;
```
- **Hex:** `#6C757D`
- **RGB:** `rgb(108, 117, 125)`
- **HSL:** `hsl(208, 7%, 46%)`
- **Uso:** Texto secundario, bordes sutiles

### 💚 Verde Claro
```css
--pccs-green-light: #D4F4DD;
```
- **Hex:** `#D4F4DD`
- **RGB:** `rgb(212, 244, 221)`
- **HSL:** `hsl(137, 52%, 89%)`
- **Uso:** Fondos suaves, secciones destacadas

---

## 🔧 Implementación CSS

### Variables CSS (Recomendado)
```css
:root {
  /* Colores Principales */
  --pccs-blue-primary: #1E1E8C;
  --pccs-green-tropical: #2ECC40;
  --pccs-brown-earth: #8B4513;
  --pccs-white: #FFFFFF;
  
  /* Colores Complementarios */
  --pccs-blue-light: #4A90E2;
  --pccs-gray-neutral: #6C757D;
  --pccs-green-light: #D4F4DD;
}
```

### Clases Utilitarias
```css
/* Colores de Texto */
.text-pccs-primary { color: var(--pccs-blue-primary); }
.text-pccs-tropical { color: var(--pccs-green-tropical); }
.text-pccs-earth { color: var(--pccs-brown-earth); }
.text-pccs-accent { color: var(--pccs-blue-light); }
.text-pccs-neutral { color: var(--pccs-gray-neutral); }

/* Colores de Fondo */
.bg-pccs-primary { background-color: var(--pccs-blue-primary); }
.bg-pccs-tropical { background-color: var(--pccs-green-tropical); }
.bg-pccs-light { background-color: var(--pccs-green-light); }
.bg-pccs-white { background-color: var(--pccs-white); }
```

---

## 🎨 Paleta Visual

| Color | Preview | Hex | Uso Principal |
|-------|---------|-----|---------------|
| Azul Institucional | ![#1E1E8C](https://via.placeholder.com/20x20/1E1E8C/1E1E8C) | `#1E1E8C` | Marca principal |
| Verde Tropical | ![#2ECC40](https://via.placeholder.com/20x20/2ECC40/2ECC40) | `#2ECC40` | Naturaleza |
| Marrón Tierra | ![#8B4513](https://via.placeholder.com/20x20/8B4513/8B4513) | `#8B4513` | Elementos orgánicos |
| Azul Claro | ![#4A90E2](https://via.placeholder.com/20x20/4A90E2/4A90E2) | `#4A90E2` | Interactivos |
| Gris Neutro | ![#6C757D](https://via.placeholder.com/20x20/6C757D/6C757D) | `#6C757D` | Texto secundario |
| Verde Claro | ![#D4F4DD](https://via.placeholder.com/20x20/D4F4DD/D4F4DD) | `#D4F4DD` | Fondos suaves |

---

## ✅ Pautas de Uso

### ✔️ Recomendaciones
- Usar **Azul Institucional** para elementos de marca y títulos principales
- Aplicar **Verde Tropical** para destacar elementos relacionados con naturaleza
- Utilizar **Azul Claro** para links y elementos interactivos
- Emplear **Gris Neutro** para texto descriptivo y secundario
- Usar **Verde Claro** para fondos de secciones especiales

### ❌ Evitar
- No usar colores principales en fondos con texto blanco sin verificar contraste
- No mezclar más de 3 colores principales en un mismo elemento
- No modificar los valores hex sin consultar las guías de marca

---

## 📱 Accesibilidad

Todos los colores han sido seleccionados considerando:
- **Contraste WCAG 2.1 AA** para texto sobre fondos
- **Legibilidad** en diferentes dispositivos
- **Compatibilidad** con daltonismo

---

## 📄 Licencia

Esta paleta de colores es propiedad de **Punta Cana Christian School** y debe usarse únicamente para proyectos oficiales de la institución.

---

**Establecido:** 2023  
**Versión:** 1.0  
**Última actualización:** Septiembre 2025