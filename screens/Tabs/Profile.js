import React from "react";
import { ScrollView } from "react-native";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
   {
       me {
           ...UserParts
       }
   }
   ${USER_FRAGMENT}
`;

export default () => {
    const { loading, data } = useQuery(ME);

    return (
        <ScrollView>
            {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
        </ScrollView>
    );
};