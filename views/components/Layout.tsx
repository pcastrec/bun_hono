import type { FC } from "hono/jsx"

export const Layout: FC = ({ session, children }) => {
    return (
        <html>
            <head>
                <title>Mon App Hono</title>
                <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-exp.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre-icons.min.css" />
                <link rel="stylesheet" href="/style.css" />
            </head>
            <body>
                <header class="navbar">
                    <section class="navbar-section">
                        <a href="/" class="">Accueil</a>
                        <a href="/about" class="">À propos</a>
                        {session?.get('user') && <a href="/trails" class="">Parcours</a>}
                    </section>
                    <section class="navbar-center">
                        centered logo or brand
                    </section>
                    <section class="navbar-section">
                        {session?.get('user') ?
                            <a href="/logout" class="">Sign-Out</a>
                            :
                            <>
                                <a href="/login" class="">Sign-In</a>
                                <a href="/register" class="">Sign-Up</a>
                            </>
                        }
                    </section>
                </header>
                <div class="divider"></div>
                <section class="hero-sm px-2">
                    {children}
                </section>
            </body>
        </html>
    )
}