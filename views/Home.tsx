import { FC } from "hono/jsx";
import { Layout } from "./components/Layout";

export const Home: FC = ({ session }) => {

    const user = JSON.parse(session?.get('user'))

    return (
        <Layout session={session}>
            <h1>{`Welcome ${user?.pseudo || 'Stranger'} 🚀`}</h1>
            <p>Ceci n'est pas la page d'accueil.</p>
        </Layout>
    )
}