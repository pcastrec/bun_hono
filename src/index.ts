import 'reflect-metadata'
import { Hono } from 'hono'
import { AppContext } from './types'
import { serveStatic } from 'hono/bun'
import { AppDataSource } from './database'
import { sessionMiddleware, CookieStore } from 'hono-sessions'

// Import de tes routes
import routerAuthentication from './routes/authentication'
import { Home } from '../views/Home'
import { About } from '../views/About'
import { User } from './entities/user'


// Set up your Hono instance, using your types
const app = new Hono<AppContext>()


app.use('*', sessionMiddleware({
	store: new CookieStore(),
	// Required for CookieStore, recommended for others.
	encryptionKey: 'password_at_least_32_characters_long',
	// You can also supply a function instead of a plain string
	// encryptionKey: () => 'function_that_returns_a_long_string'
	expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
	cookieOptions: {
		httpOnly: true, // Recommended to avoid XSS attacks
		sameSite: 'Lax', // Recommended for basic CSRF protection in modern browsers
		path: '/', // Required for this library to work properly
	},
}))

app.get('*', serveStatic({ root: './public' }))

// Monte tes groupes de routes
app.route('/', routerAuthentication)

app.get('/', async (c) => {
	const session = c.get('session')
	const user = session.get('user')
	return c.html(Home({ session }))
})

app.get('/about', async (c) => {
	const session = c.get('session')
	return c.html(About({ session, year: new Date().getFullYear() }));
});

app.get('/users', async c => {
	const users = await AppDataSource.getRepository(User).find();
	return c.json(users);
})

app.notFound((c) => {
	return c.text('Custom 404 Message', 404)
})

// Initialisation DB avant d’exporter
await AppDataSource.initialize()

export default {
	port: 8080,
	fetch: app.fetch,
}