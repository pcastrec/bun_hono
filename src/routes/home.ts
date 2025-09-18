import { Hono } from 'hono'
import { renderView } from '../edge'
import { AppContext } from '../types'

const home = new Hono<AppContext>()

home.get('/', async (c) => {
	const session = c.get('session')
	const html = await renderView('home', { session, message: `Welcome ${session.get('pseudo') || 'Stranger'} 🚀` })
	return c.html(html)
})

export default home