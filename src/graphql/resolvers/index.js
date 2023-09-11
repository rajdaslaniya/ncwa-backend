import {
  assessmentDetailMutations,
  assessmentDetailQueries,
} from "./assessmentDetail";
import { courseMutations, courseQueries } from "./course";
import { groupMutations, groupQueries } from "./group";
import { userMutations, userQueries } from "./user";

const resolvers = {
  Query: {
    ...assessmentDetailQueries,
    ...courseQueries,
    ...groupQueries,
    ...userQueries
  },
  Mutation: {
    ...assessmentDetailMutations,
    ...courseMutations,
    ...groupMutations,
    ...userMutations
  },
};

export default resolvers;
