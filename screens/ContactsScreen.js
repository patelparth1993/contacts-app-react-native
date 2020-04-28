import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";

import { ContactList } from "../ContactList";
import { fetchUser } from "../api/Contact";

export default class ContactsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      searchQuery: "",
    };
  }
  componentDidMount() {
    fetchUser().then((contacts) => this.setState({ contacts }));
  }

  // componentDidUpdate() {
  //   console.log("Contact Screen Update");
  //   console.log(this.props);
  // }

  addContact = (newContact) => {
    this.setState(
      (prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }),
      () => {
        this.props.navigation.navigate("Contacts");
      }
    );
  };

  render() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <Icon
            name='md-add'
            title='Add'
            size={30}
            style={styles.iconBtn}
            onPress={() =>
              navigation.navigate("AddContact", { addContact: this.addContact })
            }
          />
          <Icon
            name='md-search'
            title='Search'
            size={30}
            style={styles.iconBtn}
            onPress={() =>
              navigation.navigate("ContactSearch", {
                contacts: this.state.contacts,
              })
            }
          />
          <Icon
            name='md-options'
            title='Options'
            size={28}
            style={styles.iconBtn}
            onPress={() => {
              return (
                <View>
                  <Text>Options</Text>
                </View>
              );
            }}
          />
        </View>
      ),
    });
    return (
      <View style={styles.container}>
        <ContactList
          contacts={this.state.contacts}
          toContactDetail={(contact) =>
            navigation.navigate("ContactDetail", { contact })
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    //paddingTop: Constants.statusBarHeight,
  },
  iconBtn: {
    color: "black",
    marginRight: 20,
  },
});
