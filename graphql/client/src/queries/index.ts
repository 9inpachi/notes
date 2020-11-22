import { gql } from '@apollo/client';

const getAllSportsQuery = gql`
{
  sports {
    id
    name
    type
    rules
  }
}
`;

const getSportQuery = gql`
query GetSport($id: ID) {
  sport(id: $id) {
    id
    name
    type
    rules
  }
}
`;

const addSportQuery = gql`
mutation AddSport($name: String!, $type: String!, $rules: [String!]) {
  addSport(name: $name, type: $type, rules: $rules) {
    id
    name
  }
}
`;

const getAllPlayersQuery = gql`
{
  players {
    id
    name
    gender
    sports {
      id
      name
      type
    }
  }
}
`;

const getPlayerQuery = gql`
query GetPlayer($id: ID) {
  player(id: $id) {
    id
    name
    gender
    sports {
      id
      name
      type
    }
  }
}
`;

const addPlayerQuery = gql`
mutation AddPlayer($name: String!, $gender: String!, $sports: [ID]) {
  addPlayer(name: $name, gender: $gender, sports: $sports) {
    id
    name
  }
}
`;

export {
  getAllSportsQuery,
  getSportQuery,
  addSportQuery,
  getAllPlayersQuery,
  getPlayerQuery,
  addPlayerQuery
};
