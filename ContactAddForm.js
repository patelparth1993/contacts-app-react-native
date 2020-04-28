import React, { Component } from "react";
import {
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import Constants from "expo-constants";
import PropTypes from "prop-types";
export default class ContactAddForm extends Component {
  static propTypes = {
    addContact: PropTypes.func,
    nav: PropTypes.object,
  };
  state = {
    name: "",
    phone: "",
    isFormValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.name !== this.state.name ||
      prevState.phone !== this.state.phone
    ) {
      this.validateForm();
    }
  }
  handleNameChange = (name) => {
    this.setState({ name });
  };
  handlePhoneChange = (phone) => {
    if (+phone >= 0 && phone.length <= 10) {
      this.setState({ phone });
    }
  };

  validateForm = () => {
    if (
      +this.state.phone >= 0 &&
      this.state.phone.length === 10 &&
      this.state.name.length >= 3
    )
      this.setState({ isFormValid: true });
    else {
      this.setState({ isFormValid: false });
    }
  };
  onSubmit = () => {
    console.log(this.props);
    if (
      +this.state.phone >= 0 &&
      this.state.phone.length === 10 &&
      this.state.name.length >= 3
    ) {
      this.props.addContact(this.state);
    }
  };
  render() {
    return (
      <View
        // behavior='padding'
        style={{
          marginTop: Constants.statusBarHeight,
          backgroundColor: "#111",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TextInput
          style={styles.textInput}
          value={this.state.name}
          onChangeText={this.handleNameChange}
          placeholder='Name'
        />
        <TextInput
          style={styles.textInput}
          value={this.state.phone}
          onChangeText={this.handlePhoneChange}
          keyboardType='numeric'
          placeholder='Phone number'
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => this.props.nav.navigate("Contacts")}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              !this.state.isFormValid
                ? [styles.button, styles.btnDisabled]
                : styles.button
            }
            onPress={this.onSubmit}
            disabled={!this.state.isFormValid}
          >
            <Text style={styles.btnText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textInput: {
    padding: 20,
    backgroundColor: "#3f3f3f",
    borderRadius: 50,
    borderBottomWidth: 1,
    borderColor: "#fff",
    color: "white",
  },
  button: {
    width: 200,
    marginTop: 20,
    marginLeft: 5,
    backgroundColor: "green",
    padding: 15,
    borderRadius: 50,
  },
  btnDisabled: {
    backgroundColor: "grey",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
  },
});
