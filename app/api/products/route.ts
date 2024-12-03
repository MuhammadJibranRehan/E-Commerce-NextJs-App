import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'Sneaker', price: 100, description: 'Sneakers are shoes with rubber soles that are designed for physical activity, such as running or playing sports, but are also commonly worn casually. They are often comfortable and have lots of padding, and typically feature custom cushioning and support systems for shock absorption.Here are some synonyms for sneakers: trainers, running shoes, tennis shoes, plimsolls, and gym shoes. ' },
  { id: 2, name: 'Product 2', price: 200, description: 'Description for Product 2' },
  { id: 3, name: 'Product 3', price: 300, description: 'Description for Product 3' },
];

// Fetch all products
export async function GET() {
  return NextResponse.json(products);
}
