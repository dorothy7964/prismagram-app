import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Image, Platform } from "react-native";
import Swiper from "react-native-swiper";
import { useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { Ionicons } from "@expo/vector-icons";
import constants from "../constants";
import styles from "../styles";

export const TOGGLE_LIKE = gql`
    mutation toggelLike($postId: String!) {
        toggleLike(postId: $postId)
    }
`;

const Container = styled.View`
    margin-bottom: 40px;
`;

const Header = styled.View`
    padding: 15px;
    flex-direction: row;
    align-items: center;
`;

const Touchable = styled.TouchableOpacity``;

const HeaderUserContainer = styled.View`
    margin-left: 10px;
`;

const Bold = styled.Text`
    font-weight: 500;
`;

const Location = styled.Text`
    font-size: 12px;
`;

const IconsContainer = styled.View`
    flex-direction: row;
    margin-bottom: 5px;    
`;

const IconContainer = styled.View`
    margin-right: 10px;
`;

const InfoContainer = styled.View`
    padding: 10px;
`;

const Caption = styled.Text`
    margin: 5px 0px;
`;

const CommentCount = styled.Text`
    opacity: 0.5;
    font-size: 13px;
`;

const Post = ({
    id,
    user, 
    location, 
    caption,
    files = [],
    comments = [],
    isLiked: isLikedProp,
    likeCount: likeCountProp,
}) => {
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [likeCount, setLikeCount] = useState(likeCountProp);
    const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });
    
    const handleLike = async () => {
        if (isLiked === true) {
            setLikeCount(c => c - 1);
        } else {
            setLikeCount(c => c + 1);
        }
        setIsLiked(p => !p);
        try {
            await toggleLikeMutaton();
        } catch (e) {};
    };

    return (
        <Container>
            <Header>
                <Touchable>
                    <Image 
                        source={{ uri: user.avatar }} 
                        style={{ height: 40, width: 40, borderRadius: 20 }}
                    />
                </Touchable>
                <Touchable>
                    <HeaderUserContainer>
                        <Bold>{user.userName}</Bold>
                        <Location>{location}</Location>
                    </HeaderUserContainer>
                </Touchable>
            </Header>
            <Swiper
                showsPagination={true}
                style={{ height: constants.height / 2.5 }}
            >
                {files.map(file => (
                    <Image 
                        key={file.id}
                        source={{ uri: file.url }} 
                        style={{ width: constants.width, height: constants.height / 2.5 }}
                    />
                ))}
            </Swiper>
            <InfoContainer>
                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <Ionicons
                                size={24}
                                color={isLiked ? styles.redColor : styles.blackColor}
                                name={
                                    Platform.OS === "ios" 
                                        ? isLiked   
                                            ? "ios-heart"         
                                            : "ios-heart-empty" 
                                        : isLiked   
                                            ? "md-heart"         
                                            : "md-heart-empty"
                                }
                            />
                        </IconContainer>
                    </Touchable>
                    <Touchable>
                        <IconContainer>
                            <Ionicons
                                size={24}
                                color={styles.blackColor}
                                name={Platform.OS === "ios" ? "ios-text" : "md-text"}
                            />
                        </IconContainer>
                    </Touchable>
                </IconsContainer>
                <Touchable>
                    <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
                </Touchable>
                <Caption>
                    <Bold>{user.userName}</Bold> {caption}
                </Caption>
                <Touchable>
                    <CommentCount>See all {comments.length} comments</CommentCount>
                </Touchable>
            </InfoContainer>
        </Container>
    );
};

Post.propTypes = {
    id: PropTypes.string.isRequired,
    location: PropTypes.string,
    caption: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                userName: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    isLiked: PropTypes.bool.isRequired,
    likeCount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired
};

export default Post;
