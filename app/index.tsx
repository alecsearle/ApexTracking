import { View } from "react-native";
import AllToolsWidget from "../components/AllToolsWidget";
import Header from "../components/Header";
import StatsSection from "../components/StatsSection";

export default function Index() {
  return (
    <View>
      <Header />
      <StatsSection />
      <AllToolsWidget />
      {/* <FloatingButton /> */}
    </View>
  );
}
