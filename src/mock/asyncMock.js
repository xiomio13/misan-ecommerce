

const products = [
  {
    id: "polo-01",
    name: "Polo Piqué Clásico Azul Marino",
    price: 69,
    category: "Polos Clásicos",
    img: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60",
    stock: 12,
    description:
      "100% algodón pima peruano con cuello camisero y tejido transpirable.",
  },
  {
    id: "polo-02",
    name: "Polo Slim Fit Blanco Minimal",
    price: 65,
    category: "Polos Slim Fit",
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
    stock: 8,
    description:
      "Corte entallado moderno, suave al tacto con elastano para mayor comodidad.",
  },
  {
    id: "polo-03",
    name: "Polo Oversize Streetwear Negro",
    price: 75,
    category: "Polos Oversize",
    img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60",
    stock: 15,
    description:
      "Corte holgado de caída pesada con hombros caídos y acabado premium.",
  },
  {
    id: "polo-04",
    name: "Polo Boxy Fit Verde Militar",
    price: 72,
    category: "Polos Oversize",
    img: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&auto=format&fit=crop&q=60",
    stock: 6,
    description:
      "Diseño cuadrado urbano en algodón grueso prelavado anti-encogimiento.",
  },
  {
    id: "polo-05",
    name: "Polo Piqué Texturado Borgoña",
    price: 70,
    category: "Polos Piqué",
    img: "https://images.unsplash.com/photo-1625910513413-72236a99292c?w=500&auto=format&fit=crop&q=60",
    stock: 10,
    description:
      "Tejido piqué de doble hebra con botones grabados y ajuste semi-formal.",
  },
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 2000);
  });
};
