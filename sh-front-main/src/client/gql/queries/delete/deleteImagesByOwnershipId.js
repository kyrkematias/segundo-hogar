import gql from 'graphql-tag';

export const DELETE_IMAGES = gql`
    mutation DeleteImagesByOwnershipId($ownerships_id: bigint) {
        delete_sh_ownerships_images(where: { ownerships_id: { _eq: $ownerships_id } }) {
            affected_rows
        }
    }
`;

export const DELETE_IMAGES_BY_URL = gql`
    mutation DeleteImagesByUrl($url: String) {
        delete_sh_ownerships_images(where: { imageurl: { _eq: $url } }) {
            affected_rows
        }
    }
`