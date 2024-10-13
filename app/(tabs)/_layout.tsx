import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Approval Matrix",
          headerShown: true,
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: "#eb951b",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
            fontSize: 22,
          },
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="update"
        options={{
          title: "Approval Matrix",
          headerShown: true,
          headerBackVisible: true,
          headerStyle: {
            backgroundColor: "#eb951b",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
            fontSize: 22,
          },
          headerTintColor: "white",
        }}
      />
    </Stack>
  );
}
