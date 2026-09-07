# 👕 Misan - Tienda Online de Polos para Caballero

Aplicación web interactiva de comercio electrónico desarrollada con **React** y **Vite**, enfocada en la venta de polos premium para caballeros (clásicos, slim fit y oversize).

---

## 🚀 Tecnologías Utilizadas

- **React** (Componentes Funcionales y Hooks)
- **Vite** (Herramienta de compilación y empaquetado)
- **JavaScript (ES6+)**
- **Git y GitHub** (Control de versiones)

---

## 💻 Instrucciones de Instalación y Ejecución Local

1. **Clonar este repositorio:**
   ```bash
   git clone [https://github.com/xiomio13/misan-ecommerce.git](https://github.com/xiomio13/misan-ecommerce.git)
   ```


---

## 🧩 Componentes del Layout (Pre-entrega 2)

* **`Navbar`:** Barra de navegación superior con el logotipo de Misan, menú con categorías comerciales de polos y contenedor para el carrito de compras.
* **`CartWidget`:** Componente modular ubicado dentro del `Navbar` que renderiza el icono del carrito y la burbuja de notificación con la cantidad de artículos.
* **`ItemListContainer`:** Contenedor principal que recibe una prop `greeting` y muestra un mensaje de bienvenida personalizado y centrado en la vista.


## ⚡ Flujo Asíncrono y Renderizado Dinámico (Pre-entrega 3)

### 1. Simulación de API (`asyncMock.js`)
* Se exporta la función `getProducts` que retorna una `Promise`.
* Se implementó un retardo simulado de red de `2000ms` usando `setTimeout`.

### 2. Ciclo de Vida y Estado (`ItemListContainer.jsx`)
* El estado `items` se inicializa como un array vacío (`[]`).
* Se utiliza `useEffect` con array de dependencias vacío (`[]`) para disparar la carga de datos exclusivamente durante la fase de montaje.
* Implementación de flujo `async/await` con manejo de estados `loading` para mejorar la experiencia de usuario (UX).

### 3. Separación de Responsabilidades
* **`ItemListContainer`:** Componente contenedor enfocado en la obtención de datos y gestión de estado.
* **`ItemList`:** Componente presentacional encargado de iterar (`.map()`) la colección recibida por props.
* **`Item`:** Componente atómico que dibuja la card individual de cada polo, asociando `key={product.id}` de forma única y estable.

## 🔍 Detalle de Producto con Promesa Dinámica (Pre-entrega 4)

### 1. Búsqueda Asíncrona Dinámica (`getProductById`)
* Función exportada en `src/mock/asyncMock.js` que recibe un parámetro `productId`.
* Retorna una `Promise` que resuelve con el producto coincidente mediante `.find()` tras un retardo de `1500ms`, o rechaza con un error si no se encuentra.

### 2. Arquitectura y Separación de Responsabilidades
* **`ItemDetailContainer`**: Componente contenedor que ejecuta la promesa en su fase de montaje (`useEffect`), administrando los estados `product`, `loading` y `error`.
* **`ItemDetail`**: Componente de presentación puro que recibe el objeto por *props* y distribuye la vista en dos sectores (imagen principal y ficha técnica extendida con composición, calce, tallas y SKU).
* **`ItemCount`**: Componente reutilizado que regula la selección de unidades respetando el stock disponible del producto (`0 <= count <= stock`).