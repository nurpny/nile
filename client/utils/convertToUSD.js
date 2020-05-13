export default function convertToUSD(cents) {
  let dollars = cents / 100;
  return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
}
