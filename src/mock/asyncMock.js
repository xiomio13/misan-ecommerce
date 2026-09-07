// src/mock/asyncMock.js

const products = [
  {
    id: 'polo-01',
    name: 'Polo Piqué Clásico Azul Marino',
    price: 69,
    category: 'Polos Clásicos',
    img: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=600&auto=format&fit=crop&q=80',
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
    img: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=80',
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
    img: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80',
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
    img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
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
    img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
    stock: 10,
    description: 'Tejido piqué de doble hebra con pechera reforzada y botones grabados.',
    material: 'Piqué Doble Hebra',
    fit: 'Custom Fit',
    sizes: ['M', 'L', 'XL'],
    sku: 'MSN-PIQ-005'
  }
];

// Obtener todos los productos (se mantiene para ItemListContainer)
export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 1500);
  });
};

// NUEVA FUNCIÓN DINÁMICA: Buscar un producto por ID
export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const productFound = products.find((p) => p.id === productId);
      if (productFound) {
        resolve(productFound);
      } else {
        reject(new Error(`Producto con identificador "${productId}" no encontrado.`));
      }
    }, 1500);
  });
};