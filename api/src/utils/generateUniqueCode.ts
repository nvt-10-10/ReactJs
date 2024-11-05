export function generateUniqueCode(length: number = 32): string {
  const randomSuffix = generateMixedRandomSuffix(length); // Generate a random mixed suffix of specified length
  const timestamp = Date.now(); // Get the current timestamp

  // Combine the random mixed suffix with the timestamp at the end
  return `${randomSuffix}-${timestamp}`;
}

function generateMixedRandomSuffix(length: number): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Alphanumeric characters
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex]; // Randomly select a character from the set
  }

  return result;
}
