import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from 'phosphor-react-native'

import auth from '@react-native-firebase/auth' // Importação do firebase usando a biblioteca https://rnfirebase.io/

import Logo from '../assets/logo_primary.svg'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { Alert } from "react-native";

export function SignIn() {
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { colors } = useTheme()

    function handleSignIn() {
        if (!Email || !password) {
            return Alert.alert('Entrar', 'Informe o e-mail e a senha para continuar.')
        }

        setIsLoading(true)

        auth()
            .signInWithEmailAndPassword(Email, password)   
            .catch((error) => {
                console.log(error)
                setIsLoading(false)

                if (error.code === 'auth/invalid-email') {
                    return Alert.alert('Entrar', 'E-mail inválido.')
                }

                if (error.code === 'auth/user-not-found') {
                    return Alert.alert('Entrar', 'E-mail ou senha inválidos.')
                }

                if (error.code === 'auth/wrong-password') {
                    return Alert.alert('Entrar', 'E-mail ou senha inválidos.')
                }

                return Alert.alert('Entrar', 'Não foi possível acessar.')
            })     
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                placeholder="E-mail" 
                mb={4}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Senha"
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />} 
                secureTextEntry
                mb={8}
                onChangeText={setPassword}
            />

            <Button 
                title="Entrar"
                w="full"
                onPress={handleSignIn}
                isLoading={isLoading}
            />
        </VStack>
    )
}