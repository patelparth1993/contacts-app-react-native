import React from "react";
import { Button, SectionList, StyleSheet, Text, View } from "react-native";
import ContactRow from "./ContactRow";

//SectionList renderItem documentation
const renderSectionHeader = (obj) => (
  <Text style={{ color: "gainsboro" }}>{obj.section.title}</Text>
);

export const ContactList = (props) => {
  // console.log("Çontact List: ");
  // console.log(props);
  const renderContact = (contact) => (
    <ContactRow
      contact={contact.item}
      toContactDetail={props.toContactDetail}
    />
  );

  const contactsByLetter = props.contacts.reduce((obj, contact) => {
    const firstLetter = contact.name[0].toUpperCase();
    return {
      ...obj,
      [firstLetter]: [...(obj[firstLetter] || []), contact],
    };
  }, {});

  const sections = Object.keys(contactsByLetter)
    .sort()
    .map((letter) => ({
      title: letter,
      data: contactsByLetter[letter],
    }));

  return (
    <SectionList
      sections={sections}
      renderItem={renderContact}
      renderSectionHeader={renderSectionHeader}
    ></SectionList>
  );
};
