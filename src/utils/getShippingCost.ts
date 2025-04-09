export default function getShippingCost(weight: number): number {
  if ((weight === 0)) return 0;
  if (weight <= 100) return 2.5;
  if (weight <= 250) return 5;
  if (weight <= 500) return 6.5;
  if (weight <= 1000) return 8.5;
  return 10;
}
