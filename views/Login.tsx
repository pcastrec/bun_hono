import { FC } from "hono/jsx";
import { Layout } from "./components/Layout";

export const Login: FC = (props) => {
    return (
        <Layout session={props.session}>
            <form class="card" method="post" action="/login">
                <div class="card-header">
                    <div class="card-title h5">Connexion</div>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label class="form-label" for="email">Email</label>
                        <input class="form-input" type="text" id="email" name="email" placeholder="Email" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="password">Password</label>
                        <input class="form-input" type="password" id="password" name="password" placeholder="Password" />
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary">Sign-In</button>
                    <a class="btn btn-link" href="/register">Sign-Up</a>
                </div>
            </form>
        </Layout>
    )
}