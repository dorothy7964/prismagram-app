import React from "react";
import styled from "styled-components";
import AuthButton from "../../components/AuthButton";

const View = styled.View`
    justify-content: center;
    align-items: center;
    flex: 1;
`;

const Text = styled.Text``;

export default () => (
    <View>
        <AuthButton
            onPress={() => null}
            text="Log In"
        />
    </View>
);