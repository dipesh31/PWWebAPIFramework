export function generateRandomUsername(prefix: string = "user"): string {
  const randomSuffix = Math.random().toString(36).substring(2, 10);
  return `${prefix}_${randomSuffix}`;
}

export function generateRandomEmail(prefix: string = "testuser"): string {
  const timestamp = Date.now().toString(); // Use timestamp for uniqueness
  const randomSuffix = Math.random().toString(36).substring(2, 7); // Random string
  return `${prefix}_${timestamp}_${randomSuffix}@example.com`;
}
