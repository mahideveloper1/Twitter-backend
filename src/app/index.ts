import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { PrismaClient } from '@prisma/client';
import bodyParser  from 'body-parser';
import express from 'express';
import { prismaClient } from '../clients/db';
import { User } from './user';
import { Tweet } from './tweet';
import cors from 'cors'
import {GraphQLContext} from './interfaces'
import JWTService from '../services/jwt';
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';


export   async function initServer(){
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
   

    const server = new ApolloServer<GraphQLContext>({
        typeDefs:`
          ${User.types}
          ${Tweet.types}
        
         type Query {
        ${User.queries}
        ${Tweet.queries}
        
       
      }
    
        
        type Mutation{
          ${Tweet.mutations},
          ${User.mutations}
        }
        `,
        resolvers:{
          Query:{
           ...User.resolvers.queries,
           ...Tweet.resolvers.queries
          },
          Mutation:{
            ...Tweet.resolvers.mutations,
            ...User.resolvers.mutations
            

          },
          ...Tweet.resolvers.extraResolvers,
          ...User.resolvers.extraResolvers
        },
        introspection: true,
        plugins: [
          // Use the same landing page plugin for both production and non-production environments
          ApolloServerPluginLandingPageLocalDefault({ footer: false }),
        ],
      });
      await server.start();

      app.use('/graphql', expressMiddleware(server,{
        context:async({req,res})=>{
         
          return { user:req.headers.authorization ?JWTService.decodeToken(req.headers.authorization.split("Bearer ")[1]):undefined}
          
          

        }
      }));
      return app;

}




