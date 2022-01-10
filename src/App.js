import {Route, Switch} from "react-router-dom";
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./component/header/header.componet";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {Component} from "react";

const HatsPage = () => (
    <div>
        <h1>HATS PAGE</h1>
    </div>
);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged( async user => {
            if (user) {
                const userRef = await createUserProfileDocument(user);
                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data(),
                        }
                    })
                });
            }
            this.setState({ currentUser: user });
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        const { currentUser } = this.state;
        return (
          <div>
              <Header currentUser={currentUser} />
              <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/shop' component={ShopPage} />
                  <Route path='/hats' component={HatsPage} />
                  <Route path='/signin' component={SignInAndSignUpPage} />
              </Switch>
          </div>
      );
  }
}

export default App;
