import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { COLORS, SIZES } from "../../constants/Theme";
import { Link } from "expo-router";
import { userRegisterAPI } from "../../api/UserAPI/UserAPI";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const registerUserFunc = () => {
    setIsLoading(true);
    userRegisterAPI(formData).then((res) => {
      if (res.status === 201) {
        setIsLoading(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          rePassword: "",
        });
        ToastAndroid.showWithGravity(
          "User Registered!",
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg5.png")}
        style={{
          flex: 1,
        }}
        resizeMode="cover"
      >
        <ScrollView>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Get Started</Text>
            <Text style={styles.subtitle}>Sign up to continue</Text>
          </View>
          <View style={styles.dataContainer}>
            <TextInput
              placeholder="Name"
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
              value={formData?.name}
              onChangeText={(text) => handleChange(text, "name")}
            />
            <TextInput
              placeholder="Email"
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
              value={formData?.email}
              onChangeText={(text) => handleChange(text, "email")}
            />
            <TextInput
              placeholder="Password"
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
              value={formData?.password}
              onChangeText={(text) => handleChange(text, "password")}
            />
            <TextInput
              placeholder="Re-Enter Your Password"
              style={styles.textinput}
              placeholderTextColor={COLORS.white}
              value={formData?.rePassword}
              onChangeText={(text) => handleChange(text, "rePassword")}
            />
          </View>
          <View style={styles.btnContainer}>
            {isLoading ? (
              <TouchableOpacity>
                <View style={styles.button1}>
                  <Text style={styles.btnText}>SIGNING UP ........</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  registerUserFunc();
                }}
              >
                <View style={styles.button1}>
                  <Text style={styles.btnText}>SIGN UP</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.button2}>
                <View style={styles.logo}>
                  <Image
                    source={require("../../assets/images/facebook.png")}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                    }}
                  />
                </View>
                <Text style={styles.btnText}>Sign In with facebook</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <Link href="/signin" style={styles.text}>
              Sign In
            </Link>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  title: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.h1 * 1.5,
  },
  subtitle: {
    color: COLORS.white,
    fontSize: SIZES.h4,
    paddingTop: 3,
  },
  dataContainer: {
    marginTop: 50,
  },
  textinput: {
    color: COLORS.white,
    fontSize: SIZES.h3,
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  btnContainer: {
    marginTop: 50,
  },
  button1: {
    backgroundColor: COLORS.primary,
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.h4,
  },
  button2: {
    flexDirection: "row",
    backgroundColor: COLORS.blue,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginRight: 10,
  },
  text: {
    color: COLORS.white,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
    fontSize: SIZES.h5,
  },
  bottomContainer: {
    justifyContent: "center",
    marginTop: 50,
  },
});

export default SignUpScreen;
