import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

import * as SMS from "expo-sms";

export default class ContactDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSMSAvailable: false,
    };
  }
  componentDidMount() {
    this.checkDeviceSMSAvailaibility();
  }
  checkDeviceSMSAvailaibility = async () => {
    const isSMSAvail = await SMS.isAvailableAsync();
    if (isSMSAvail) {
      this.setState({ isSMSAvailable: true });
    }
  };
  sendSMS = async (phone) => {
    try {
      const { result } =
        (await SMS) >
        SMS.sendSMSAsync([phone], "My first programmatically send message");
    } catch (err) {
      console.log(err);
    }

    //console.log(result);
  };

  dialCall = (phone) => {
    let phoneToCall = "";
    if (Platform.OS === "android") {
      phoneToCall = `tel:${phone}`;
    } else {
      phoneToCall = `telprompt:${phone}`;
    }
    Linking.openURL(phoneToCall);
  };
  render() {
    const { navigation, route } = this.props;
    const { contact } = route.params;

    navigation.setOptions({
      headerTitle: `${contact.name}`,
      // headerStyle: {
      //   textAlign: "center",
      // },
    });
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 50, textAlign: "center", color: "white" }}>
          {contact.name}
        </Text>
        <Text style={{ fontSize: 30, textAlign: "center", color: "white" }}>
          {contact.phone}
        </Text>
        <View
          style={{
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            marginTop: 15,
          }}
        >
          <Icon
            style={
              this.state.isSMSAvailable ? styles.iconBtn : { display: "none" }
            }
            onPress={() => this.sendSMS(contact.phone)}
          >
            <MaterialIcon
              name='message'
              title='SMS'
              size={40}
              style={(styles.iconBtn, { color: "blue" })}
            />
          </Icon>

          <Icon
            name='md-call'
            title='Call'
            size={40}
            onPress={() => this.dialCall(contact.phone)}
            style={(styles.iconBtn, { color: "green" })}
          />
        </View>
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
    color: "white",
    marginRight: 20,
  },
});
