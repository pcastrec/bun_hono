import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { sessionMiddleware, CookieStore } from 'hono-sessions'

// Import de tes routes
import home from './routes/home'
import about from './routes/about'
import auth from './routes/auth'

import 'reflect-metadata'
import { AppDataSource } from './database'
import { AppContext } from './types'
import { Trail } from './entities/trail'
import { trail } from './routes/trail'
import { guard } from './middlewares/guard'


// Set up your Hono instance, using your types
const app = new Hono<AppContext>()

const store = new CookieStore()

app.use('*', sessionMiddleware({
	store,
	// Required for CookieStore, recommended for others.
	encryptionKey: 'password_at_least_32_characters_long',
	// You can also supply a function instead of a plain string
	// encryptionKey: () => 'function_that_returns_a_long_string'
	expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
	cookieOptions: {
		// sameSite: 'Lax', // Recommended for basic CSRF protection in modern browsers
		path: '/', // Required for this library to work properly
		httpOnly: true, // Recommended to avoid XSS attacks
	},
}))

app.get('*', serveStatic({ root: './public' }))

// Monte tes groupes de routes
app.route('/', auth)
app.route('/', home)
app.route('/', about)

app.use('/trails', guard)
app.route('/trails', trail)

app.notFound((c) => {
	return c.text('Custom 404 Message', 404)
})

// Initialisation DB avant d’exporter
await AppDataSource.initialize()

export default {
	port: 8080,
	fetch: app.fetch,
}