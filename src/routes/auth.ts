import { Hono } from 'hono'
import { renderView } from '../edge'
import { AppContext } from '../types'
import { User } from '../entities/user'
import { AppDataSource } from '../database'

const auth = new Hono<AppContext>()

auth.get('/login', async (c) => {
    const html = await renderView('form', { action: "Login" })
    return c.html(html)
})

auth.post('/login', async (c) => {
    const form = await c.req.formData()
    const email = form.get('email').toString()
    const password = form.get('password').toString()

    const user = await AppDataSource.getRepository(User).findOneBy({ email })
    if(user && Bun.password.verify(password, user.password)) {
        const session = c.get('session')
        session.set('userId', user.id)
        session.set('pseudo', 'Peter')
        return c.redirect('/')
    }
    const html = await renderView('form', { action: "Login", errors: true })
    return c.html(html)
})

auth.get('/register', async (c) => {
    const html = await renderView('form', { action: "Register" })
    return c.html(html)
})

auth.post('/register', async (c) => {
    const form = await c.req.formData()
    const email = form.get('email').toString()
    const password = form.get('password').toString()

    const user = new User()
    user.email = email
    user.password = await Bun.password.hash(password)
    await AppDataSource.getRepository(User).save(user)

    return c.redirect('/login')
})

auth.get('/logout', async c => {
    c.get('session').deleteSession()
    return c.redirect('/')
})

export default auth