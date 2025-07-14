import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../../constants/Theme";
import SwipeableList from "@/components/SlideableList";
import { getUserTasksAPI, deleteTaskAPI } from "../../../api/TaskAPI/TaskAPI";
import { deleteAsyncData } from "../../../utils/asyncDataOperation";
import { useNavigation } from "@react-navigation/native";

export default function Task() {
  const navigation = useNavigation();

  const renderEmptyData = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Task for this day</Text>
      </View>
    );
  };

  const [userTaskData, setUserTasksData] = useState([
    {
      id: "1",
      title: "Today",
      data: [],
    },
    {
      id: "2",
      title: "Tomorrow",
      data: [],
    },
    {
      id: "3",
      title: "This Week",
      data: [],
    },
    {
      id: "4",
      title: "Upcoming Week",
      data: [],
    },
  ]);

  const getUserTasksFunc = () => {
    getUserTasksAPI().then((res) => {
      if (res.status === 200) {
        setUserTasksData(res?.data?.data);
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };

  const handleDelete = (taskId) => {
    console.log(taskId);
    deleteTaskAPI(taskId).then((res) => {
      if (res.status === 201) {
        getUserTasksFunc();
        // console.log(res);
        // setIsLoading(false);
      } else {
        // setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    getUserTasksFunc();
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserTasksFunc();
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.taskView}>
        <View style={styles.profileView}>
          <TouchableOpacity
            onPress={async () => {
              deleteAsyncData("userId");
              deleteAsyncData("accessToken");
              deleteAsyncData("isLogin");
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
            <Text style={styles.taskText}>Upcomming Task</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/images/notification.png")}
            style={styles.notiImg}
          />
        </TouchableOpacity>
      </View>

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
    paddingBottom: 40,
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
    // fontSize: SIZES.h4,
    // fontFamily:Fonts.BOLD
  },
  taskText: {
    color: "white",
    // fontFamily:Fonts.MEDIUM
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
  stickyCircle: {
    position: "absolute",
    bottom: 30,
    right: 25,
    borderRadius: 25,
  },
  addImg: {
    width: 60,
    height: 60,
    borderRadius: 25,
  },
});
