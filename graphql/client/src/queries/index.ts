import { gql } from '@apollo/client';

const getAllSportsQuery = gql`
{
  sports {
    name
    type
    rules
  }
}
`;

const getSportQuery = gql`
query GetSport($id: ID) {
  sport(id: $id) {
    name
    type
    rules
  }
}
`;

const getAllPlayersQuery = gql`
{
  players {
    name
    gender
    sports {
      name
      type
    }
  }
}
`;

const getPlayerQuery = gql`
query GetPlayer($id: ID) {
  player(id: $id) {
    name
    gender
    sports {
      name
      type
    }
  }
}
`;

export {
  getAllSportsQuery,
  getSportQuery,
  getAllPlayersQuery,
  getPlayerQuery
};
