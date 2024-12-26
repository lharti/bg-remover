import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ReactCompilerConfig = {
    target: '19',
}

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
            },
        }),
    ],

    resolve: {
        alias: {
            '@': '/src',
        },
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    transformers: ['@huggingface/transformers'],
                },
            },
        },

        chunkSizeWarningLimit: 1500,
    },

    optimizeDeps: {
        exclude: ['@huggingface/transformers'],
    },

    server: {
        watch: {
            ignored: ['**/*.{spec,test}.ts(x)?', 'coverage'],
        },
    },
})
