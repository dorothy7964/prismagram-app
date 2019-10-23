import React from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import constants from "../../constants";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Image = styled.Image`
    width: ${constants.width / 2.5};
`;

const Touchable = styled.TouchableOpacity``;

const LoginLink = styled.View``;
const LoginLinkText = styled.Text`
    color: ${props => props.theme.blueColor};
    font-weight: 600;
    margin-top: 20px;
`;

export default ({ navigation }) => (
    <View>
        <Image 
            resizeMode={"contain"}
            source={require("../../assets/logo.png")} 
        />

        <AuthButton 
            onPress={() => navigation.navigate("Signup")}
            text="Create new Account"
        />

        <Touchable onPress={() => navigation.navigate("Login")}>
            <LoginLink>
                <LoginLinkText>Log in</LoginLinkText>
            </LoginLink>
        </Touchable>
    </View>
);