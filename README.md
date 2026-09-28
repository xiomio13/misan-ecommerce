# 👕 Misan - Tienda Online de Polos para Caballero

**Misan** es una Single Page Application (SPA) de comercio electrónico moderna y escalable, especializada en la venta exclusiva de polos de alta gama para caballero (cortes Clásicos, Slim Fit, Oversize y Piqué).

Desarrollada con **React**, **Vite** y conectada a la nube mediante **Firebase** (Cloud Firestore y Firebase Authentication), implementando arquitectura modular basada en componentes, enrutamiento dinámico, contexto global para el carrito y persistencia transaccional de compras en tiempo real.

---

## 🚀 Tecnologías Utilizadas

- **React 18 / 19** (Componentes Funcionales, Custom Hooks, Context API)
- **Vite** (Build Tool y entorno de desarrollo ultra-rápido)
- **React Router DOM 6** (Enrutamiento dinámico, parámetros de URL y rutas protegidas)
- **Firebase SDK Modular (v10 / v11)**:
  - **Cloud Firestore**: Base de datos NoSQL documental en la nube para catálogo y órdenes de compra.
  - **Firebase Authentication**: Gestión de usuarios, registro e inicio de sesión reactivo con persistencia de sesión (`onAuthStateChanged`).
- **JavaScript Moderno (ES6+)** (Funciones asíncronas con `async/await` y manejo de errores con `try/catch`)
- **CSS Modules / CSS3** (Estilos modulares y desacoplados por componente)
- **Git y GitHub** (Control de versiones mediante ramas de características y convenciones de commits)

---

## ✨ Funcionalidades y Arquitectura

- **Catálogo 100% en la Nube:** Productos consultados directamente desde Cloud Firestore mediante consultas condicionales (`query`, `where`).
- **Navegación Dinámica:** Rutas dedicadas para el catálogo completo (`/`), filtrado por categoría (`/category/:categoryId`) y ficha de detalle individual (`/item/:itemId`).
- **Ficha Técnica y Stock:** Vista de detalle con especificaciones (composición, calce, tallas) y selector de cantidades (`ItemCount`) condicionado por el stock real.
- **Carrito Global (`CartContext`):** Manejo de compras global e inmutable sin prop-drilling, cálculo reactivo de subtotales y clave compuesta (`id-talla`) para selección de variantes.
- **Sesión de Usuario Persistente:** Registro, inicio y cierre de sesión seguro mediante Firebase Authentication.
- **Checkout Protegido y Transaccional:** Acceso exclusivo a usuarios logueados, validación defensiva en JavaScript de los datos de contacto, persistencia de la orden con `serverTimestamp()` y actualización de stock remanente en tiempo real.

---

## 🔐 Variables de Entorno

El proyecto lee todas las credenciales de Firebase a través de variables de entorno para proteger la configuración.

Crea un archivo `.env` en la raíz del proyecto tomando como guía el archivo `.env.example`:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> **Nota de seguridad:** El archivo `.env` se encuentra estrictamente ignorado por `.gitignore` para no exponer credenciales privadas en el repositorio público.

---

## 🗄️ Colecciones en Cloud Firestore

### 1. Colección `products`

Almacena el inventario de polos masculinos disponibles en la tienda:

```json
{
  "name": "Polo Piqué Clásico Azul Marino",
  "category": "Polos Clásicos",
  "categorySlug": "clasicos",
  "price": 69,
  "stock": 12,
  "img": "https://images.unsplash.com/photo-1581655353564-df123a1eb820",
  "description": "100% algodón pima peruano con cuello camisero y tejido transpirable.",
  "material": "Algodón Pima 100%",
  "fit": "Classic Regular Fit",
  "sizes": ["S", "M", "L", "XL"],
  "sku": "MSN-PIQ-001"
}
```

### 2. Colección `orders`

Registra las compras completadas de forma atómica en el proceso de Checkout:

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

## 💻 Instrucciones de Instalación y Ejecución Local

Para clonar, configurar y ejecutar este proyecto en tu entorno local, sigue estos pasos desde la terminal:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/xiomio13/misan-ecommerce.git
   ```

2. **Ingresa a la carpeta del proyecto:**

   ```bash
   cd misan-ecommerce
   ```

3. **Instala las dependencias necesarias:**

   ```bash
   npm install
   ```

4. **Configura las variables de entorno:**
   Crea tu archivo `.env` en la raíz con tus credenciales de Firebase.

5. **Inicia el servidor de desarrollo local:**

   ```bash
   npm run dev
   ```

6. **Abre la aplicación en el navegador:**
   Ingresa a la dirección local indicada por la terminal (usualmente `http://localhost:5173`).
