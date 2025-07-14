import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../../../constants/Theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addTaskAPI } from "../../../../api/TaskAPI/TaskAPI";
import { Dropdown } from "react-native-element-dropdown";
export default function AddTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: new Date(),
    priority: "",
  });

  const data = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setFormData({ ...formData, dueDate: currentDate });
  };

  const addTaskFunc = () => {
    setIsLoading(true);
    addTaskAPI(formData).then((res) => {
      if (res.status === 201) {
        // console.log(res);
        setIsLoading(false);
        setFormData({
          title: "",
          description: "",
          dueDate: new Date(),
          priority: "",
        });
        ToastAndroid.showWithGravity(
          "Task Added!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else {
        setIsLoading(false);
        if (res?.response?.status === 400) {
          res?.response?.data?.errors?.map((value, index) =>
            ToastAndroid.showWithGravity(
              value.msg,
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            )
          );
        } else {
          ToastAndroid.showWithGravity(
            res?.response?.data?.message,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        }
      }
    });
  };

  // useEffect(async () => {

  // },[]);

  // console.log(formData);

  return (
    <ScrollView style={styles.addTaskContainer}>
      <View style={styles.continer}>
        <Text style={styles.textAdd}>Add Task</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputView}>
          <Text style={styles.label}>Task Title</Text>
          <TextInput
            placeholder="Task Name"
            style={styles.Input}
            value={formData?.title}
            onChangeText={(text) => handleChange(text, "title")}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Description"
            style={styles.InputArea}
            multiline={true}
            value={formData?.description}
            onChangeText={(text) => handleChange(text, "description")}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.label}>Due date</Text>
          <View style={styles.dateView}>
            <TextInput
              placeholder="Date of start"
              style={styles.InputDate}
              value={formData.dueDate.toDateString()}
              editable={false}
            />
            {/* <TouchableOpacity onPress={() => showDatepicker("start")}> */}
            <TouchableOpacity onPress={() => setShow(true)}>
              <Image
                source={require("../../../../assets/images/calendar.png")}
                style={styles.calenderImgs}
              />
            </TouchableOpacity>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={formData.dueDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChange}
          />
        )}
        <View style={styles.inputView}>
          <Text style={styles.label}>Priority</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data}
            labelField="label"
            valueField="value"
            placeholder="Select Priority"
            value={formData?.priority}
            onChange={(item) => {
              handleChange(item.value, "priority");
            }}
          />
        </View>
        {isLoading ? (
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>Creating .....</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              addTaskFunc();
            }}
          >
            <Text style={styles.btnText}>Create a task</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addTaskContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  continer: {
    flexDirection: "row",
    paddingHorizontal: 40,
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingTop: 50,
    paddingBottom: 20,
  },
  textAdd: {
    fontSize: 18,
    color: "white",
    paddingLeft: 120,
    fontWeight: "bold",
  },
  inputContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  label: {
    fontSize: 13,
    color: "#403f3fff",
    fontWeight: "bold",
  },
  inputView: {
    marginTop: 15,
  },
  Input: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 12,
    height: 50,
    justifyContent: "center",
  },
  InputArea: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    fontSize: 12,
    height: 100,
    textAlignVertical: "top",
  },
  calenderImgs: {
    width: 23,
    height: 23,
  },
  dateView: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 10,
    height: 50,
  },
  InputDate: {
    fontSize: 12,
  },
  dropdown: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
  },
  placeholderStyle: {
    fontSize: 12,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 12,
    color: "#000",
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
