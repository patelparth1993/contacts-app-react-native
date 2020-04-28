import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const ContactRow = (props) => {
  const { contact } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        props.toContactDetail(contact);
      }}
      style={styles.row}
    >
      <Text style={{ fontSize: 19, color: "white" }}>{contact.name}</Text>
      <Text style={styles.contactText}>{contact.phone}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  row: {
    padding: 20,
    backgroundColor: "#3f3f3f",
    borderRadius: 50,
    borderBottomWidth: 1,
    borderColor: "#fff",
  },
  contactText: {
    color: "white",
  },
};

export default ContactRow;
