// src/components/Checkout.jsx
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Checkout() {
  const { cart, totalPrice, clear } = useCart();
  const { currentUser } = useAuth();

  const [buyer, setBuyer] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Lima'
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Protección de checkout: si no inició sesión, redirige a /auth
  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: '/checkout' }} replace />;
  }

  // Si no hay productos en el carrito y no se ha generado una orden, regresa a /cart
  if (cart.length === 0 && !orderId) {
    return <Navigate to="/cart" replace />;
  }

  const handleInputChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Estructura de la orden de compra requerida
    const orderData = {
      buyer: {
        email: currentUser.email,
        name: buyer.name.trim(),
        phone: buyer.phone.trim(),
        address: buyer.address.trim(),
        city: buyer.city
      },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.selectedSize || 'Estándar',
        subtotal: item.price * item.quantity
      })),
      total: totalPrice,
      date: serverTimestamp(),
      status: 'generada'
    };

    try {
      // 1. Guardar la orden en la colección 'orders' de Cloud Firestore
      const ordersRef = collection(db, 'orders');
      const docRef = await addDoc(ordersRef, orderData);

      // 2. Descontar el stock de cada polo adquirido en Firestore
      for (const item of cart) {
        const productRef = doc(db, 'products', item.id);
        const newStock = Math.max(0, (item.stock || 0) - item.quantity);
        await updateDoc(productRef, { stock: newStock });
      }

      // 3. Registrar el ID generado y vaciar el carrito
      setOrderId(docRef.id);
      clear();
    } catch (err) {
      console.error('Error al generar la orden:', err);
      setError('Hubo un error al procesar tu orden. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '2.5rem', background: '#fff', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <h1 style={{ color: '#2a9d8f', marginBottom: '1rem' }}>¡Gracias por tu compra en Misan!</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Tu pedido fue procesado exitosamente.</p>
        
        <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '6px', border: '1px dashed #2a9d8f', marginBottom: '2rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>Código de seguimiento de tu orden:</p>
          <strong style={{ fontSize: '1.4rem', color: '#1d3557', wordBreak: 'break-all' }}>{orderId}</strong>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#6c757d', marginBottom: '2rem' }}>
          Enviamos el detalle de confirmación a tu correo: <strong>{currentUser.email}</strong>.
        </p>

        <Link
          to="/"
          style={{ display: 'inline-block', padding: '0.8rem 1.8rem', background: '#1d3557', color: '#fff', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1 style={{ color: '#1d3557', marginBottom: '0.5rem' }}>Finalizar Compra</h1>
      <p style={{ color: '#6c757d', marginBottom: '2rem' }}>
        Comprando como: <strong>{currentUser.email}</strong>
      </p>

      {error && (
        <p style={{ color: '#e63946', background: '#ffebee', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem' }}>
          {error}
        </p>
      )}

      <form onSubmit={handleCreateOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Nombre completo:</label>
          <input
            type="text"
            name="name"
            required
            value={buyer.name}
            onChange={handleInputChange}
            placeholder="Ej. Xiomara Díaz"
            style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Teléfono de contacto:</label>
          <input
            type="tel"
            name="phone"
            required
            value={buyer.phone}
            onChange={handleInputChange}
            placeholder="Ej. +51 987654321"
            style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', gridColumn: 'span 2' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Dirección de entrega:</label>
          <input
            type="text"
            name="address"
            required
            value={buyer.address}
            onChange={handleInputChange}
            placeholder="Av. Principal 123, Dpto 401"
            style={{ padding: '0.6rem', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>

        <div style={{ gridColumn: 'span 2', borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.9rem', color: '#6c757d' }}>Total a pagar:</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#e63946' }}>
              S/ {totalPrice}.00
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ padding: '0.9rem 2rem', background: '#2a9d8f', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Generando orden...' : 'Confirmar Orden de Compra'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;