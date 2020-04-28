import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ContactsScreen from "./screens/ContactsScreen";
import ContactAddScreen from "./screens/ContactAddScreen";
import ContactDetailScreen from "./screens/ContactDetailScreen";
import ContactSearchScreen from "./screens/ContactSearchScreen";

const NavStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <NavStack.Navigator
        initialRouteName='Contacts'
        //screenOptions={{ contacts: this.state.contacts }}
      >
        <NavStack.Screen
          name='Contacts'
          component={ContactsScreen}
          // options={({ route }) => {
          //   route.params = {
          //     contacts: this.state.contacts,
          //   };
          // }}
        />
        <NavStack.Screen
          name='AddContact'
          component={ContactAddScreen}
          // initialParams={{ }}
          // options={({ route }) => {
          //   route.params = {
          //     addContact: this.addContact,
          //   };
          // }}
        />
        <NavStack.Screen name='ContactDetail' component={ContactDetailScreen} />
        <NavStack.Screen name='ContactSearch' component={ContactSearchScreen} />
      </NavStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
