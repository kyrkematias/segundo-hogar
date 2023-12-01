import { gql } from "@apollo/client";

export const REGISTER_OWNERSHIPS = gql`
  mutation RegisterOwnerships(
    $shared: Boolean
    $rooms: Int
    $bathrooms: Int
    $size: Int
    $rating: Int
    $ownerships_state: Boolean
    $ownerships_types_id: bigint
    $owners_id: bigint
    $lat: float8
    $lon: float8
    $address: String
    $floor: String
    $apartment: String
  ) {
    insert_sh_ownerships(
      objects: [
        {
          shared: $shared
          rooms: $rooms
          bathrooms: $bathrooms
          size: $size
          rating: $rating
          ownerships_state: $ownerships_state
          ownerships_types_id: $ownerships_types_id
          owners_id: $owners_id
          restriction: {
            data: {
              pets: false
              smokers: false
              children: false
              renter_count: 1
            }
          }
          coordinate: { data: { lat: $lat, lon: $lon } }
          address: {
            data: { address: $address, floor: $floor, apartment: $apartment }
          }
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;

// Insert ownerships images, with imageurl, publicid and ownerships_id
export const INSERT_OWNERSHIPS_IMAGES = gql `
  mutation InsertOwnershipsImages (
    $public_id: String
    $image_url: String
    $ownerships_id: bigint
  ) {
    insert_sh_ownerships_images (
      objects: [
        {
          public_id: $public_id
          imageurl: $image_url
          ownerships_id: $ownerships_id
        }
      ]
    ) {
      returning {
        id
      }
    }
  }
`;