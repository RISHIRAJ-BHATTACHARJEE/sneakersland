export const createMockOrder = (amount: number, currency: string) => {
  return {
    id: `order_${Math.random().toString(36).substr(2, 9)}`, // Random order ID
    amount: amount * 100, // Convert amount to paise
    currency,
    receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`, // Random receipt ID
    notes: {
      description: "Mock payment for testing",
    },
  };
};
