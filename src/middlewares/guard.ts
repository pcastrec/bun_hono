import { Context, Next } from "hono";

export const guard = async (c: Context, next: Next) => {
    const session = c.get('session')
    const user = await session.get('userId');
    if (!user) {
        // redirection vers la page de login
        return c.redirect('/login');
    }
    return next();
};