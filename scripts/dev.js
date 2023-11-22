import pmex from 'pmex';
import * as dotenv from 'dotenv';
pmex(`yarn install `);

dotenv.config(); // Load the environment variables

// pmex(`npx prisma migrate reset --force`);

pmex(`npx prisma generate`);

// pmex(`tsx prisma/seed.dev.ts`);

pmex(`nest start --watch`);
