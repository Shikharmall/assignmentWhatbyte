import React, { useCallback, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { IconSymbol } from "./ui/IconSymbol";
import Tasks from "./Tasks";

const ListItem = memo(({ item, onDelete }) => {
  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity
        //onPress={() => onDelete(item.id)}

        style={[styles.button, styles.delete]}
      >
        <IconSymbol size={25} name="delete.left.fill" color={`#fff`} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      activeOffsetX={[-30, 30]}
      failOffsetY={[-30, 30]}
    >
      <Tasks text={item.text} time={item.time} priority={item.priority} />
    </Swipeable>
  );
});

const ITEM_HEIGHT = 60;

const SwipeableList = ({data}) => {
  const handleDelete = useCallback((id) => {
    console.log("Delete:", id);
  }, []);

  const renderItem = useCallback(
    ({ item }) => <ListItem item={item} onDelete={handleDelete} />,
    [handleDelete]
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SectionList
        sections={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.head}>{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  head: {
    fontSize: 18,
    color: "#3b7587ff",
    fontWeight: "500",
    marginVertical: 20,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F1F1F1",
    marginBottom: 2,
  },
  itemText: {
    fontSize: 15,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  edit: { backgroundColor: "#ffab00" },
  delete: { backgroundColor: "red", margin: 5, borderRadius: 50, padding: 15 },
  actionText: { color: "#fff", fontWeight: "bold" },
});

export default SwipeableList;
