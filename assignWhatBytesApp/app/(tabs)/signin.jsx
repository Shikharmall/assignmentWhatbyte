import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants/Theme";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import { userLoginAPI } from "@/api/UserAPI/UserAPI";
import { getAsyncData, storeAsyncData } from "../../utils/asyncDataOperation";

const SignInScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const checkUserFunc = async () => {
    try {
      setIsLoading(true);

      const res = await userLoginAPI(formData);

      if (res.status === 200) {
        storeAsyncData("userId", res?.data?.data?.userId);
        storeAsyncData("accessToken", res?.data?.data?.token);
        storeAsyncData("isLogin", "true");

        setFormData({
          email: "",
          password: "",
        });

        ToastAndroid.showWithGravity(
          "Credential Matched!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );

        navigation.navigate("(home)");
      } else {
        ToastAndroid.showWithGravity(
          res?.response?.data?.message || "Login failed",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        err?.response?.data?.message || "An error occurred",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await getAsyncData("isLogin");

      if (loginStatus === "true") {
        navigation.navigate("(home)");
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/bg7.png")}
        style={{
          flex: 1,
        }}
        resizeMode="cover"
      >
        <ScrollView>
          <View style={styles.topContainer}>
            <Text style={styles.title}>Get Started</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>
          <View style={styles.dataContainer}>
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
              secureTextEntry={true}
              onChangeText={(text) => handleChange(text, "password")}
            />
          </View>
          <View style={styles.btnContainer}>
            {isLoading ? (
              <TouchableOpacity onPress={{}}>
                <View style={styles.button1}>
                  <Text style={styles.btnText}>SIGNING IN .....</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  checkUserFunc();
                }}
              >
                <View style={styles.button1}>
                  <Text style={styles.btnText}>SIGN IN</Text>
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
            <Link href="/signup" style={styles.text}>
              Already have an account? | Sign Up
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

export default SignInScreen;
