import React from "react";
import { ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { POST_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import Post from "../components/Post";

const POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
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