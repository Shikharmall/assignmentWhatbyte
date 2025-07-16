import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { getAsyncData } from "../../utils/asyncDataOperation";

export default function TabLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await getAsyncData("isLogin");
      setIsLoggedIn(loginStatus === "true");
    };
    checkLoginStatus();
  }, []);
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="editTask" options={{ headerShown: false }} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
    </Stack>
  );
}

// import { Stack } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, View } from "react-native";
// import { getAsyncData } from "../../utils/asyncDataOperation"; // Assuming you have this helper

// export default function TabLayout() {
//   const [isLoggedIn, setIsLoggedIn] = useState(null); // null means loading

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const loginStatus = await getAsyncData("isLogin"); // You may store it as a boolean string like "true"
//       setIsLoggedIn(loginStatus === "true");
//     };
//     checkLoginStatus();
//   }, []);

//   if (isLoggedIn === null) {
//     // While checking login status, show a loading spinner
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <Stack>
//       {isLoggedIn ? (
//         // User is logged in
//         <>
//           <Stack.Screen name="(home)" options={{ headerShown: false }} />
//           <Stack.Screen name="editTask" options={{ headerShown: false }} />
//         </>
//       ) : (
//         // User is not logged in
//         <>
//           <Stack.Screen name="signin" options={{ headerShown: false }} />
//           <Stack.Screen name="signup" options={{ headerShown: false }} />
//         </>
//       )}
//     </Stack>
//   );
// }
