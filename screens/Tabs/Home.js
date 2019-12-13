import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { POST_FRAGMENT } from "../../fragments";
import Loader from "../../components/Loader";
import Post from "../../components/Post";

export const FEED_QUERY = gql`
    {
        seeFeed {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(FEED_QUERY);
    const refresh = async () => {
        try {
            setRefreshing(true);
            await refetch();
        } catch (e) {
            console.log(e);
        } finally {
            setRefreshing(false);
        }
    };
    
    return (
        <ScrollView 
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refresh} />
            }
        >
            {loading ? (
                <Loader />
            ) : (
                data &&
                data.seeFeed &&
                data.seeFeed.map(post => <Post key={post.id} {...post} />)
            )}
        </ScrollView>
    );
};