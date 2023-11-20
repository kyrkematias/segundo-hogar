import { gql } from "@apollo/client";
export const UPDATE_OWNERSHIP = gql`
mutation update_sh_ownerships_by_pk($id: Int!, $object: sh_ownerships_set_input!) {
  update_sh_ownerships_by_pk(pk_columns: {id: $id}, _set: $object) {
    addresses_id
    bathrooms
    coordinates_id
    created_at
    id
    is_published
    owners_id
    ownerships_state
    ownerships_types_id
    rating
    restrictions_id
    rooms
    shared
    size
    updated_at
    address
  }
}
`;
