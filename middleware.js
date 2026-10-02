// Passwortschutz (HTTP Basic Auth) für alle Dateien der Seite.
// Benutzername ist egal, nur das Passwort zählt. Gespeichert ist nur der SHA-256-Hash.
export const config = { matcher: '/(.*)' };

const PASSWORD_SHA256 = 'bd104d1b98d032274986497eeb7997c44a1d674b29140e43cd525d33468ecb6e';

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default async function middleware(request) {
  const auth = request.headers.get('authorization') || '';
  if (auth.startsWith('Basic ')) {
    try {
      const decoded = atob(auth.slice(6));
      const password = decoded.slice(decoded.indexOf(':') + 1);
      if ((await sha256(password)) === PASSWORD_SHA256) return; // weiter zur Seite
    } catch (_) {
      // ungültiger Header -> unten 401
    }
  }
  return new Response('Passwort erforderlich.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Pixel Fighter", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
