import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      return "red";
    case "Medium":
      return "orange";
    case "Low":
      return "green";
    default:
      return "gray";
  }
};
export default function Tasks({ taskId, text, time, priority, status }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        router.push({ pathname: "/(tabs)/editTask", params: { taskId: taskId } });
      }}
    >
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.circular}></View>
          <View>
            {text.length > 25 ? (
              <Text style={styles.itemText}>{text.substring(0, 24)}...</Text>
            ) : (
              <Text style={styles.itemText}>{text}</Text>
            )}
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.itemTime}>{time}</Text>
              <Text
                style={[
                  styles.itemTime,
                  { color: status === "incomplete" ? "red" : "green" },
                ]}
              >
                ({status})
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[styles.tag, { backgroundColor: getPriorityColor(priority) }]}
        >
          <Text style={{ color: "white" }}>{priority}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f2f1f1ff",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tags: {
    marginHorizontal: 2,
    flexDirection: "row",
  },
  tag: {
    //backgroundColor: '#55BCF6',
    //opacity: 0.4,
    borderRadius: 50,
    marginRight: 15,
    padding: 5,
    paddingHorizontal: 10,
  },
  itemText: {
    maxWidth: "100%",
    color: "#5e5e5eff",
    fontWeight: "600",
  },
  itemTime: {
    maxWidth: "100%",
    color: "#616161ff",
    margin: 1,
  },
  circular: {
    width: 20,
    height: 20,
    borderWidth: 3,
    borderRadius: 50,
    marginRight: 15,
    borderColor: "#55BCF6",
  },
});
