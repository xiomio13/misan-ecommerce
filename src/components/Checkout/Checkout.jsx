import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import styles from './Checkout.module.css';

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

  if (!currentUser) {
    return <Navigate to="/auth" state={{ from: '/checkout' }} replace />;
  }

  if (cart.length === 0 && !orderId) {
    return <Navigate to="/cart" replace />;
  }

  if (orderId) {
    return (
      <div className={styles.successCard}>
        <h1 className={styles.successTitle}>¡Gracias por tu compra en Misan!</h1>
        <p className={styles.successMsg}>Tu pedido fue procesado exitosamente.</p>

        <div className={styles.orderBox}>
          <p className={styles.orderLabel}>Código de seguimiento de tu orden:</p>
          <strong className={styles.orderCode}>{orderId}</strong>
        </div>

        <p className={styles.emailConfirm}>
          Enviamos el detalle de confirmación a tu correo: <strong>{currentUser.email}</strong>.
        </p>

        <Link to="/" className={styles.btnHome}>
          Volver a la tienda
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { name, phone, address, city } = buyer;

    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim()) {
      return 'Todos los campos son obligatorios y no pueden contener solo espacios.';
    }

    if (name.trim().length < 3) {
      return 'El nombre completo debe tener al menos 3 caracteres.';
    }

    const cleanPhone = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return 'El teléfono debe contener entre 7 y 15 dígitos numéricos válidos.';
    }

    return null;
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    const orderData = {
      buyer: {
        email: currentUser.email,
        name: buyer.name.trim(),
        phone: buyer.phone.trim(),
        address: buyer.address.trim(),
        city: buyer.city.trim()
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
      const ordersRef = collection(db, 'orders');
      const docRef = await addDoc(ordersRef, orderData);

      for (const item of cart) {
        const productRef = doc(db, 'products', item.id);
        const newStock = Math.max(0, (item.stock || 0) - item.quantity);
        await updateDoc(productRef, { stock: newStock });
      }

      setOrderId(docRef.id);
      clear();
    } catch (err) {
      console.error('Error al generar la orden:', err);
      setError('Hubo un error al procesar tu orden. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Finalizar Compra</h1>
      <p className={styles.userSubtitle}>
        Comprando como: <strong>{currentUser.email}</strong>
      </p>

      {error && <p className={styles.errorBanner}>{error}</p>}

      <form onSubmit={handleCreateOrder} noValidate className={styles.formGrid}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Nombre completo:</label>
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleInputChange}
            placeholder="Ej. Xiomara Díaz"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Teléfono de contacto:</label>
          <input
            type="tel"
            name="phone"
            value={buyer.phone}
            onChange={handleInputChange}
            placeholder="Ej. 987654321"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroupFull}>
          <label className={styles.label}>Dirección de entrega:</label>
          <input
            type="text"
            name="address"
            value={buyer.address}
            onChange={handleInputChange}
            placeholder="Av. Principal 123, Dpto 401"
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroupFull}>
          <label className={styles.label}>Ciudad:</label>
          <input
            type="text"
            name="city"
            value={buyer.city}
            onChange={handleInputChange}
            placeholder="Ej. Lima"
            className={styles.input}
          />
        </div>

        <div className={styles.footerRow}>
          <div>
            <span className={styles.totalLabel}>Total a pagar:</span>
            <div className={styles.totalAmount}>S/ {totalPrice}.00</div>
          </div>

          <button type="submit" disabled={loading} className={styles.btnSubmit}>
            {loading ? 'Generando orden...' : 'Confirmar Orden de Compra'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;