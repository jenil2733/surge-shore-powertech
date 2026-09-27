import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'custom-api-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.toLowerCase().includes('.pdf')) {
              const filename = path.basename(req.url.split('?')[0]) || 'Surge-Shore-Product-Catalog.pdf';
              res.setHeader('Content-Type', 'application/pdf');
              res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            }
            if (req.url === '/api/upload-photo' && req.method === 'POST') {
              const chunks: Buffer[] = [];
              req.on('data', chunk => chunks.push(chunk));
              req.on('end', () => {
                try {
                  const body = Buffer.concat(chunks).toString('utf-8');
                  const { filename, base64 } = JSON.parse(body);
                  if (filename && base64) {
                    const cleanName = path.basename(filename);
                    const fileData = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                    const publicPath = path.resolve(__dirname, 'public', cleanName);
                    fs.writeFileSync(publicPath, fileData);
                    const srcImgPath = path.resolve(__dirname, 'src', 'assets', 'images', cleanName);
                    fs.writeFileSync(srcImgPath, fileData);
                    const distDir = path.resolve(__dirname, 'dist');
                    if (fs.existsSync(distDir)) {
                      fs.writeFileSync(path.resolve(distDir, cleanName), fileData);
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, url: `/${cleanName}` }));
                    return;
                  }
                } catch (e) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: String(e) }));
                  return;
                }
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Missing filename or base64' }));
              });
              return;
            }
            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
