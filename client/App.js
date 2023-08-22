import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Route from "./src/routes";

export default function App() {
    return (
        <NavigationContainer>
            <Route />
        </NavigationContainer>
    );
}