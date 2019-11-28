import React from "react";
import { ScrollView } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { USER_FRAGMENT } from "../fragments";
import Loader from "../components/Loader";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
    query seeUser($userName: String!) {
        seeUser(userName: $userName) {
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export default ({ navigation }) => {
    const { data, loading } = useQuery(GET_USER, {
        variables: { userName: navigation.getParam("userName") }
    });
    
    return (
        <ScrollView>
            {loading ? (
                <Loader />
            ) : (
                data && data.seeUser && <UserProfile {...data.seeUser} />
            )}
        </ScrollView>
    );
};