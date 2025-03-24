import { defineStackbitConfig } from '@stackbit/types';

export default defineStackbitConfig({
    stackbitVersion: '~0.6.0',
    nodeVersion: '18',
    ssgName: 'nextjs',  // Change this based on your framework
    devCommand: 'npm run dev', // Change this based on your framework
});
