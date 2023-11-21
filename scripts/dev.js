import pmex from 'pmex';
import * as dotenv from 'dotenv';

dotenv.config(); // Load the environment variables
pmex({
  npm: `install && npm prune`,
  pnpm: `install --fix-lockfile`,
  yarn: `install `,
});

// pmex(`npx prisma migrate reset --force`);

pmex(`npx prisma generate`);

// pmex(`tsx prisma/seed.dev.ts`);

pmex(`nest start --watch`);
