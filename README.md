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

## 🔍 Detalle de Producto, Enrutamiento Dinámico y Pruebas Unitarias (Pre-entrega 4)

### 1. Búsqueda Asíncrona Dinámica (`getProductById`)
* Función exportada en `src/mock/asyncMock.js` que recibe un identificador (`productId`).
* Retorna una `Promise` que resuelve con el objeto coincidente tras un retardo simulado de red de `1500ms`, o rechaza con un `Error` descriptivo si el ID no existe en el catálogo.

### 2. Navegación Dinámica (`react-router-dom`)
* **Ruta dinámica `/item/:itemId`:** Conectada en `App.jsx` mediante `BrowserRouter` y `Routes`.
* **Hook `useParams`:** Implementado en `ItemDetailContainer` para capturar el segmento dinámico de la URL de forma reactiva dentro de las dependencias de `useEffect`.
* **Navegación declarativa:** Tarjetas `Item` enlazadas mediante `<Link to={`/item/${id}`}>`.

### 3. Componentes y Separación de Responsabilidades
* **`ItemDetailContainer`:** Componente contenedor enfocado en la lógica asíncrona, control de estados (`product`, `loading`, `error`) y captura de parámetros de ruta.
* **`ItemDetail`:** Componente puramente presentacional que distribuye la ficha técnica (material, calce, tallas, precio, stock e imágenes).
* **`ItemCount`:** Componente modular reutilizable que gestiona la selección de unidades respetando los límites reales del producto (`0 <= count <= stock`).

### 4. Cobertura de Pruebas Unitarias (Vitest & Testing Library)
* **`asyncMock.test.js`:** Valida la resolución correcta de la promesa con datos reales y su rechazo ante identificadores no encontrados.
* **`ItemCount.test.jsx`:** Valida que el contador respete los topes de cantidad (límite inferior `0` y límite superior `stock`) y la llamada a la función de adición.
* **Ejecución local de pruebas:** `npm run test`