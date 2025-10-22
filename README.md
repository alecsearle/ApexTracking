# ApexTracking

A React Native application that tracks the location history, usage, and maintenance of equipment.

At the the completion of Project 2, the user will be able to add new tools to their toolbox for tracking. Once added, each tool can be assigned to an NFC tag that will deeplink to the tools ID for easy lookup when scanned. Admin and employee permissions will be integrated, limiting employees to adding and reading tags, while admins can also write over, edit and delete tags.

# Screenshots

![Tool Tracking Screenshot](./assets/project2_wireframe.png)

# HIG Implementation

- NFC 'hover'
- Native icons
- Dark mode / light mode
- Navigation (https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- Icons (https://developer.apple.com/design/human-interface-guidelines/icons)

# How to Run

The usage of the NFC reader in the phone means this app needs to be run on a <strong>development build</strong>

# Packages Used

- @react-native-community/datetimepicker
- import { Tabs } from "expo-router";
- react-native-nfc-manager

## (Potential Future Packages)

- expo-document-picker
- Stopwatch Timer (https://github.com/rgommezz/react-native-animated-stopwatch-timer)
- React Native Paper
- react-reanimated
- expo-blur

# Necessary Components

- Title component
- Stats component
- List of All Tools (each tool in list is pressable)
- Individual Tool component
  - Image
  - Tool info
    - Purchased date
    - New / Used (if used ask total hours of usage)
    - Upload maintenance manual
  - Stop Watch component (saves to recent times when stopped)
