// src/mock/asyncMock.js

const products = [
  {
    id: 'polo-01',
    name: 'Polo Piqué Clásico Azul Marino',
    price: 69,
    category: 'Polos Clásicos',
    categorySlug: 'clasicos',
    img: '/products/polo-01.jpeg', // Ruta local
    stock: 12,
    description: '100% algodón pima peruano con cuello camisero tradicional y tejido transpirable de alta durabilidad.',
    material: 'Algodón Pima 100%',
    fit: 'Classic Regular Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'MSN-PIQ-001'
  },
  {
    id: 'polo-02',
    name: 'Polo Slim Fit Blanco Minimal',
    price: 65,
    category: 'Polos Slim Fit',
    categorySlug: 'slim-fit',
    img: '/products/polo-02.jpeg', // Ruta local
    stock: 8,
    description: 'Corte entallado moderno, suave al tacto con 5% de elastano para máxima libertad de movimiento.',
    material: '95% Algodón, 5% Spandex',
    fit: 'Slim Fit Entallado',
    sizes: ['S', 'M', 'L'],
    sku: 'MSN-SLM-002'
  },
  {
    id: 'polo-03',
    name: 'Polo Oversize Streetwear Negro',
    price: 75,
    category: 'Polos Oversize',
    categorySlug: 'oversize',
    img: '/products/polo-03.jpeg', // Ruta local
    stock: 15,
    description: 'Corte holgado contemporáneo con hombros caídos y tela pesada de primera calidad.',
    material: 'Algodón Peinado 20/1 Pesado',
    fit: 'Boxy Oversize',
    sizes: ['M', 'L', 'XL'],
    sku: 'MSN-OVR-003'
  },
  {
    id: 'polo-04',
    name: 'Polo Boxy Fit Verde Olivo',
    price: 72,
    category: 'Polos Oversize',
    categorySlug: 'oversize',
    img: '/products/polo-04.jpeg', // Ruta local
    stock: 6,
    description: 'Diseño cuadrado urbano en algodón prelavado con tratamiento anti-encogimiento.',
    material: '100% Algodón Rústico',
    fit: 'Boxy Fit',
    sizes: ['S', 'M', 'L'],
    sku: 'MSN-BOX-004'
  },
  {
    id: 'polo-05',
    name: 'Polo Piqué Texturado Grafito',
    price: 70,
    category: 'Polos Piqué',
    categorySlug: 'pique',
    img: '/products/polo-05.jpeg', // Ruta local
    stock: 10,
    description: 'Tejido piqué de doble hebra con pechera reforzada y botones grabados.',
    material: 'Piqué Doble Hebra',
    fit: 'Custom Fit',
    sizes: ['M', 'L', 'XL'],
    sku: 'MSN-PIQ-005'
  }
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1000);
  });
};

export const getProductsByCategory = (categorySlug) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter((p) => p.categorySlug === categorySlug);
      resolve(filtered);
    }, 1000);
  });
};

export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productFound = products.find((p) => p.id === productId);
      if (productFound) {
        resolve(productFound);
      } else {
        reject(new Error(`Producto con identificador "${productId}" no encontrado.`));
      }
    }, 1000);
  });
};