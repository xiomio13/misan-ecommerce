# 👕 Misan - Tienda Online de Polos para Caballero

Aplicación web interactiva de comercio electrónico desarrollada con **React** y **Vite**, enfocada en la venta de polos premium para caballeros (clásicos, slim fit y oversize).

---

## 🚀 Tecnologías Utilizadas

- **React** (Componentes Funcionales y Hooks)
- **Vite** (Herramienta de compilación y empaquetado)
- **JavaScript (ES6+)**
- **Git y GitHub** (Control de versiones)

---

## 🧠 Gestión de Estado e Interactividad (`useState`)

La interactividad de la aplicación se centraliza en el componente `Item.jsx` (Tarjeta de Producto), donde cada polo gestiona su propio estado local independiente:

### 1. Contador de Cantidad

- **Estado:** Inicializado en `0` mediante `const [cantidad, setCantidad] = useState(0)`.
- **Setters Funcionales:** Se utilizó la sintaxis `setCantidad(prev => prev + 1)` en lugar de `setCantidad(cantidad + 1)`. Esto garantiza que React siempre lea el estado previo más reciente en cola de renderizado, evitando inconsistencias por la naturaleza asíncrona del estado.
- **Lógica Defensiva:** En la función de disminución se implementó `setCantidad(prev => (prev > 0 ? prev - 1 : 0))` para asegurar que la cantidad nunca sea menor a cero.

### 2. Botón de Favoritos (Toggle)

- **Estado:** Inicializado como booleano mediante `const [esFavorito, setEsFavorito] = useState(false)`.
- **Inversión de Estado:** La función `toggleFavorite` actualiza el valor mediante `setEsFavorito(prev => !prev)`.
- **Renderizado Condicional:** La interfaz reacciona al valor booleano alternando el texto, icono (`❤️` / `🤍`) y estilos del botón.

### 3. Inmutabilidad en React

En ningún momento se mutaron las variables de estado directamente (prohibido `cantidad++` o `esFavorito = true`). Todas las modificaciones se realizaron a través de sus respectivas funciones actualizadoras, preservando la inmutabilidad y permitiendo que React detecte los cambios para programar el re-renderizado del Virtual DOM.

---

## 💻 Instrucciones de Instalación y Ejecución Local

1. **Clonar este repositorio:**
   ```bash
   git clone [https://github.com/xiomio13/misan-ecommerce.git](https://github.com/xiomio13/misan-ecommerce.git)
   ```
