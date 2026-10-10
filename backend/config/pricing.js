const homePrice = Number(process.env.HOME_KIT_PRICE) || 700;
const awayPrice = Number(process.env.AWAY_KIT_PRICE) || 500;

export const KIT_PRICES = {
  Home: homePrice,
  Away: awayPrice,
};

export function expectedPriceForType(type) {
  const price = KIT_PRICES[type];
  if (price == null) {
    return null;
  }
  return price;
}

export function assertValidKitPrice(type, price) {
  if (!type || expectedPriceForType(type) == null) {
    return { ok: false, message: 'type must be Home or Away' };
  }
  const expected = expectedPriceForType(type);
  if (Number(price) !== expected) {
    return {
      ok: false,
      message: `Invalid price for ${type} kit. Expected ₹${expected}.`,
    };
  }
  return { ok: true, price: expected };
}

export function lineTotalForItem(item) {
  const unit = expectedPriceForType(item.type);
  if (unit == null) {
    return null;
  }
  return unit * (item.quantity || 1);
}
