import React from "react";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import constants from "../constants";

const SquarePhoto = ({ id, files = [] }) => (
    <TouchableOpacity>
        <Image 
            source={{ uri: files[0].url }}
            style={{ width: constants.width / 3, height: constants.height / 6 }}
        />
    </TouchableOpacity>
);

Post.propTypes = {
    id: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired
};
export default SquarePhoto;

