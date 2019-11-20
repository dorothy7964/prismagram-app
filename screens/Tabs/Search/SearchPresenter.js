import React from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

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
    const { data, loading } = useQuery(SEARCH, {
        variables: { term },
        skip: !shouldFetch,
    });
    console.log(data, loading);

    return (
        <View>
            <Text>HeLLo</Text>
        </View>
    );
};

SearchPresenter.propTypes = {
    term: PropTypes.string.isRequired,
    shouldFetch: PropTypes.bool.isRequired
};

export default SearchPresenter;