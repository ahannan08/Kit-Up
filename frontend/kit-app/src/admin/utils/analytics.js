const kitKey = (clubName, type, jerseyId) => {
  if (clubName && type) return `${clubName} · ${type}`;
  if (type && jerseyId) return `${type} (#${jerseyId})`;
  return jerseyId ? `Kit #${jerseyId}` : 'Unknown kit';
};

const bump = (map, key, amount = 1) => {
  map.set(key, (map.get(key) || 0) + amount);
};

const topEntries = (map, limit = 8) =>
  [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));

export const computeDashboardMetrics = (events, catalog) => {
  const purchases = events.purchases || [];
  const attempts = events.attempts || [];
  const cartEvents = events.cartEvents || [];
  const productViews = events.productViews || [];

  const paymentsReceived = purchases.reduce((sum, p) => sum + (Number(p.totalPrice) || 0), 0);
  const totalOrders = purchases.length;
  const paymentsFailed = attempts.filter((a) => a.stage === 'payment_failed').length;
  const checkoutStarted = attempts.filter((a) => a.stage === 'started').length;
  const checkoutAbandoned = attempts.filter((a) => a.stage === 'abandoned').length;
  const cartAdds = cartEvents.reduce((sum, e) => sum + (e.quantity || 1), 0);
  const productViewCount = productViews.length;

  const avgOrderValue = totalOrders ? Math.round(paymentsReceived / totalOrders) : 0;
  const conversionRate =
    checkoutStarted + totalOrders > 0
      ? Math.round((totalOrders / (checkoutStarted + totalOrders)) * 100)
      : 0;

  const purchasedMap = new Map();
  purchases.forEach((p) => {
    p.items?.forEach((item) => {
      bump(purchasedMap, kitKey(item.clubName, item.type, item.jerseyId), item.quantity || 1);
    });
  });

  const cartMap = new Map();
  cartEvents.forEach((e) => {
    bump(cartMap, kitKey(e.clubName, e.type, e.jerseyId), e.quantity || 1);
  });

  const viewsMap = new Map();
  productViews.forEach((v) => {
    bump(viewsMap, kitKey(v.clubName, v.type, v.jerseyId), 1);
  });

  const funnel = [
    { label: 'Checkout started', value: checkoutStarted, tone: 'neutral' },
    { label: 'Added to cart', value: cartAdds, tone: 'accent' },
    { label: 'Orders completed', value: totalOrders, tone: 'success' },
    { label: 'Payment failed', value: paymentsFailed, tone: 'danger' },
    { label: 'Abandoned checkout', value: checkoutAbandoned, tone: 'warn' },
  ];

  const revenueByDay = buildRevenueSeries(purchases, 7);

  return {
    kpis: {
      totalOrders,
      paymentsReceived,
      paymentsFailed,
      checkoutStarted,
      checkoutAbandoned,
      cartAdds,
      productViewCount,
      avgOrderValue,
      conversionRate,
      leagues: catalog.leagues.length,
      clubs: catalog.clubs.length,
      jerseys: catalog.jerseys.length,
    },
    topPurchased: topEntries(purchasedMap),
    topCartAdds: topEntries(cartMap),
    topViews: topEntries(viewsMap),
    funnel,
    revenueByDay,
  };
};

const buildRevenueSeries = (purchases, days) => {
  const buckets = [];
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    buckets.push({
      label: d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }),
      dateKey: key,
      value: 0,
    });
  }

  purchases.forEach((p) => {
    if (!p.completedAt) return;
    const key = p.completedAt.slice(0, 10);
    const bucket = buckets.find((b) => b.dateKey === key);
    if (bucket) bucket.value += Number(p.totalPrice) || 0;
  });

  return buckets;
};

export const formatMoney = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
    n || 0
  );
