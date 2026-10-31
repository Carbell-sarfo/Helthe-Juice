// scripts/make-admin.mjs
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { readFileSync } from 'node:fs';

const [, , keyPath, email] = process.argv;

if (!keyPath || !email) {
  console.error('Usage: node scripts/make-admin.mjs <path-to-service-account-json> <your-email@domain.com>');
  process.exit(1);
}

try {
  initializeApp({ credential: cert(JSON.parse(readFileSync(keyPath, 'utf8'))) });
  const user = await getAuth().getUserByEmail(email);
  await getAuth().setCustomUserClaims(user.uid, { admin: true });
  console.log(`Success! ${email} is now an admin.`);
} catch (error) {
  console.error('Error setting admin claim:', error.message);
  process.exit(1);
}