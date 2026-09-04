import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("Minh Anh");
  const [phone, setPhone] = useState("0901 234 567");
  const [address, setAddress] = useState("125 Nguyễn Trãi, Thanh Xuân, Hà Nội");
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#2d1d1c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hồ sơ cá nhân</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
          <TouchableOpacity
            style={styles.camera}
            accessibilityLabel="Đổi ảnh đại diện"
          >
            <Ionicons name="camera" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.helper}>
          Cập nhật thông tin để nhận hàng nhanh hơn
        </Text>
        <Field
          label="Họ và tên"
          value={name}
          onChangeText={setName}
          icon="person-outline"
        />
        <Field
          label="Email"
          value="minhanh@example.com"
          onChangeText={() => undefined}
          icon="mail-outline"
          disabled
        />
        <Field
          label="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          icon="call-outline"
          keyboardType="phone-pad"
        />
        <Field
          label="Địa chỉ nhận hàng"
          value={address}
          onChangeText={setAddress}
          icon="location-outline"
          multiline
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() =>
            Alert.alert(
              "Đã lưu thay đổi",
              "Thông tin hồ sơ của bạn đã được cập nhật.",
            )
          }
          activeOpacity={0.85}
        >
          <Text style={styles.saveText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  label,
  value,
  onChangeText,
  icon,
  disabled,
  multiline,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  multiline?: boolean;
  keyboardType?: "phone-pad";
}) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrap,
          disabled && styles.disabledInput,
          multiline && styles.multilineInput,
        ]}
      >
        <Ionicons
          name={icon}
          size={18}
          color={disabled ? "#b9aaa6" : "#d97777"}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          keyboardType={keyboardType}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fffaf8" },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#f7eae8",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: "#2d1d1c", fontSize: 21, fontWeight: "800" },
  placeholder: { width: 42 },
  content: { padding: 20, paddingBottom: 40 },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "#f2b6aa",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 8,
  },
  avatarText: { color: "#fff", fontSize: 34, fontWeight: "800" },
  camera: {
    position: "absolute",
    right: -2,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#d97777",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fffaf8",
  },
  helper: {
    textAlign: "center",
    color: "#98827d",
    fontSize: 13,
    marginTop: 12,
    marginBottom: 28,
  },
  fieldWrap: { marginBottom: 17 },
  label: { color: "#5b4945", fontSize: 13, fontWeight: "700", marginBottom: 7 },
  inputWrap: {
    minHeight: 51,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#f0dcd7",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  disabledInput: { backgroundColor: "#f8f1ef" },
  multilineInput: { alignItems: "flex-start", paddingTop: 15, minHeight: 84 },
  input: {
    flex: 1,
    color: "#3b2f2f",
    fontSize: 15,
    marginLeft: 10,
    paddingVertical: 0,
  },
  saveButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#d97777",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  saveText: { color: "#fff", fontSize: 15, fontWeight: "800" },
});
