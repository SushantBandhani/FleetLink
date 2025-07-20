export function getCustomerId() {
  let customerId = localStorage.getItem("customerId");

  if (!customerId) {
    customerId = generateHexId();
    localStorage.setItem("customerId", customerId);
  }

  return customerId;
}

function generateHexId() {
  const chars = 'abcdef0123456789';
  return Array.from({ length: 24 }, () => chars[Math.floor(Math.random() * 16)]).join('');
}

