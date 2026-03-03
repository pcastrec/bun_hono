import { Hono } from 'hono'
import { AppContext } from '../types'
import { User } from '../entities/user'
import { Login } from '../../views/Login'
import { AppDataSource } from '../database'
import { Register } from '../../views/Register'

const routerAuthentication = new Hono<AppContext>()

routerAuthentication

    .get('/login', async (c) => {
        return c.html(Login({}))
    })

    .post('/login', async (c) => {
        const { email, password } = await c.req.parseBody<{ email: string, password: string }>()

        const user = await AppDataSource.getRepository(User).findOneBy({ email: email })
        if (user && Bun.password.verify(password, user.password)) {
            const session = c.get('session')
            session.set('user', JSON.stringify(user))
            return c.redirect('/')
        }
        return c.redirect('/login')
    })

    .get('/register', async (c) => {
        return c.html(Register({}))
    })

    .post('/register', async (c) => {
        const { email, pseudo, password } = await c.req.parseBody<{
            email: string,
            pseudo: string,
            password: string
        }>()

        const user = new User()
        user.email = email
        user.pseudo = pseudo
        user.password = await Bun.password.hash(password)
        await AppDataSource.getRepository(User).save(user)

        return c.redirect('/login')
    })

    .get('/logout', async c => {
        c.get('session').deleteSession()
        console.log(c.get('session'))
        return c.redirect('/')
    })

export default routerAuthentication