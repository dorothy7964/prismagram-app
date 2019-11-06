import React, { useState } from "react";
import styled from "styled-components";
import { Alert } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Facebook from 'expo-facebook';
import { useMutation } from "react-apollo-hooks";
import { CREATE_ACCOUNT } from "./AuthQueries";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const FBContainer = styled.View`
    margin-top: 25px;
    padding-top: 25px;
    border-top-width: 1px;
    border-color: ${props => props.theme.lightGreyColor};
    border-style: solid;
`;

export default ({ navigation }) => {
    const fNameInput = useInput("");
    const lNameInput = useInput("");
    const emailInput = useInput(navigation.getParam("email", ""));
    const userNameInput = useInput("");
    const [loading, setLoading] = useState(false);
    const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
        variables: {
            userName: userNameInput.value,
            email: emailInput.value,
            firstName: fNameInput.value,
            lastName: lNameInput.value
        }
    });
    const handleSignup = async () => {
        const { value: fName } = fNameInput;
        const { value: lName } = lNameInput;
        const { value: email } = emailInput;
        const { value: userName } = userNameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            return Alert.alert("That email is invalid");
        }
        if (fName === "") {
            return Alert.alert("I need your name");
        }
        if (userName === "") {
            return Alert.alert("Invalid userName");
        }

        try {
            setLoading(true);
            const {
                data: { createAccount }
            } = await createAccountMutation();
            if (createAccount) {
                Alert.alert("Account created", "Log in now!");
                navigation.navigate("Login", { email });
            }
        } catch (e) {
            console.log(e);
            Alert.alert("userName taken.", "Log in instead");
            navigation.navigate("Login", { email });
        } finally {
            setLoading(false);
        }
    };

    const fbLogin = async () => {
        try {
            setLoading(true);
            const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                "466536900623918", 
                {
                    permissions: ['public_profile', 'email'],
                 }
            );
            if (type === 'success') {
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,last_name,email`
                );
                const { first_name, last_name, email } = await response.json();
                fNameInput.setValue(first_name);
                lNameInput.setValue(last_name);
                emailInput.setValue(email);
                const [userName] = email.split("@");
                userNameInput.setValue(userName);
                setLoading(false);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    };
    
    return (
        <React.Fragment>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <AuthInput
                        { ...fNameInput }
                        placeholder="First name"
                        autoCapitalize="words"
                    />
                    <AuthInput
                        { ...lNameInput }
                        placeholder="Last name"
                        autoCapitalize="words"
                    />
                    <AuthInput
                        { ...emailInput }
                        placeholder="Email"
                        keyboardType="email-address"
                        returnKeyType="send"
                        autoCorrect={false}
                    />
                    <AuthInput
                        { ...userNameInput }
                        placeholder="User Name"
                        returnKeyType="send"
                        autoCorrect={false}
                    />
                    <AuthButton
                        onPress={handleSignup}
                        text="Sign Up"
                        loading={loading}
                    />
                    <FBContainer>
                        <AuthButton
                            onPress={fbLogin}
                            text="Connect Facebook"
                            loading={false}
                            bgColor={"#2D4DA7"}
                        />
                    </FBContainer>
                </View>
            </TouchableWithoutFeedback>
        </React.Fragment>
    );
};