import { Switch, Route } from "react-router-dom";
import values from "./headerValues";

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Products() {
  return (
    <div>
      <h2>Products</h2>
    </div>
  );
}
function SignIn() {
  return (
    <div>
      <h2>SignIn</h2>
    </div>
  );
}
function SignUp() {
  return (
    <div>
      <h2>SignUp</h2>
    </div>
  );
}

export default function body(): JSX.Element {
  return (
    <main>
      <Switch>
        <Route exact path={values.home}>
          <Home />
        </Route>
        <Route path={values.products}>
          <Products />
        </Route>
        <Route path={values.about}>
          <About />
        </Route>
        <Route path={values.signIn}>
          <SignIn />
        </Route>
        <Route path={values.signUp}>
          <SignUp />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </main>
  );
}
