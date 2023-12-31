import { gql } from "@apollo/client";

export const GET_STATES = gql`
  query GetStates {
    sh_states(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const GET_CITIES = gql`
  query GetCities($state_id: bigint) {
    sh_cities(
      where: { state_id: { _eq: $state_id } }
      order_by: { name: asc }
    ) {
      id
      name
    }
  }
`;

export const GET_CAREERS = gql`
  query GetCareers {
    sh_careers {
      id
      name
    }
  }
`;

export const GET_TAGS = gql`
  query GetTags {
    sh_tags {
      id
      description
    }
  }
`;

export const GET_OWNERSHIPS_BY_OWNER_ID = gql`
  query GetOwnershipsByOwnerId($owner_id: bigint) {
    sh_ownerships(where: { owners_id: { _eq: $owner_id } }) {
      id
      address {
        address
        floor
        apartment
        id
      }
      coordinate {
        lat
        lon
        id
      }
      owners_id
    }
  }
`;

export const GET_OWNERSHIPS_BY_ID = gql`
  query GetOwnershipsById($id: Int) {
    sh_ownerships(where: { id: { _eq: $id } }) {
      id
      address {
        address
        floor
        apartment
        id
      }
      coordinate {
        lat
        lon
        id
      }
    }
  }
`;

export const IS_PUBLISHED = gql`
  query IsPublished($id: bigint) {
    sh_publications(where: { ownerships_id: { _eq: $id } }) {
      id
    }
  }
`;

export const GET_STUDENTS = gql`
  query GetStudent {
    sh_students {
      career {
        name
        id
      }
      city {
        name
        id
        state {
          name
          id
        }
      }
      person {
        gender
        id
        birth_date
        firstname
        lastname
        phone
      }
    }
  }
`;

export const GET_PERSON_BY_ID = gql`
  query GetPersonById($id: Int!) {
    sh_persons(where: { id: { _eq: $id } }) {
      id
      firstname
      lastname
      gender
      birth_date
      phone
      students {
        cities_id
        city {
          id
          name
          state {
            id
            name
          }
        }
        career {
          id
          name
        }
      }
    }
  }
`;

export const GET_STUDENT_INFO_BY_PERSON_ID = gql`
  query getStudentInfoByPersonId($id: Int!) {
    sh_persons(where: { id: { _eq: $id } }) {
      students {
        shared
      }
      users {
        bio
        email
        username
      }
    }
  }
`;

// get publications by ownership id
export const GET_PUBLICATIONS_BY_OWNERSHIP_ID = gql`
  query GetPublicationsByOwnershipId($ownerships_id: bigint) {
    sh_publications(where: { ownerships_id: { _eq: $ownerships_id } }) {
      id
      title
      description
      datetime
      expiration_date
      price
      contact_phone
      contact_email
      publication_state
      ownerships_id
      created_at
      updated_at
    }
  }
`;

// get student by email
export const GET_STUDENT_BY_EMAIL = gql`
  query GetStudentByEmail($email: String) {
    sh_students(where: { person: { users: { email: { _eq: $email } } } }) {
      person {
        firstname
        lastname
        users {
          email
          password
        }
      }
    }
  }
`;
