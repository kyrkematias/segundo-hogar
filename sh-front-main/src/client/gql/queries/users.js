import { gql } from "@apollo/client";

// get users
export const GET_USERS = gql`
  query GetUsers {
    sh_users {
      id
      email
      username
      persons_id
      user_status
    }
  }
`;

export const GET_STUDENT_USER_BY_ID = gql`
    query GetUserById($id: Int) {
      sh_users(where: {id: {_eq: $id}}) {
        id
        email
        username
        bio
        avatar
        person {
          firstname
          lastname
          gender
          students {
            career {
              name
              id
            }
            city {
              id
              name
              state_id
            }
            shared
            file_number
          }
        }
        user_category {
          id
          description
        }
      }
    }
`;

// get user by mail
export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String) {
    sh_users(where: {email: {_eq: $email}}) {
      username
    }
  }
`;

// get person id by user mail
export const GET_PERSON_ID_BY_USER_EMAIL = gql`
  query GetPersonIdByUserEmail($email: String) {
    sh_users(where: {email: {_eq: $email}}) {
      persons_id
    }
  }
`;

export const GET_STUDENT_ID_BY_USER_EMAIL = gql`
  query GetStudentIdByUserEmail($email: String) {
    sh_users(where: {email: {_eq: $email}}) {
      person {
        students {
          id
        }
      }
    }
  }
`;

// get if user is enabled
export const GET_USER_STATUS_BY_EMAIL = gql`
  query GetUserStatusByEmail($email: String) {
    sh_users(where: {email: {_eq: $email}}) {
      user_status
    }
  }
`;

export const GET_OWNER_BY_ID = gql`
query GetOwnerById($id: Int) {
  sh_users(where: {id: {_eq: $id}}) {
    person {
      owners {
        id
      }
    }
  }
}
`;

export const GET_SN_VALIDATION = gql`
  query GetSnValidation {
    sh_users {
      created_with_sn
    }
  }
`;