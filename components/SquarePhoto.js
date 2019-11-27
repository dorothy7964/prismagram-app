import React from "react";
import { withNavigation } from "react-navigation";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";

const SquarePhoto = ({ id, files = [], navigation }) => (
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
        <Image 
            source={{ uri: files[0].url }}
            style={{ width: constants.width / 3, height: constants.height / 6 }}
        />
    </TouchableOpacity>
);

SquarePhoto.propTypes = {
    id: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired
};
export default withNavigation(SquarePhoto);

