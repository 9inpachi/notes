const graphql = require('graphql');
const mongoose = require('mongoose');

const { Sport, Player } = require('../models');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLSchema, GraphQLInt } = graphql;

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
      args: {
        first: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const results = await Player.aggregate([
          {
            $match: {
              _id: mongoose.Types.ObjectId(parent.id)
            }
          },
          {
            $lookup: {
              from: 'sports',
              localField: 'sports',
              foreignField: '_id',
              as: 'sports_full'
            }
          },
          {
            $project: { sports_full: 1 }
          }
        ]).exec();
        let allSports = results[0].sports_full;
        allSports = allSports.map(sport => {
          sport.id = mongoose.Types.ObjectId(sport._id);
          delete sport._id;
          return sport;
        });
        return allSports;
      }
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
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        rules: { type: GraphQLList(GraphQLString) }
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
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        sports: { type: GraphQLList(GraphQLID) }
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
