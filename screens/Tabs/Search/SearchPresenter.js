import React, { useState } from "react";
import PropTypes from "prop-types";
import { ScrollView, RefreshControl } from "react-native";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../../../components/Loader";
import SquarePhoto from "../../../components/SquarePhoto";


const SquareContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export const SEARCH = gql`
    query search($term: String!) {
        searchPost(term: $term) {
            id
            files {
                id
                url
            }
            likeCount
            commentCount
        }
    }
`;

const SearchPresenter = ({ term, shouldFetch }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { data, loading, refetch } = useQuery(SEARCH, {
        variables: { term },
        skip: !shouldFetch,
        fetchPolicy: "network-only"
    });
    const onRefresh = async () => {
        try {
            setRefreshing(true);
            await refetch({ variables: { term } });
        } catch (e) {
        } finally {
            setRefreshing(false);
        }
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
            }
        >
            <SquareContainer>
                { loading ? (
                        <Loader />
                    ) : (
                        data &&
                        data.searchPost &&
                        data.searchPost.map(post => <SquarePhoto key={post.id} {...post} />)
                    )}
            </SquareContainer>
        </ScrollView>
    );
};

SearchPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;