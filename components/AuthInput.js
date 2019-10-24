import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";

const Container = styled.View`
    margin-bottom: 10px;
`;

const TextInput = styled.TextInput`
    background-color: ${props => props.theme.greyColor};
    width: ${constants.width / 1.7};
    padding: 10px;
    border: 0.5px solid ${props => props.theme.darkGreyColor};
    border-radius: 4px;
`;

const AuthInput = ({
    value,
    onChange,
    placeholder,
    keyboardType="default",
    autoCapitalize="none",
    returnKeyType="done",
    onSubmitEditing = () => null,
    autoCorrect = ture
}) => (
    <Container>
        <TextInput 
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            autoCorrect={autoCorrect}
        />
    </Container>
);

AuthInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    keyboardType: PropTypes.oneOf([
        "default",
        "number-pad",
        "decimal-pad",
        "numeric",
        "email-address",
        "phone-pad"
    ]),
    autoCapitalize: PropTypes.oneOf([
        "none", 
        "sentences", 
        "words", 
        "characters"
    ]),
    returnKeyType: PropTypes.oneOf([
        "done", 
        "go", 
        "next", 
        "search",
        "send"
    ]),
    onSubmitEditing: PropTypes.func,
    autoCorrect: PropTypes.bool,
};

export default AuthInput;