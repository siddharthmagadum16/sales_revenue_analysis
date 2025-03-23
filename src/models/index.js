import OrdersDM from './orders/index.js';

const getCustomerSpending = async (_, params) => {
  try {
    return await OrdersDM.getCustomerSpending(params)
  } catch (err) {
    return err;
  }
}

const getTopSellingProducts = async (_, params) => {
  try {
    return await OrdersDM.getTopSellingProducts(params.limit);
  } catch (err) {
    return err;
  }
}

const getSalesAnalytics = async (_, params) => {
  try {
    return await OrdersDM.getSalesAnalytics(params.startDate, params.endDate);
  } catch (err) {
    return err;
  }
}

export default {
  getCustomerSpending,
  getTopSellingProducts,
  getSalesAnalytics,
}
