import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import replace from '@rollup/plugin-replace';
import dotenv from 'dotenv';

const env = dotenv.config({ path: '.env.default' }).parsed ?? {};

const replaceEnvPlugin = replace({
    preventAssignment: true,
    values: {
        'process.env.VITE_APP_API_KEY': JSON.stringify(env.VITE_APP_API_KEY),  
    },
});


export default defineConfig({
    plugins: [
        reactRefresh(),
        replaceEnvPlugin,
    ],
});
