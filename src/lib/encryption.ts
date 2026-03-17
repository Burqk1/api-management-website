/**
 * Same encryption as mobile app — must match exactly for cross-device sync.
 */

function deriveKey(userId: string): number {
  let hash = 0;
  const seed = `fetchlab_sync_${userId}`;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash) % 256;
}

export function encryptSync(data: string, userId: string): string {
  const key = deriveKey(userId);
  const bytes = Array.from(data).map((ch, i) =>
    String.fromCharCode(ch.charCodeAt(0) ^ ((key + i) % 256))
  );
  try {
    return btoa(bytes.join(''));
  } catch {
    return btoa(encodeURIComponent(bytes.join('')));
  }
}

export function decryptSync(encrypted: string, userId: string): string {
  const key = deriveKey(userId);
  let decoded: string;
  try {
    decoded = atob(encrypted);
  } catch {
    try {
      decoded = decodeURIComponent(atob(encrypted));
    } catch {
      return encrypted;
    }
  }
  return Array.from(decoded).map((ch, i) =>
    String.fromCharCode(ch.charCodeAt(0) ^ ((key + i) % 256))
  ).join('');
}
