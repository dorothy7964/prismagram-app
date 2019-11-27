import { gql } from "apollo-boost";

export const POST_FRAGMENT = gql`
    fragment PostParts on Post {
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

export const USER_FRAGMENT = gql`
    fragment UserParts on User {
        id
        userName
        fullName
        isFollowing
        isSelf
        bio
        avatar
        followingCount
        followersCount
        postsCount
        posts {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;
