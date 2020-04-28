import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import { ContactList } from "../ContactList";

export default class ContactSearchScreen extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props);
    this.state = {
      query: "",
      contacts: [],
    };
  }

  handleInputChange = (query) => {
    // console.log("for :" + query);
    this.setState({ query }, () => {
      const filteredContacts = this.props.route.params.contacts.filter(
        (contact) => {
          if (contact.name.toLowerCase().includes(query.toLowerCase())) {
            return contact;
          }
        }
      );
      // console.log(filteredContacts);
      this.setState({ contacts: filteredContacts });
    });
  };

  render() {
    const { route, navigation } = this.props;
    navigation.setOptions({
      headerTitle: "Search",
      // headerStyle: {
      //   textAlign: "center",
      // },
    });
    //console.log(this.state.contacts);
    return (
      <View>
        <TextInput
          style={styles.textInput}
          placeholder='Search Contact'
          onChangeText={this.handleInputChange}
          value={this.state.query}
        />
        <View>
          <ContactList
            contacts={this.state.contacts}
            toContactDetail={(contact) =>
              navigation.navigate("ContactDetail", { contact })
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    padding: 20,
    borderRadius: 50,
    borderBottomWidth: 1,
    borderWidth: 0,
  },
});
