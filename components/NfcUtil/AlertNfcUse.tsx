import { Alert } from "react-native";

const showNfcAlert = (userRole: "admin" | "employee" = "admin") => {
  if (userRole === "admin") {
    // Admin can write to tags
    Alert.alert(
      "NFC Tag Options",
      "What would you like to do?",
      [
        {
          text: "Read Tag",
          onPress: () => console.log("Reading tag..."),
          style: "default",
        },
        {
          text: "Write to Tag",
          onPress: () => console.log("Writing to tag..."),
          style: "destructive",
        },

        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  } else {
    // Employee doesn't have permission
    Alert.alert(
      "NFC Tag Options",
      "Please contact an administrator to write to tags.",
      [
        {
          text: "Read Tag",
          onPress: () => console.log("Reading tag..."),
          style: "default",
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  }
};

export default showNfcAlert;
