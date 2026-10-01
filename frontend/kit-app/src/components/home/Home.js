import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faLock,
  faMedal,
  faRotateLeft,
  faTruckFast,
} from '@fortawesome/free-solid-svg-icons';
import Club from './club/Club';
import JerseyCard from '../common/JerseyCard';
import Reveal from '../common/Reveal';
import Footer from '../common/Footer';
import Stars from '../common/Stars';
import { allJerseys, leagues, totalClubs } from '../../data/catalog';
import './home.css';

const heroClubs = ['Real Madrid', 'Manchester United', 'FC Barcelona'];

const perks = [
  { icon: faMedal, title: 'Top-rated kits', text: 'Rated by fans, so you can pick with confidence.' },
  { icon: faTruckFast, title: 'Fast dispatch', text: 'Orders are packed and shipped quickly.' },
  { icon: faLock, title: 'Secure checkout', text: 'Card payments are processed by Stripe.' },
  { icon: faRotateLeft, title: 'Easy returns', text: 'Wrong fit? Send it back without the hassle.' },
];

const testimonials = [
  {
    quote:
      'Picked up the Real Madrid home kit — colours are sharp and the fit is exactly what I wanted for match days.',
    name: 'Carlos R.',
    detail: 'Madrid, Spain',
    rating: 5,
  },
  {
    quote:
      'Easy to browse by league, checkout was smooth, and my Liverpool away shirt arrived quicker than I expected.',
    name: 'Emma T.',
    detail: 'Liverpool supporter',
    rating: 5,
  },
  {
    quote:
      'Great selection across Serie A clubs. The Inter Milan kit quality feels premium for the price.',
    name: 'Marco B.',
    detail: 'Inter Milan fan',
    rating: 4,
  },
];

const Home = ({ searchTerm = '' }) => {
  const location = useLocation();
  const [activeLeague, setActiveLeague] = useState(location.state?.league || 'All');
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateCarouselScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 4) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxScroll - 4);
  }, []);

  useEffect(() => {
    if (location.state?.league) {
      setActiveLeague(location.state.league);
      document.getElementById('leagues')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  const heroJerseys = useMemo(
    () =>
      heroClubs
        .map((club) => allJerseys.find((j) => j.club === club && j.type === 'Home'))
        .filter(Boolean),
    []
  );

  const topRated = useMemo(
    () => [...allJerseys].sort((a, b) => b.rating - a.rating).slice(0, 10),
    []
  );

  const crests = useMemo(() => leagues.flatMap((league) => league.clubs), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    updateCarouselScroll();
    track.addEventListener('scroll', updateCarouselScroll, { passive: true });
    window.addEventListener('resize', updateCarouselScroll);
    return () => {
      track.removeEventListener('scroll', updateCarouselScroll);
      window.removeEventListener('resize', updateCarouselScroll);
    };
  }, [topRated.length, updateCarouselScroll]);

  const scrollTrack = (direction) => {
    const track = trackRef.current;
    if (track) {
      track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: 'smooth' });
      window.setTimeout(updateCarouselScroll, 400);
    }
  };

  if (searchTerm) {
    return (
      <main className="ku-page">
        <section className="ku-container ku-search-head">
          <span className="ku-eyebrow">Search</span>
          <h1 className="ku-section-title">Clubs matching “{searchTerm}”</h1>
        </section>
        <Club searchTerm={searchTerm} activeLeague="All" setActiveLeague={() => {}} hideTabs />
        <Footer />
      </main>
    );
  }

  return (
    <main className="ku-page">
      <section className="ku-hero">
        <div className="ku-hero-glow ku-hero-glow--a" />
        <div className="ku-hero-glow ku-hero-glow--b" />
        <div className="ku-hero-grid-bg" />

        <div className="ku-container ku-hero-inner">
          <div className="ku-hero-copy">
            <span className="ku-hero-tag">
              <span className="ku-hero-tag-dot" /> New season kits are in
            </span>
            <h1>
              Wear your club's <span className="ku-gradient-text">colours.</span>
            </h1>
            <p>
              Home and away jerseys from {totalClubs} clubs across Europe's top five leagues.
              Pick your club and find your kit.
            </p>
            <div className="ku-hero-ctas">
              <a href="#leagues" className="ku-btn ku-btn--primary">
                Shop by club <FontAwesomeIcon icon={faArrowDown} />
              </a>
              <a href="#top-rated" className="ku-btn ku-btn--light">
                Top rated kits
              </a>
            </div>
            <dl className="ku-hero-stats">
              <div>
                <dt>{totalClubs}</dt>
                <dd>Clubs</dd>
              </div>
              <div>
                <dt>{leagues.length}</dt>
                <dd>Leagues</dd>
              </div>
              <div>
                <dt>{allJerseys.length}</dt>
                <dd>Kits</dd>
              </div>
            </dl>
          </div>

          <div className="ku-hero-art" aria-hidden="true">
            {heroJerseys.map((jersey, i) => (
              <div key={jersey._id} className={`ku-hero-kit ku-hero-kit--${i}`}>
                <img src={jersey.Image} alt="" />
                <span>{jersey.club}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="ku-marquee" aria-hidden="true">
        <div className="ku-marquee-track">
          {[...crests, ...crests].map((club, i) => (
            <img key={`${club.club}-${i}`} src={club.Image} alt="" />
          ))}
        </div>
      </div>

      <section id="top-rated" className="ku-container ku-section">
        <Reveal className="ku-section-head">
          <div>
            <span className="ku-eyebrow">Fan favourites</span>
            <h2 className="ku-section-title">Top rated kits</h2>
          </div>
          <div className="ku-carousel-nav">
            <button
              type="button"
              className="ku-round-btn"
              onClick={() => scrollTrack(-1)}
              disabled={!canScrollPrev}
              aria-label="Previous"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              type="button"
              className="ku-round-btn"
              onClick={() => scrollTrack(1)}
              disabled={!canScrollNext}
              aria-label="Next"
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </Reveal>
        <div className="ku-carousel" ref={trackRef}>
          {topRated.map((jersey, i) => (
            <Reveal key={jersey._id + jersey.type} className="ku-carousel-item" delay={Math.min(i, 5) * 70}>
              <JerseyCard jersey={jersey} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="leagues" className="ku-section ku-section--tint">
        <div className="ku-container">
          <Reveal className="ku-section-head ku-section-head--stack">
            <span className="ku-eyebrow">Shop by club</span>
            <h2 className="ku-section-title">Find your club</h2>
          </Reveal>
        </div>
        <Club searchTerm="" activeLeague={activeLeague} setActiveLeague={setActiveLeague} />
      </section>

      <section className="ku-container ku-section">
        <div className="ku-perks">
          {perks.map((perk, i) => (
            <Reveal key={perk.title} delay={i * 90}>
              <div className="ku-perk">
                <span className="ku-perk-icon">
                  <FontAwesomeIcon icon={perk.icon} />
                </span>
                <h3>{perk.title}</h3>
                <p>{perk.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="testimonials" className="ku-section ku-testimonials">
        <div className="ku-container">
          <Reveal className="ku-section-head ku-section-head--stack">
            <span className="ku-eyebrow">Real fans</span>
            <h2 className="ku-section-title">What kit buyers say</h2>
          </Reveal>
          <div className="ku-testimonial-grid">
            {testimonials.map((item, i) => (
              <Reveal key={item.name} delay={i * 90}>
                <figure className="ku-testimonial">
                  <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                  <figcaption>
                    <Stars rating={item.rating} />
                    <span className="ku-testimonial-name">{item.name}</span>
                    <span className="ku-testimonial-detail">{item.detail}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
