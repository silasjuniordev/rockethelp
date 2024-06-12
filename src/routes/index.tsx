import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { VStack } from "native-base";

export function Routes() {
    return (
        <VStack flex={1} bg="gray.600">
            <NavigationContainer>
                <AppRoutes />
            </NavigationContainer>
        </VStack>
    )
}