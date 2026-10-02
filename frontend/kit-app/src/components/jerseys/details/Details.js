import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faCheck,
  faChevronRight,
  faCircleExclamation,
  faLock,
  faMinus,
  faPlus,
  faRotateLeft,
  faShirt,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import Stars from '../../common/Stars';
import JerseyCard from '../../common/JerseyCard';
import Reveal from '../../common/Reveal';
import Footer from '../../common/Footer';
import { useCatalog } from '../../../context/CatalogContext';
import { recordAddToCart, recordProductView } from '../../../admin/store/eventsStore.js';
import './details.css';

const MAX_QTY = 10;

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { findClub, jerseysForClub, jerseysForLeague } = useCatalog();
  const { jersey } = location.state || {};
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState(null);
  const zoomRef = useRef(null);

  const clubInfo = useMemo(() => (jersey ? findClub(jersey.club) : null), [jersey, findClub]);

  const clubKits = useMemo(
    () => (jersey ? jerseysForClub(jersey.club) : []),
    [jersey, jerseysForClub]
  );

  const related = useMemo(() => {
    if (!clubInfo || !jersey) return [];
    return jerseysForLeague(clubInfo.league)
      .filter((j) => j.club !== jersey.club)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [clubInfo, jersey, jerseysForLeague]);

  useEffect(() => setQuantity(1), [jersey]);

  useEffect(() => {
    if (!jersey?._id) return;
    recordProductView({
      jerseyId: jersey._id,
      clubName: jersey.club,
      type: jersey.type,
      price: jersey.price,
    });
  }, [jersey?._id, jersey?.club, jersey?.type, jersey?.price]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!jersey) {
    return (
      <main className="ku-page">
        <div className="ku-empty">
          <span className="ku-empty-icon">
            <FontAwesomeIcon icon={faShirt} />
          </span>
          <h2>No jersey selected</h2>
          <p>Pick a club and choose a kit to see its details.</p>
          <Link to="/" className="ku-btn ku-btn--dark">Browse clubs</Link>
        </div>
      </main>
    );
  }

  const handleZoom = (e) => {
    const node = zoomRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--zx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty('--zy', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  const showKit = (kit) => navigate('/jersey-details', { state: { jersey: kit }, replace: true });

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      setToast({ type: 'error', message: 'Please log in to add items to your cart.' });
      return;
    }

    setAdding(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          jerseyId: jersey._id,
          quantity,
          image: jersey.Image,
          type: jersey.type,
          rating: jersey.rating,
          price: jersey.price,
        }),
      });

      if (response.ok) {
        recordAddToCart({
          userId,
          userEmail: localStorage.getItem('userEmail'),
          jerseyId: jersey._id,
          clubName: jersey.club,
          type: jersey.type,
          price: jersey.price,
          quantity,
        });
        setToast({
          type: 'success',
          message: `${quantity} × ${jersey.club} ${jersey.type} kit added to your cart.`,
        });
      } else {
        const data = await response.json().catch(() => ({}));
        setToast({ type: 'error', message: data.message || 'Could not add this item to your cart.' });
      }
    } catch (error) {
      setToast({ type: 'error', message: 'Network error. Is the server running?' });
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="ku-page ku-page--detail">
      <section className="ku-container ku-detail">
        <nav className="ku-breadcrumb ku-breadcrumb--dark" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <FontAwesomeIcon icon={faChevronRight} />
          <Link to={`/display/${jersey.club}`}>{jersey.club}</Link>
          <FontAwesomeIcon icon={faChevronRight} />
          <span>{jersey.type} kit</span>
        </nav>

        <div className="ku-detail-grid">
          <div className="ku-gallery">
            <div
              className="ku-gallery-main"
              ref={zoomRef}
              onMouseMove={handleZoom}
              key={`${jersey._id}-${jersey.type}`}
            >
              <span className={`ku-jersey-badge ku-jersey-badge--${jersey.type.toLowerCase()}`}>
                {jersey.type}
              </span>
              <img src={jersey.Image} alt={`${jersey.club} ${jersey.type} jersey`} />
            </div>

            {clubKits.length > 1 && (
              <div className="ku-gallery-thumbs">
                {clubKits.map((kit) => {
                  const active = kit._id === jersey._id && kit.type === jersey.type;
                  return (
                    <button
                      key={`${kit._id}-${kit.type}`}
                      type="button"
                      className={`ku-thumb ${active ? 'is-active' : ''}`}
                      onClick={() => !active && showKit(kit)}
                      aria-label={`View ${kit.type} kit`}
                    >
                      <img src={kit.Image} alt="" />
                      <span>{kit.type}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="ku-detail-info">
            {clubInfo && (
              <Link to={`/display/${jersey.club}`} className="ku-detail-club">
                <img src={clubInfo.Image} alt="" />
                <span>
                  {jersey.club}
                  <small>{clubInfo.league.name}</small>
                </span>
              </Link>
            )}

            <h1>{jersey.type} jersey</h1>

            <div className="ku-detail-rating">
              <Stars rating={jersey.rating} showValue />
              <span>Fan rating</span>
            </div>

            <div className="ku-detail-price">${jersey.price}</div>

            <ul className="ku-detail-specs">
              <li><span>Kit</span>{jersey.type}</li>
              <li><span>Club</span>{jersey.club}</li>
              {clubInfo && <li><span>League</span>{clubInfo.league.name}</li>}
              <li><span>Fabric</span>Quick-dry, breathable</li>
            </ul>

            <div className="ku-detail-buy">
              <div className="ku-qty" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span key={quantity}>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(MAX_QTY, q + 1))}
                  disabled={quantity >= MAX_QTY}
                  aria-label="Increase quantity"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>

              <button
                type="button"
                className={`ku-btn ku-btn--primary ku-btn--block ${adding ? 'is-loading' : ''}`}
                onClick={handleAddToCart}
                disabled={adding}
              >
                {adding ? <span className="ku-spinner" /> : <FontAwesomeIcon icon={faBagShopping} />}
                {adding ? 'Adding...' : `Add to cart · $${jersey.price * quantity}`}
              </button>
            </div>

            <Link to="/cart" className="ku-btn ku-btn--ghost ku-btn--block ku-btn--compact">View cart</Link>

            <ul className="ku-detail-perks">
              <li><FontAwesomeIcon icon={faTruckFast} /> Fast dispatch</li>
              <li><FontAwesomeIcon icon={faRotateLeft} /> Easy returns</li>
              <li><FontAwesomeIcon icon={faLock} /> Secure Stripe checkout</li>
            </ul>

            <details className="ku-detail-more">
              <summary>Delivery & returns</summary>
              <p>
                Track purchases from <Link to="/myorders">My orders</Link>. Unworn items can be returned
                if the fit is not right.
              </p>
            </details>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="ku-container ku-detail-related">
          <Reveal className="ku-section-head">
            <div>
              <span className="ku-eyebrow">{clubInfo.league.name}</span>
              <h2 className="ku-section-title">You may also like</h2>
            </div>
          </Reveal>
          <div className="ku-related-grid">
            {related.map((kit, i) => (
              <Reveal key={`${kit._id}-${kit.type}`} delay={i * 80}>
                <JerseyCard jersey={kit} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {toast && (
        <div className={`ku-toast ku-toast--${toast.type}`} role="status">
          <FontAwesomeIcon icon={toast.type === 'success' ? faCheck : faCircleExclamation} />
          <span>{toast.message}</span>
          {toast.type === 'success' && <Link to="/cart">View cart</Link>}
        </div>
      )}

      <Footer />
    </main>
  );
};

export default Details;
