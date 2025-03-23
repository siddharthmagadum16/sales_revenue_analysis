import OrderDAO from "./order.schema.js";

const getCustomerSpending = async (params) => {
  const customerId = params.customerId;
  const customerSpendingData = await OrderDAO.aggregate([
    { $match: { customerId } },
    {
      $group: {
        _id: "$customerId",
        totalSpent: {
          $sum: {
            $cond: [{ $eq: ["$status", "completed"] }, "$totalAmount", 0]
          }
        },
        averageOrderValue: {
          $avg: {
            $cond: [{ $eq: ["$status", "completed"] }, "$totalAmount", null]
          }
        },
        lastOrderDate: { $max: "$orderDate" }
      }
    },
    {
      $project: {
        customerId: '$_id',
        totalSpent: 1,
        averageOrderValue: 1,
        lastOrderDate: { $toDate: '$lastOrderDate' }
      }
    }
  ]);
  return customerSpendingData[0];
}

const getTopSellingProducts = async (limit) => {
  const topSellingProducts = await OrderDAO.aggregate([
    { $unwind: '$products' },
    {
      $lookup: {
        from: 'products',
        localField: 'products.productId',
        foreignField: 'id',
        as: 'productInfo',
      }
    },
    {
      $unwind: '$productInfo'
    },
    {
      $group: {
        _id: '$products.productId',
        totalSold: { $sum: '$products.quantity' },
        name: { $first: '$productInfo.name' }
      }
    },
    {
      $sort: {
        totalSold: -1
      }
    },
    {
      $limit: limit
    },
    {
      $project: {
        productId: '$_id',
        name: 1,
        totalSold: 1,
        _id: 0,
      }
    }
  ]);
  return topSellingProducts;
}

const getSalesAnalytics = async (startDate, endDate) => {

  const salesAnalytics = await OrderDAO.aggregate([
    { $match: { status: 'completed', orderDate: { $gte: new Date(startDate), $lt: new Date(endDate) } } },
    {
      $facet: {
        categoryBreakdown: [
          { $unwind: '$products' },
          {
            $lookup: {
              from: 'products',
              localField: 'products.productId',
              foreignField: 'id',
              as: "productOrders"
            }
          },
          { $unwind: '$productOrders' },
          {
            $group: {
              _id: '$productOrders.category',
              revenue: {
                $sum: { $multiply: ['$products.quantity', '$products.priceAtPurchase'] }
              }
            }
          },
          {
            $project: {
              category: '$_id',
              revenue: 1,
              _id: 0
            }
          }
        ],
        totalRevenue: [
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: '$totalAmount' }
            }
          }
        ],
        orderCount: [
          { $count: "completedOrderCount" }
        ]
      }
    },
    {
      $project: {
        totalRevenue: { $arrayElemAt: ["$totalRevenue.totalRevenue", 0] },
        categoryBreakdown: "$categoryBreakdown",
        completedOrders: { $arrayElemAt: ["$orderCount.completedOrderCount", 0] }
      }
    }
  ]);
  return salesAnalytics[0];
}


export default {
  getCustomerSpending,
  getTopSellingProducts,
  getSalesAnalytics
}