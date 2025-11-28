import BasketItem from "../models/basket.model.js"

export async function addToBasket(menuItem) {
  const existing = await BasketItem.findOne({ item: menuItem.id });
  if (existing) {
    existing.adjustQuantity();
  } else {
    const newBasketItem = new BasketItem({
      item: menuItem.id,
    });
    await newBasketItem.save();
  };
};

export async function removeFromBasket(basketItem) {
  if (basketItem.quantity <= 0) {
    await basketItem.deleteOne();
  };
};