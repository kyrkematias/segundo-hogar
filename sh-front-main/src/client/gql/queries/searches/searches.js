import { gql } from "@apollo/client";
import {
  ANY_OWNERSHIPS_TYPE,
  HOUSE_OWNERSHIPS_TYPE,
  DEPARTMENT_OWNERSHIPS_TYPE,
} from "const";

export const GET_INITIAL_PUBLICATIONS = gql`
  query SearchForCards($limit: Int, $offset: Int) {
    sh_publications(limit: $limit, offset: $offset, order_by: { id: desc }) {
      id
      title
      price
      description
      ownership {
        id
        rooms
        bathrooms
        rating
        address {
          address
        }
        ownerships_images {
          imageurl
        }
        coordinate {
          lat
          lon
        }
      }
    }
  }
`;

export const SEARCH_FOR_DETAILS = gql`
  query SearchForDetails($id: Int) {
    sh_publications(where: { id: { _eq: $id } }) {
      id
      title
      price
      contact_name
      contact_phone
      contact_email
      description
      is_furnished
      created_at
      ownership {
        id
        rooms
        bathrooms
        rating
        size
        ownerships_images {
          public_id
          imageurl
        }
        coordinate {
          lat
          lon
          id
        }
        ownerships_type {
          description
        }
        address {
          address
        }
        restriction {
          smokers
          pets
          children
          renter_count
        }
      }
    }
  }
`;

export function buildQueryInitialPublications(filters) {
  const page_opt = `
    limit: ${filters.limit}, 
    offset: ${filters.offset}
  `;

  const query = `
      query GetInitialPublications {
          sh_publications(${page_opt}, order_by: { id: desc }) {
              id
              title
              price
              description
              ownership {
                  id
                  rooms
                  bathrooms
                  rating
                  ownerships_images {
                    imageurl
                  }
                  address {
                    address
                  }
                  coordinate {
                    lat
                    lon
                  }
              }
          }
        }  
      `;
  console.log("query: ", query);
  return query;
}

export function buildSearchQueryUsingFilters(filters) {
  const page_opt = `
    limit: ${filters.limit}, 
    offset: ${filters.offset}
  `;

  const ownershipsType =
    filters.ownerships_type === "Departamento"
      ? DEPARTMENT_OWNERSHIPS_TYPE
      : HOUSE_OWNERSHIPS_TYPE;

  const ownerships_type =
    filters.ownerships_type === ANY_OWNERSHIPS_TYPE
      ? ""
      : `{ ownership: { ownerships_type: { id: { _eq: ${ownershipsType} } } } },`;

  const where_and = `
    { price: { _gte: ${filters.pricemin}, _lte: ${filters.pricemax} } }
    ${filters.ownerships_type === ANY_OWNERSHIPS_TYPE ? "" : ownerships_type} 
    { is_furnished: { _eq: ${filters.is_furnished} } },
    { ownership: { rooms: { _lte: ${filters.rooms} } } },
    { ownership: { bathrooms: { _lte: ${filters.bathrooms} } } },
    { ownership: { size: { _lte: ${filters.size} } } }
  `;
  console.log(where_and, ownerships_type, ownershipsType, page_opt)
  const query = `
  query SearchUsingFilters {
    sh_publications(
      limit: 6,
      offset: 0,
      where: {
        _and: [
          { price: { _gte: 0, _lte: 900000000 } },
          {
            ownership: {
              ownerships_type: { id: { _eq: 1 } },
              rooms: { _lte: 1 },
              bathrooms: { _lte: 1 },
              size: { _lte: 1 }
            }
          },
          { is_furnished: { _eq: true } }
        ]
      }
    ) {
      id
      title
      price
      description
      ownership {
        id
        rooms
        bathrooms
        rating
        ownerships_images {
          imageurl
        }
        coordinate {
          lat
          lon
        }
        address {
          address
        }
      }
    }
  }`;

  return query;
}

export const GET_ALL_REQUESTS = gql`
  query GetAllRequests {
    sh_requests {
      id
      message
      publications_id
      request_state
      publication {
        ownership {
          id
          owner {
            id
            persons_id
            person {
              users {
                id
                email
              }
            }
          }
          coordinates_id
          addresses_id
        }
        contact_email
      }
    }
  }
`;
