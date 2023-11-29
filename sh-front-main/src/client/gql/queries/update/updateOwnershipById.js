import { gql } from "@apollo/client";
export const UPDATE_OWNERSHIP = gql`
mutation update_sh_ownerships_by_pk($id: Int!, $object: sh_ownerships_set_input!) {
  update_sh_ownerships_by_pk(pk_columns: {id: $id}, _set: $object) {
    address {
      address
      apartment
      floor
      id
      __typename
    }
    coordinate {
      id
      lat
      lon
      __typename
    }
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
  }
}
`;

export const UPDATE_ADDRESS_MUTATION = (id, address, apartment, floor, updatedAt) => `
  mutation {
    update_sh_addresses(
      where: { id: { _eq: ${id} } }
      _set: {
        address: "${address}"
        apartment: "${apartment}"
        floor: "${floor}"
        updated_at: "${updatedAt}"
      }
    )
  }
`;

export const UPDATE_COORDINATES_MUTATION = (id, lat, lon, updatedAt) => `
  mutation {
    update_sh_coordinates(
      where: { id: { _eq: ${id} } }
      _set: {
        lat: "${lat}"
        lon: "${lon}"
        updated_at: "${updatedAt}"
      }
    )
  }
`;

export const UPDATE_OWNERSHIPS_MUTATION = (id, updatedAt, bathrooms, rooms, shared) => `
  mutation {
    update_sh_ownerships(
      where: { id: { _eq: ${id} } }
      _set: {
        updated_at: "${updatedAt}"
        bathrooms: ${bathrooms}
        rooms: ${rooms}
        shared: ${shared}
      }
    )
  }
`;