# 👕 Misan - Tienda Online de Polos para Caballero

**Misan** es una Single Page Application (SPA) de comercio electrónico moderna, modular y escalable, especializada en la venta exclusiva de polos de alta gama para caballero (cortes Clásicos, Slim Fit, Oversize y Piqué).

La aplicación fue desarrollada con **React** y **Vite**, e integrada con **Firebase** (Cloud Firestore y Firebase Authentication) para la gestión persistente del catálogo, usuarios y órdenes de compra. Se encuentra desplegada en producción a través de **Vercel** con reescritura de rutas para navegación fluida.

---

## 🌐 Demo en Producción

Puedes probar la tienda en línea y su flujo completo de compra en:  
👉 **[https://misan-ecommerce.vercel.app/](https://misan-ecommerce.vercel.app/)**

---

## 🚀 Tecnologías Utilizadas

- **React 18 / 19** (Componentes Funcionales, Hooks personalizados, Context API)
- **Vite** (Build Tool y entorno de desarrollo de alto rendimiento)
- **React Router DOM 6** (Enrutamiento dinámico SPA, rutas parametrizadas y protegidas)
- **Firebase SDK Modular (v9+)**:
  - **Cloud Firestore**: Base de datos documental NoSQL para catálogo y órdenes transaccionales.
  - **Firebase Authentication**: Gestión de usuarios, registro e inicio de sesión reactivo con persistencia de sesión (`onAuthStateChanged`).
- **JavaScript Moderno (ES6+)** (Programación asíncrona con `async/await` y manejo de excepciones)
- **CSS Modules** (Estilos modulares, encapsulados y diseño responsive para móviles y escritorio)
- **Vercel** (Hosting en la nube y configuración de rewrites para rutas SPA)
- **Git y GitHub** (Control de versiones con ramas feature y convención de Conventional Commits)

---

## ✨ Funcionalidades y Arquitectura

- **Catálogo en Tiempo Real:** Productos consumidos directamente desde Cloud Firestore mediante consultas dinámicas y filtrado por categoría (`query`, `where`).
- **Navegación SPA:** Rutas para todo el catálogo (`/`), categorías (`/category/:categoryId`) y detalle de prenda (`/item/:itemId`).
- **Ficha Técnica y Stock:** Vista de detalle con especificaciones (composición, calce, SKU) y selector interactivo (`ItemCount`) limitado por existencias reales.
- **Carrito Global (`CartContext`):** Estado global inmutable, cálculo automático de totales y control de variantes mediante clave compuesta (`id-talla`).
- **Autenticación de Clientes:** Inicio de sesión y registro de cuentas con Firebase Auth y control de errores en interfaz.
- **Checkout y Órdenes:** Proceso de compra exclusivo para usuarios autenticados con persistencia en Firestore (`orders`), registro de fecha con `serverTimestamp()` y generación de ID único de confirmación.
- **Diseño Responsive:** Interfaz adaptable a pantallas móviles (360px+) y escritorio, sin desbordamientos horizontales.

---

## 🔐 Variables de Entorno

El proyecto consume sus credenciales de Firebase desde variables de entorno para evitar exponer datos sensibles.

Crea un archivo `.env` en la raíz del proyecto tomando como guía el archivo `.env.example`:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> **Seguridad:** El archivo `.env` se encuentra ignorado por `.gitignore` y nunca se sube al repositorio público.

---

## 🗄️ Colecciones en Cloud Firestore

### 1. Colección `products`

Almacena las prendas del catálogo:

```json
{
  "name": "Polo Piqué Clásico Azul Marino",
  "category": "Polos Clásicos",
  "categorySlug": "clasicos",
  "price": 69,
  "stock": 12,
  "img": "/products/polo-01.jpeg",
  "description": "100% algodón pima peruano con cuello camisero y tejido transpirable.",
  "material": "Algodón Pima 100%",
  "fit": "Classic Regular Fit",
  "sizes": ["S", "M", "L", "XL"],
  "sku": "MSN-PIQ-001"
}
```

### 2. Colección `orders`

Registra cada compra generada tras el checkout:

```json
{
  "user": {
    "uid": "AB12cd34EF...",
    "email": "cliente@misan.pe"
  },
  "buyer": {
    "name": "Xiomara Díaz",
    "phone": "987654321",
    "address": "Av. Principal 123",
    "city": "Lima"
  },
  "items": [
    {
      "id": "polo-01",
      "name": "Polo Piqué Clásico Azul Marino",
      "price": 69,
      "quantity": 2,
      "size": "M",
      "subtotal": 138
    }
  ],
  "total": 138,
  "status": "generada",
  "createdAt": "ServerTimestamp"
}
```

---

## 💻 Instalación y Ejecución Local

Para clonar y poner en marcha el proyecto localmente, sigue estos pasos:

1. **Clonar el repositorio:**

   ```bash
   git clone [https://github.com/xiomio13/misan-ecommerce.git](https://github.com/xiomio13/misan-ecommerce.git)
   ```

2. **Entrar a la carpeta del proyecto:**

   ```bash
   cd misan-ecommerce
   ```

3. **Instalar dependencias:**

   ```bash
   npm install
   ```

4. **Configurar credenciales:**  
   Copia el archivo `.env.example` como `.env` en la raíz y completa los valores con tus claves de Firebase.

5. **Iniciar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

6. **Abrir en el navegador:**  
   Ingresa a la URL local indicada en la terminal (usualmente `http://localhost:5173`).
