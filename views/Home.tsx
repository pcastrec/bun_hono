import { FC } from "hono/jsx";
import { Layout } from "./components/Layout";

export const Home: FC = ({ session }) => {

    const user = JSON.parse(session?.get('user'))

    return (
        <Layout session={session}>
            <h1>{`Welcome ${user?.pseudo || 'Stranger'} 🚀`}</h1>
            <p>Ceci est la page d'accueil de Pierre.</p>
        </Layout>
    )
}