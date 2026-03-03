import { FC } from "hono/jsx";
import { Layout } from "./components/Layout";

export const Register: FC = (props) => {
    return (
        <Layout user={props.user}>
            <form class="card" method="post" action="/register">
                <div class="card-header">
                    <div class="card-title h5">Register</div>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label class="form-label" for="email">Email</label>
                        <input class="form-input" type="text" id="email" name="email" placeholder="Email" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="pseudo">Pseudo</label>
                        <input class="form-input" type="text" id="pseudo" name="pseudo" placeholder="Pseudo" />
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="password">Password</label>
                        <input class="form-input" type="password" id="password" name="password" placeholder="Password" />
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary">Sign-Up</button>
                    <a class="btn btn-link" href="/login">Sign-In</a>
                </div>
            </form>
        </Layout>
    )
}