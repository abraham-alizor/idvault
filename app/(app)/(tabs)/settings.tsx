import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { avatar, QR_bg, QR_icon, qrgreen } from "@/assets/images";
import BackButton from "@/components/BackButton";
import { useSession } from "@/context/ContextProvider";

const ProfileItem = ({
  icon,
  title,
  showArrow = true,
  isSwitch = false,
  onPress,
  IconComponent = Ionicons,
}: {
  icon: any;
  title: any;
  showArrow?: any;
  isSwitch?: any;
  onPress?: any;
  IconComponent?: any;
}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <View className="bg-[#EDEFEC] h-10 w-10 flex justify-center items-center rounded-full mr-4">
        <IconComponent name={icon} size={24} color="#666" />
      </View>
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
    {isSwitch ? (
      <Switch />
    ) : showArrow ? (
      <Ionicons name="chevron-forward" size={24} color="#666" />
    ) : null}
  </TouchableOpacity>
);

export default function Settings() {
  const { signOut } = useSession();
  return (
    <ParallaxScrollView
      childrenClassName="bg-white"
      headerBackgroundColor={{ light: "#FFF", dark: "#FFF" }}
      headerImage={
        <ThemedView className="mt-12 px-4 flex-row justify-between items-center ">
          <BackButton />
          <View className="">
            <FontAwesome6 name="bell" size={24} color="#000" />
          </View>
        </ThemedView>
      }
    >
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image source={avatar} style={styles.profileImage} />
          <Text style={styles.profileName}>Bisola Adegoke</Text>
          <Text style={styles.lastLogin}>Last login • 23 July, 2024</Text>

          <View>
            <Image
              source={QR_icon}
              className="rounded-xl h-12  w-12 object-contain mt-4 "
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal and compliance</Text>

          <ProfileItem
            IconComponent={MaterialIcons}
            icon="lock-outline"
            title="Privacy policy"
          />

          <ProfileItem
            IconComponent={MaterialCommunityIcons}
            icon="file-document-outline"
            title="Terms of service"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <ProfileItem
            IconComponent={Feather}
            icon="wifi-off"
            title="Offline data sharing"
          />
          <ProfileItem
            IconComponent={MaterialIcons}
            icon="lock-outline"
            title="Update PIN"
          />
          <ProfileItem icon="finger-print" title="Biometrics" isSwitch={true} />
          <ProfileItem
            IconComponent={Feather}
            icon="smartphone"
            title="Devices"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Others</Text>

          <ProfileItem
            IconComponent={FontAwesome6}
            icon="bell"
            title="Notifications"
          />
          <ProfileItem
            onPress={signOut}
            IconComponent={MaterialIcons}
            icon="logout"
            title="Sign out"
          />
        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  lastLogin: {
    color: "#666",
    marginTop: 5,
  },
  qrCode: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemTitle: {
    fontSize: 16,
  },
});
