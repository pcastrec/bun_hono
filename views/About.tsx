import { FC } from "hono/jsx";
import { Layout } from "./components/Layout";

export const About: FC = ({ session, year }) => {
    return (
        <Layout session={session}>
            <h1>À propos</h1>
            <p>Nous sommes en {year}</p>
        </Layout>
    )
}