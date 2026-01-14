# PCCS Landing - Sitemap & Component Relationships

## 📋 Tabla de Contenidos
1. [Páginas Principales](#páginas-principales)
2. [Sistema de Rutas](#sistema-de-rutas)
3. [Componentes y Relaciones](#componentes-y-relaciones)
4. [Links Internos](#links-internos)
5. [Links Externos](#links-externos)
6. [API Endpoints](#api-endpoints)

---

## Páginas Principales

### 1. **Home (`/`)**
- **Archivo**: `src/app/page.tsx`
- **Componentes utilizados**:
  - `HeroSection` - Sección hero con carrusel de imágenes
  - `FeaturesSection` - Características principales
  - `MissionSection` - Misión
  - `VisionSection` - Visión
  - `ValuesSection` - Valores
  - `PurposeSection` - Propósito
- **Links hacia**:
  - `/admisiones` (botón "APPLY NOW")
  - `/#` (botón "OUR CLASSES")
- **Descripción**: Página principal con loading screen animado, muestra las secciones principales del sitio.

### 2. **Admissions (`/admisiones`)**
- **Archivo**: `src/app/admisiones/page.tsx`
- **Componentes utilizados**:
  - `AdmissionsSection` - Sección completa de admisiones
- **Links externos**:
  - WhatsApp (Agendar cita): `https://services.tochat.be/es/whatsapp-business-directory/person/573b8be9-543f-4cad-b00f-21fa720ac55b`
  - Formulario de Admisión (Google Forms): `https://docs.google.com/forms/d/e/1FAIpQLSew3PwL6kkulsLr0Ayyfy36DuUxZhVI9arzjV1XA6zvWhuFqw/viewform`
  - Solicitud de Beca (Google Forms): `https://docs.google.com/forms/d/e/1FAIpQLScydBLqzdD9XPQYdMCWLAIg8cNMC1UV5p9d98hZw21JaNetvQ/viewform`
  - Consultas (Google Forms): `https://docs.google.com/forms/d/e/1FAIpQLScO1ts3uRkswZxvGm3QFC7-fYgyCysE7qZEKDSAvx5OnFCB3g/viewform`
- **Links internos**:
  - `#formularios` (ancla interna)
  - `tel:+1-809-917-7855` (teléfono)
- **Descripción**: Información sobre proceso de admisión y documentos requeridos.

### 3. **Gallery (`/galeria`)**
- **Archivo**: `src/app/galeria/page.tsx`
- **Componentes utilizados**:
  - `GallerySection` - Galería de fotos
- **Descripción**: Muestra momentos especiales y actividades educativas.

### 4. **Donations (`/donaciones`)**
- **Archivo**: `src/app/donaciones/page.tsx`
- **Componentes utilizados**:
  - `DonationsSection` - Sección de donaciones con tipos
  - `AzulPaymentButton` - Botón de pago Azul
- **API utilizada**:
  - `/api/donation-types` (GET - obtiene tipos de donación)
  - `/api/azul/initiate-payment` (POST - inicia pago)
- **Descripción**: Página de donaciones con diferentes tipos y sistema de pago integrado.

### 5. **Payment Success (`/Approved/[transactionId]`)**
- **Archivo**: `src/app/Approved/[transactionId]/page.tsx`
- **API utilizada**:
  - `/api/azul/validate-response` (POST - valida respuesta)
- **Descripción**: Página de confirmación de pago exitoso con detalles de transacción.

### 6. **Payment Approved (Redirect) (`/Approved`)**
- **Archivo**: `src/app/Approved/page.tsx`
- **API utilizada**:
  - `/api/azul/validate-response` (POST)
- **Redirección**: `/Approved/[transactionId]`
- **Descripción**: Página intermedia que valida y redirige a la página de éxito específica.

### 7. **Payment Declined (`/Declined`)**
- **Archivo**: `src/app/Declined/page.tsx`
- **API utilizada**:
  - `/api/azul/validate-response` (POST)
- **Links hacia**:
  - `/donaciones` (botón "Try Again")
  - `/` (botón "Return to Home")
  - `#contact` (botón "Contact Support")
- **Descripción**: Página de pago rechazado con información de error y opciones de ayuda.

### 8. **Payment Cancelled (`/Cancel`)**
- **Archivo**: `src/app/Cancel/page.tsx`
- **API utilizada**:
  - `/api/azul/validate-response` (POST)
- **Links hacia**:
  - `/donaciones` (botón "Complete Your Donation")
  - `/` (botón "Return to Home")
- **Descripción**: Página cuando el usuario cancela el proceso de pago.

---

## Sistema de Rutas

### Rutas Públicas (Next.js App Router)
```
/                          → Página principal
/admisiones                → Admisiones
/galeria                   → Galería
/donaciones                → Donaciones
/Approved                  → Pago aprobado (redirect)
/Approved/[transactionId]  → Detalles de pago aprobado
/Declined                  → Pago rechazado
/Cancel                    → Pago cancelado
```

### Rutas en el Sitemap (Definidas pero no implementadas)
Estas rutas están en `src/app/sitemap.ts` pero no tienen páginas correspondientes:
- `/about` (prioridad: 0.8)
- `/courses` (prioridad: 0.9)
- `/staff` (prioridad: 0.7)
- `/contact` (prioridad: 0.6)
- `/gallery` (prioridad: 0.5) - Nota: existe `/galeria`
- `/blog` (prioridad: 0.7)

---

## Componentes y Relaciones

### Layout Components (`src/components/layout/`)

#### **Header** (`Header.tsx`)
- **Ubicación**: Presente en todas las páginas via `layout.tsx`
- **Componentes hijos**:
  - `ContactInfo` - Información de contacto (top header)
  - `SocialLinks` - Links de redes sociales
  - `Navigation` - Menú de navegación principal
  - `MobileMenu` - Menú móvil
- **Links**:
  - Logo → `/`
  - Botón "Sponsor" → `/donaciones`
- **Teléfono**: `+1-809-917-7855`
- **Email**: `info@pccs.edu.do`

#### **Navigation** (`Navigation.tsx`)
- **Menú principal**:
  - HOME → `/`
  - ABOUT US → `/nosotros` (dropdown)
    - Mission → `/#mision`
    - Vision → `/#vision`
    - Values → `/#valores`
    - Purpose → `/#proposito`
  - ADMISSIONS → `/admisiones`
  - GALLERY → `/galeria`
  - CONTACT US → `/contact`

#### **MobileMenu** (`MobileMenu.tsx`)
- **Navegación móvil con menú items**:
  - Home → `/` (con submenú no usado)
  - About Us → `/nosotros`
  - Admissions → `/admisiones`
  - Contact Us → `/contact`
- **Botón Sponsor** → `/donaciones`
- **Contacto**: Muestra información de contacto del array `contactInfo`

#### **Footer** (`Footer.tsx`)
- **Secciones**:
  1. Navigation
     - Home → `/`
     - About Us → `/about`
     - Courses → `/courses`
     - Contact → `/contact`
  2. Services
     - Early Childhood Education → `/services/educacion-infantil`
     - Extracurricular Activities → `/services/actividades`
     - Family Support → `/services/apoyo-familiar`
     - Workshops → `/services/talleres`
  3. Resources
     - Gallery → `/gallery`
- **Componentes utilizados**:
  - `SocialLinks` - Redes sociales
- **Contacto**:
  - Teléfono: `+1 (849) 855 1635`
  - Email: `info@pccs.edu.do`
  - Dirección: Av. Barcelo, Punta Cana, C. Edgar Allan Poe, No. 1

#### **SocialLinks** (`SocialLinks.tsx`)
- **Redes sociales** (todos con `href="#"`):
  - Facebook
  - YouTube
  - Instagram
  - LinkedIn
  - Pinterest

#### **ContactInfo** (`ContactInfo.tsx`)
- Muestra información de contacto en el header superior
- Utiliza array `contactInfo` de `src/app/constant.tsx`

### Section Components (`src/components/sections/`)

#### **HeroSection** (`hero/HeroSection.tsx`)
- **Usado en**: Página principal (`/`)
- **Características**:
  - Carrusel de 2 imágenes con transiciones
  - Texto animado: "Kids", "Child", "youth"
- **Botones**:
  - "APPLY NOW" → `/admisiones`
  - "OUR CLASSES" → `/#`

#### **FeaturesSection** (`features/FeaturesSection.tsx`)
- **Usado en**: Página principal (`/`)
- **Descripción**: Características principales de PCCS

#### **MissionSection** (`mission/MissionSection.tsx`)
- **Usado en**: Página principal (`/`)
- **ID de ancla**: `#mision`

#### **VisionSection** (`vision/VisionSection.tsx`)
- **Usado en**: Página principal (`/`)
- **ID de ancla**: `#vision`

#### **ValuesSection** (`values/ValuesSection.tsx`)
- **Usado en**: Página principal (`/`)
- **ID de ancla**: `#valores`

#### **PurposeSection** (`purpose/PurposeSection.tsx`)
- **Usado en**: Página principal (`/`)
- **ID de ancla**: `#proposito`

#### **AdmissionsSection** (`admissions/AdmissionsSection.tsx`)
- **Usado en**: `/admisiones`
- **Características**:
  - Hero section con imagen de fondo
  - Lista de documentos requeridos
  - 4 botones de formularios externos (Google Forms + WhatsApp)
- **Links**:
  - `#formularios` (ancla interna)
  - WhatsApp Business
  - 3 Google Forms diferentes

#### **GallerySection** (`gallery/GallerySection.tsx`)
- **Usado en**: `/galeria`
- **Descripción**: Galería de imágenes de actividades

#### **DonationsSection** (`donations/DonationsSection.tsx`)
- **Usado en**: `/donaciones`
- **Características**:
  - Grid de imágenes de donaciones con modal
  - Carga dinámica de tipos de donación desde API
  - Integración con sistema de pago Azul
- **Componentes utilizados**:
  - `AzulPaymentButton` - Botón de pago
- **API**:
  - `GET /api/donation-types` - Obtiene tipos de donación

#### **StaffSection** (`staff/StaffSection.tsx`)
- **Uso**: No está siendo utilizado actualmente
- **Descripción**: Sección para mostrar el personal

#### **AboutSection** (`about/AboutSection.tsx`)
- **Uso**: Comentado en `page.tsx`
- **Descripción**: Sección "Sobre Nosotros"

#### **StatsSection** (`stats/StatsSection.tsx`)
- **Uso**: No está siendo utilizado actualmente
- **Descripción**: Estadísticas

### Payment Components (`src/components/payment/`)

#### **AzulPaymentButton** (`AzulPaymentButton.tsx`)
- **Usado en**: `DonationsSection`
- **Props**:
  - `amount`: número
  - `description`: string
  - `donationTypeId`: string (opcional)
  - `className`: string (opcional)
- **Funcionalidad**:
  - Inicia proceso de pago con Azul
  - Crea donación en base de datos
  - Redirige a pasarela de pago
- **API utilizada**:
  - `POST /api/azul/initiate-payment`

### UI Components (`src/components/ui/`)

#### **Button** (`buttons/Button.tsx`)
- Componente genérico de botón

#### **Carousel** (`carousel/Carousel.tsx`)
- Componente de carrusel

#### **VideoModal** (`modals/VideoModal.tsx`)
- Modal para reproducir videos

---

## Links Internos

### Navegación Principal
| Link | Origen | Destino | Componente |
|------|--------|---------|------------|
| HOME | Header/Navigation | `/` | Navigation.tsx |
| ABOUT US | Header/Navigation | `/nosotros` | Navigation.tsx |
| Mission | Dropdown | `/#mision` | Navigation.tsx |
| Vision | Dropdown | `/#vision` | Navigation.tsx |
| Values | Dropdown | `/#valores` | Navigation.tsx |
| Purpose | Dropdown | `/#proposito` | Navigation.tsx |
| ADMISSIONS | Header/Navigation | `/admisiones` | Navigation.tsx |
| GALLERY | Header/Navigation | `/galeria` | Navigation.tsx |
| CONTACT US | Header/Navigation | `/contact` | Navigation.tsx |
| Sponsor | Header | `/donaciones` | Header.tsx |

### Footer Links
| Link | Destino | Estado |
|------|---------|--------|
| Home | `/` | ✅ Existe |
| About Us | `/about` | ❌ No implementado |
| Courses | `/courses` | ❌ No implementado |
| Contact | `/contact` | ❌ No implementado |
| Early Childhood Education | `/services/educacion-infantil` | ❌ No implementado |
| Extracurricular Activities | `/services/actividades` | ❌ No implementado |
| Family Support | `/services/apoyo-familiar` | ❌ No implementado |
| Workshops | `/services/talleres` | ❌ No implementado |
| Gallery | `/gallery` | ⚠️ Existe como `/galeria` |

### Hero Section Links
| Link | Origen | Destino | Componente |
|------|--------|---------|------------|
| APPLY NOW | Hero Section | `/admisiones` | HeroSection.tsx |
| OUR CLASSES | Hero Section | `/#` | HeroSection.tsx |

### Payment Flow Links
| Link | Origen | Destino | Componente |
|------|--------|---------|------------|
| Return to Home | Approved/Declined/Cancel | `/` | Varios |
| Try Again | Declined | `/donaciones` | Declined/page.tsx |
| Complete Your Donation | Cancel | `/donaciones` | Cancel/page.tsx |
| Contact Support | Declined | `#contact` | Declined/page.tsx |

---

## Links Externos

### Formularios de Admisión
| Descripción | URL | Componente |
|-------------|-----|------------|
| Agendar Cita (WhatsApp) | `https://services.tochat.be/es/whatsapp-business-directory/person/573b8be9-543f-4cad-b00f-21fa720ac55b` | AdmissionsSection.tsx |
| Formulario de Admisión | `https://docs.google.com/forms/d/e/1FAIpQLSew3PwL6kkulsLr0Ayyfy36DuUxZhVI9arzjV1XA6zvWhuFqw/viewform` | AdmissionsSection.tsx |
| Solicitud de Beca | `https://docs.google.com/forms/d/e/1FAIpQLScydBLqzdD9XPQYdMCWLAIg8cNMC1UV5p9d98hZw21JaNetvQ/viewform` | AdmissionsSection.tsx |
| Consultas | `https://docs.google.com/forms/d/e/1FAIpQLScO1ts3uRkswZxvGm3QFC7-fYgyCysE7qZEKDSAvx5OnFCB3g/viewform` | AdmissionsSection.tsx |

### Redes Sociales
Todas las redes sociales actualmente tienen `href="#"` (no configuradas):
- Facebook
- YouTube
- Instagram
- LinkedIn
- Pinterest

**Componente**: `SocialLinks.tsx`

### Schema.org Links (en layout.tsx)
| Red Social | URL |
|------------|-----|
| Facebook | `https://facebook.com/pccs.education` |
| Twitter | `https://twitter.com/pccs_education` |
| Instagram | `https://instagram.com/pccs.education` |
| LinkedIn | `https://linkedin.com/company/pccs-education` |

### Teléfonos
| Número | Formato Link | Ubicación |
|--------|--------------|-----------|
| +1-809-917-7855 | `tel:+1-809-917-7855` | Header, AdmissionsSection |
| +1 (849) 855 1635 | `tel:+18498551635` | Footer |

### Emails
| Email | Formato Link | Ubicación |
|-------|--------------|-----------|
| info@pccs.edu.do | `mailto:info@pccs.edu.do` | Header, Footer |

---

## API Endpoints

### Donation Management

#### `GET /api/donation-types`
- **Archivo**: `src/app/api/donation-types/route.ts`
- **Descripción**: Obtiene todos los tipos de donación disponibles
- **Usado en**: `DonationsSection.tsx`
- **Respuesta**: Array de objetos `DonationType`

#### `POST /api/donation-types/seed`
- **Archivo**: `src/app/api/donation-types/seed/route.ts`
- **Descripción**: Seed inicial de tipos de donación
- **Uso**: Desarrollo/Setup inicial

#### `GET /api/donations/[id]`
- **Archivo**: `src/app/api/donations/[id]/route.ts`
- **Descripción**: Obtiene detalles de una donación específica
- **Parámetros**: `id` - ID de la donación

### Payment Gateway (Azul)

#### `POST /api/azul/initiate-payment`
- **Archivo**: `src/app/api/azul/initiate-payment/route.ts`
- **Descripción**: Inicia el proceso de pago con Azul
- **Usado en**: `AzulPaymentButton.tsx`
- **Body**:
  ```json
  {
    "amount": number,
    "description": string,
    "donationTypeId": string
  }
  ```
- **Respuesta**: URL de redirección a pasarela Azul

#### `POST /api/azul/validate-response`
- **Archivo**: `src/app/api/azul/validate-response/route.ts`
- **Descripción**: Valida la respuesta de Azul después del pago
- **Usado en**: `Approved/page.tsx`, `Declined/page.tsx`, `Cancel/page.tsx`
- **Body**:
  ```json
  {
    "queryString": string,
    "callbackType": "approved" | "declined" | "cancelled"
  }
  ```

---

## Archivos de Configuración

### Next.js Config
- **sitemap.ts**: Define el sitemap XML del sitio
- **robots.ts**: Define las reglas para robots/crawlers
- **layout.tsx**: Layout principal con Header y Footer
- **constant.tsx**: Constantes del proyecto (contactInfo)

### Tipos de Datos
Tipos importantes definidos:
- `DonationType`: Tipos de donación
- `DonationImage`: Imágenes de donación
- `AzulPaymentResponse`: Respuesta de Azul
- `MenuItem`: Items del menú

---

## Notas Importantes

### ⚠️ Rutas No Implementadas
Las siguientes rutas están definidas en el sitemap pero no tienen páginas:
- `/about`
- `/courses`
- `/staff`
- `/contact`
- `/blog`

### ⚠️ Inconsistencias
1. Footer links apuntan a `/gallery` pero la ruta real es `/galeria`
2. Redes sociales no configuradas (todos apuntan a `#`)
3. Teléfonos diferentes en Header (+1-809-917-7855) y Footer (+1-809-917-7855)

### ✅ Características Destacadas
1. Sistema completo de pago integrado con Azul
2. Gestión de donaciones con base de datos
3. Loading screen animado en home
4. Diseño responsivo con menú móvil
5. Múltiples formularios de admisión vía Google Forms
6. SEO optimizado con metadata y structured data

---

**Última actualización**: 2025-11-14
**Versión del proyecto**: 0.1.0
**Framework**: Next.js 15.5.3
