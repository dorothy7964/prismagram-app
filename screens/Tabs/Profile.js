import React, { useEffect } from "react";
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

export default ({ navigation }) => {
    const { loading, data } = useQuery(ME);
    useEffect(() => {
		if(data.me){
            navigation.setParams("title", data.me.useName);
		}
    }, [data]);
    
    return (
        <ScrollView>
            {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} />}
        </ScrollView>
    );
};