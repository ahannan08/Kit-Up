import { newId } from './constants.js';

export const buildSeedEvents = () => {
  const now = Date.now();
  const day = 86400000;

  const purchases = [
    {
      id: newId(),
      userId: 'demo-user-1',
      userEmail: 'james.fan@example.com',
      userName: 'James',
      items: [
        {
          jerseyId: '3',
          clubName: 'Manchester United',
          type: 'Home',
          quantity: 1,
          price: 600,
          rating: 5,
          image: '',
        },
      ],
      totalPrice: 600,
      completedAt: new Date(now - day * 2).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-2',
      userEmail: 'emma.kop@example.com',
      userName: 'Emma',
      items: [
        {
          jerseyId: '8',
          clubName: 'Liverpool',
          type: 'Home',
          quantity: 2,
          price: 600,
          rating: 4,
          image: '',
        },
      ],
      totalPrice: 1200,
      completedAt: new Date(now - day).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-6',
      userEmail: 'alex.city@example.com',
      userName: 'Alex',
      items: [
        {
          jerseyId: '4',
          clubName: 'Manchester City',
          type: 'Home',
          quantity: 1,
          price: 600,
          rating: 5,
          image: '',
        },
      ],
      totalPrice: 600,
      completedAt: new Date(now - day * 4).toISOString(),
    },
  ];

  const attempts = [
    {
      id: newId(),
      userId: 'demo-user-3',
      userEmail: 'carlos.m@example.com',
      stage: 'started',
      cartSnapshot: [{ clubName: 'Real Madrid', type: 'Away', price: 400, quantity: 1 }],
      totalAmount: 400,
      createdAt: new Date(now - 3600000).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-4',
      userEmail: 'marco.b@example.com',
      stage: 'payment_failed',
      cartSnapshot: [{ clubName: 'Inter Milan', type: 'Home', price: 600, quantity: 1 }],
      totalAmount: 600,
      errorMessage: 'Card declined',
      createdAt: new Date(now - 7200000).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-5',
      userEmail: 'guest@example.com',
      stage: 'abandoned',
      cartSnapshot: [{ clubName: 'Arsenal', type: 'Home', price: 600, quantity: 1 }],
      totalAmount: 600,
      createdAt: new Date(now - day * 3).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-7',
      userEmail: 'fail@example.com',
      stage: 'payment_failed',
      cartSnapshot: [{ clubName: 'Liverpool', type: 'Away', price: 400, quantity: 1 }],
      totalAmount: 400,
      errorMessage: 'Insufficient funds',
      createdAt: new Date(now - day).toISOString(),
    },
  ];

  const cartEvents = [
    {
      id: newId(),
      userId: 'demo-user-1',
      userEmail: 'james.fan@example.com',
      jerseyId: '3',
      clubName: 'Manchester United',
      type: 'Home',
      price: 600,
      quantity: 1,
      createdAt: new Date(now - day * 2 - 3600000).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-2',
      userEmail: 'emma.kop@example.com',
      jerseyId: '8',
      clubName: 'Liverpool',
      type: 'Home',
      price: 600,
      quantity: 2,
      createdAt: new Date(now - day - 7200000).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-8',
      userEmail: 'fan@example.com',
      jerseyId: '8',
      clubName: 'Liverpool',
      type: 'Home',
      price: 600,
      quantity: 1,
      createdAt: new Date(now - 1800000).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-9',
      userEmail: 'madrid@example.com',
      jerseyId: '12',
      clubName: 'Real Madrid',
      type: 'Home',
      price: 600,
      quantity: 1,
      createdAt: new Date(now - 5400000).toISOString(),
    },
    {
      id: newId(),
      userId: 'demo-user-10',
      userEmail: 'arsenal@example.com',
      jerseyId: '1',
      clubName: 'Arsenal',
      type: 'Home',
      price: 600,
      quantity: 1,
      createdAt: new Date(now - day * 5).toISOString(),
    },
  ];

  const productViews = [
    {
      id: newId(),
      jerseyId: '8',
      clubName: 'Liverpool',
      type: 'Home',
      price: 600,
      createdAt: new Date(now - 900000).toISOString(),
    },
    {
      id: newId(),
      jerseyId: '3',
      clubName: 'Manchester United',
      type: 'Home',
      price: 600,
      createdAt: new Date(now - 1200000).toISOString(),
    },
    {
      id: newId(),
      jerseyId: '8',
      clubName: 'Liverpool',
      type: 'Home',
      price: 600,
      createdAt: new Date(now - 2400000).toISOString(),
    },
  ];

  return { purchases, attempts, cartEvents, productViews };
};
