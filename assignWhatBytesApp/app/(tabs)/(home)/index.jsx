import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../../constants/Theme";
import SwipeableList from "@/components/SlideableList";
import { getUserTasksAPI, deleteTaskAPI } from "../../../api/TaskAPI/TaskAPI";
import { deleteAsyncData } from "../../../utils/asyncDataOperation";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default function Task() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [userTaskData, setUserTasksData] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const getUserTasksFunc = (priority = "all", status = "all") => {
    getUserTasksAPI({ priority, status })
      .then((res) => {
        if (res.status === 200) {
          setUserTasksData(res?.data?.data || []);
        } else {
          console.log("Data Fetching Failed!");
        }
      })
      .catch(console.error);
  };

  const handleDelete = (taskId) => {
    deleteTaskAPI(taskId).then((res) => {
      if (res.status === 201) {
        getUserTasksFunc(priorityFilter, statusFilter);
      }
    });
  };

  useEffect(() => {
    if (isFocused) {
      getUserTasksFunc(priorityFilter, statusFilter);
    }
  }, [priorityFilter, statusFilter, isFocused]);

  const onSelectPriority = (value) => {
    setPriorityFilter(value);
  };

  const onSelectStatus = (value) => {
    setStatusFilter(value);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.taskView}>
        <View style={styles.profileView}>
          <TouchableOpacity
            onPress={async () => {
              await deleteAsyncData("userId");
              await deleteAsyncData("accessToken");
              await deleteAsyncData("isLogin");
              navigation.navigate("signin");
            }}
          >
            <Image
              source={require("../../../assets/images/userProfile.jpg")}
              style={styles.userProfile}
            />
          </TouchableOpacity>
          <View style={styles.details}>
            <Text style={styles.mesText}>Task List</Text>
            <Text style={styles.taskText}>Upcoming Task</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/images/notification.png")}
            style={styles.notiImg}
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filterRow}>
        {/* Priority filter */}
        <Menu onSelect={onSelectPriority}>
          <MenuTrigger>
            <View style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>
                Priority: {priorityFilter.toUpperCase()}
              </Text>
            </View>
          </MenuTrigger>
          <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
            <MenuOption value="all" text="All" />
            <MenuOption value="low" text="Low" />
            <MenuOption value="medium" text="Medium" />
            <MenuOption value="high" text="High" />
          </MenuOptions>
        </Menu>

        {/* Status filter */}
        <Menu onSelect={onSelectStatus}>
          <MenuTrigger>
            <View style={styles.menuTrigger}>
              <Text style={styles.menuTriggerText}>
                Status: {statusFilter.toUpperCase()}
              </Text>
            </View>
          </MenuTrigger>
          <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
            <MenuOption value="all" text="All" />
            <MenuOption value="completed" text="Completed" />
            <MenuOption value="incomplete" text="Incomplete" />
          </MenuOptions>
        </Menu>
      </View>

      {/* Task List */}
      <View style={styles.calenderView}>
        <View style={styles.mainCalenderView}>
          <SwipeableList data={userTaskData} handleDelete={handleDelete} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskView: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  profileView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  details: {
    paddingLeft: 15,
  },
  mesText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  taskText: {
    color: "white",
  },
  notiImg: {
    width: 25,
    height: 25,
  },
  calenderView: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "white",
    marginTop: -20,
  },
  mainCalenderView: {
    flex: 1,
    padding: 20,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
    backgroundColor: "#fff",
  },
  menuTrigger: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  menuTriggerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  menuOptions: {
    borderRadius: 8,
    padding: 5,
  },
});
