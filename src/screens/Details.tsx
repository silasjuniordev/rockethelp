import { Text, VStack } from "native-base";
import { Header } from "../components/Header";
import { useRoute } from "@react-navigation/native";

type RouteParams ={
    orderId: string
}

export function Details() {
    const route = useRoute() 
    const { orderId } = route.params as RouteParams

    return (
        <VStack flex={1} bg="gray.600">
            <Header 
                title="Solicitação"
            />

            <Text color="white">{orderId}</Text>
        </VStack>
    )
}