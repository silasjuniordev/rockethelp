import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { VStack } from "native-base";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Loading } from "../components/Loading";
import { SignIn } from "../screens/SignIn";

export function Routes() {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    if (isLoading) {
        return <Loading />
    }

    useEffect(() => {
        const subscriber = auth()
            .onAuthStateChanged(response => {
                setUser(response)
                setIsLoading(false)
            })

        return subscriber
    },[])

    return (
        <VStack flex={1} bg="gray.600">
            <NavigationContainer>
                {user ? <AppRoutes /> : <SignIn />}
            </NavigationContainer>
        </VStack>
    )
}