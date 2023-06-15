import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import Home from "../app/Home";
import SignUp from "../app/SignUp";
import Lists from "../app/Lists";
import ViewCollection from "../app/ViewCollection";

const screens = {
     homeScreen: {
          screen: Home,
     },
     signupScreen: {
          screen: SignUp,
     },
     lists: {
          screen: Lists,
     },
     ViewCollection: {
          screen: ViewCollection,
     },
};

const HomeStack = createStackNavigator(screens);

const appContainer = createAppContainer(HomeStack);

export default appContainer;
