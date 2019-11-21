import React from "react";
import styled from "styled-components";
import { ScrollView } from "react-native";

const Text = styled.Text``;

export default ({ navigation }) => {
    return (
        <ScrollView>
            <Text>I should fetch for: {navigation.getParm("id")}</Text>
        </ScrollView>
    );
};