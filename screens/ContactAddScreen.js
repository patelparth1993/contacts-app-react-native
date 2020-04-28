import React from "react";
import ContactAddForm from "../ContactAddForm";

function ContactAddScreen({ route, navigation }) {
  const addContact = route.params.addContact;
  //console.log(addContact);
  return <ContactAddForm addContact={addContact} nav={navigation} />;
}

export default ContactAddScreen;
