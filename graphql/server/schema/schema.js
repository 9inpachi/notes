const graphql = require('graphql');
const mongoose = require('mongoose');

const Sport = mongoose.model('Sport');
const Player = mongoose.model('Player');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema } = graphql;

const SportType = new GraphQLObjectType({
  name: 'Sport',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    rules: { type: GraphQLList(GraphQLString) }
  }
});

const PlayerType = new GraphQLObjectType({
  name: 'Player',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    sports: {
      type: GraphQLList(SportType),
      resolve: (parent, args) => Player.aggregate([
        {
          $lookup: {
            from: 'Sport',
            localField: 'sports',
            foreignField: '_id',
            as: 'sports'
          }
        }
      ])
    }
  }
});

const MasterQuery = new GraphQLObjectType({
  name: 'MasterQuery',
  fields: {
    sports: {
      type: GraphQLList(SportType),
      resolve: (parent, args) => Sport.find({})
    },
    players: {
      type: GraphQLList(PlayerType),
      resolve: (parent, args) => Player.find({})
    },
    sport: {
      type: SportType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Sport.findById(args.id)
    },
    player: {
      type: PlayerType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => Player.findById(args.id)
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSport: {
      type: SportType,
      args: {
        name: GraphQLString,
        type: GraphQLString,
        rules: GraphQLList(GraphQLString)
      },
      resolve: (parent, args) => {
        const sport = new Sport({
          name: args.name,
          type: args.type,
          rules: args.rules
        });
        return sport.save();
      }
    },
    addPlayer: {
      type: PlayerType,
      args: {
        name: GraphQLString,
        gender: GraphQLString,
        sports: GraphQLList(GraphQLID)
      },
      resolve: (parent, args) => {
        const player = new Player({
          name: args.name,
          gender: args.gender,
          sports: args.sports
        });
        return player.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: MasterQuery,
  mutation: Mutation
});
