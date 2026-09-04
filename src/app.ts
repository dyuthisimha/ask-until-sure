import { Hono } from 'hono';
import type { RuntimeConfig } from './config.js';
import { createDemoResearchHandler } from './routes/demo.js';
import {
  createRegulatoryHandler,
  createCaseLawHandler,
  createSpecialistHandler,
} from './routes/research.js';
import { ResearchService } from './services/research.js';
import { APP_SCRIPT } from './web/app-script.js';
import { renderPage } from './web/page.js';
import { STYLES } from './web/styles.js';
import { createX402Middleware } from './x402/config.js';

export interface AppOptions {
  fetchImpl?: typeof fetch;
}

export function createApp(config: RuntimeConfig, options: AppOptions = {}) {
  const app = new Hono();
  const research = new ResearchService();

  app.get('/', c => c.html(renderPage(config)));
  app.get('/assets/styles.css', c =>
    c.body(STYLES, 200, { 'Content-Type': 'text/css; charset=utf-8' }),
  );
  app.get('/assets/app.js', c =>
    c.body(APP_SCRIPT, 200, { 'Content-Type': 'text/javascript; charset=utf-8' }),
  );
  app.get('/health', c => c.json({ status: 'ok', service: 'ask-until-sure' }));
  app.post('/demo/research', createDemoResearchHandler(config));

  // Reject malformed input before x402 so callers are never charged for an invalid request.
  app.use('/api/research/*', async (c, next) => {
    const q = c.req.query('q');
    if (!q || q.trim() === '') {
      return c.json(
        {
          error: 'invalid_query',
          message: 'A valid question (q) is required (max 500 chars).',
        },
        400,
      );
    }
    await next();
  });

  app.use(createX402Middleware(config));
  app.get('/api/research/regulatory', createRegulatoryHandler(research));
  app.get('/api/research/caselaw', createCaseLawHandler(research));
  app.get('/api/research/specialist', createSpecialistHandler(research));

  app.notFound(c => c.json({ error: 'not_found', message: 'Route not found.' }, 404));
  app.onError((error, c) => {
    console.error(error);
    const message = error.message.toLowerCase();
    if (
      message.includes('facilitator') ||
      message.includes('payment') ||
      message.includes('settle') ||
      message.includes('verify') ||
      message.includes('fetch')
    ) {
      return c.json(
        {
          error: 'payment_service_unavailable',
          message:
            'x402 payment processing is unavailable. Check FACILITATOR_URL, network compatibility, and facilitator status.',
        },
        503,
      );
    }
    return c.json({ error: 'internal_error', message: 'The paid resource could not complete the request.' }, 500);
  });
  return app;
}
