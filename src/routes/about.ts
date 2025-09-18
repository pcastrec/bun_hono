// routes/about.ts
import { Hono } from 'hono';
import { renderView } from '../edge';
import { AppContext } from '../types';

const about = new Hono<AppContext>();

about.get('/about', async (c) => {
  const session = c.get('session')
  const html = await renderView('about', { session, year: new Date().getFullYear() });
  return c.html(html);
});

export default about;