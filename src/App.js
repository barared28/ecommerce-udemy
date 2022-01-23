import {Redirect, Route, Switch} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import './App.css';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./component/header/header.componet";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import {Component} from "react";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkout/checkout.component";

const HatsPage = () => (
    <div>
        <h1>HATS PAGE</h1>
    </div>
);

class App extends Component {

    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;
        this.unsubscribeFromAuth = auth.onAuthStateChanged( async user => {
            if (user) {
                const userRef = await createUserProfileDocument(user);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data(),
                    })
                });
            }
            setCurrentUser(user);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
          <div>
              <Header />
              <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/shop' component={ShopPage} />
                  <Route path='/hats' component={HatsPage} />
                  <Route exact path='/checkout' component={CheckoutPage} />
                  <Route
                      exact
                      path='/signin'
                      render={() =>
                          this.props.currentUser ? (
                              <Redirect to='/' />
                          ) : (
                              <SignInAndSignUpPage />
                          )
                      }
                  />
              </Switch>
          </div>
      );
  }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
