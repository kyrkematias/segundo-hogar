import gql from 'graphql-tag';

export const UPDATE_OWNERSHIP = gql`
  mutation UpdateOwnership($id: bigint!, $address: AddressInput!, $owners_id: bigint) {
    update_sh_ownerships_by_pk(
      pk_columns: { id: $id },
      _set: {
        address: {
          update: {
            address: $address.address,
            floor: $address.floor,
            apartment: $address.apartment,
          }
        },
        owners_id: $owners_id
      }
    ) {
      id
      address {
        address
        floor
        apartment
      }
      owners_id
    }
  }
`;
