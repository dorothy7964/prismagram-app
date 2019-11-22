import React from "react";
import { ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../components/Loader";
import Post from "../components/Post";

const POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        id
        location
        caption
        user {
            id
            avatar
            userName
        }
        files {
            id
            url
        }
        likeCount
        isLiked
        comments {
            id
            text
            user {
                id
                userName
            }
        }
        createdAt
    }
`;


export default ({ navigation }) => {
    const { data, loading } = useQuery(POST_DETAIL, {
        variables: { id: navigation.getParam("id") }
    });
    
    return (
        <ScrollView>
            {loading ? (
                <Loader />
            ) : (
                data && data.seeFullPost && <Post {...data.seeFullPost} />
            )}
        </ScrollView>
    );
};