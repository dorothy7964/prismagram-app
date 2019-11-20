import React from "react";
import { TextInput } from "react-native";
import PropTypes from "prop-types";
import styles from "../styles";
import constants from "../constants";

const SearchBar = ({ value, onChange, onSubmit }) => (
    <TextInput 
        style={{
            width: constants.width - 40,
            height: 35,
            backgroundColor: styles.lightGreyColor,
            padding: 10,
            borderRadius: 5,
            textAlign: "center"
        }}
        returnKeyType="search"
        value={value}
        onChangeText={onChange}
        onEndEditing={onSubmit}
        placeholder={"Search"}
        placeholderTextColor={styles.darkGreyColor}
    />
);

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default SearchBar;
