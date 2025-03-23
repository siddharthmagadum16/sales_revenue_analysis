import DM from './models/index.js';

const resolvers = {
  Query: {
    getCustomerSpending: DM.getCustomerSpending,
    getTopSellingProducts: DM.getTopSellingProducts,
    getSalesAnalytics: DM.getSalesAnalytics
  }
};

export default resolvers;