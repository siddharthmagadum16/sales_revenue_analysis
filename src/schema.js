import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  type ProductOrderInfo {
    productId: ID!
    quantity: Int!
    priceAtPurchase: Float!
  }

  type Customer {
    id: ID!
    name: String!
    email: String!
    location: String!
    gender: String!
  }
  type Order {
    id: ID!
    customerId: ID!
    products: [ProductOrderInfo]
    totalAmount: Float!
    orderDate: Date!
    status: String!
  }
  type Product {
    id: ID!
    name: String!
    category: String!
    price: Float!
    stock: Int!
  }

  type CustomerSpending {
    customerId: ID
    totalSpent: Float
    averageOrderValue: Float
    lastOrderDate: Date
  }
  type TopProduct {
    productId: ID
    name: String
    totalSold: Int
  }
  type CategorySales {
    category: String
    revenue: Float
  }
  type SalesAnalytics {
    totalRevenue: Float
    completedOrders: Int
    categoryBreakdown: [CategorySales]
  }

  type Query {
    getCustomerSpending(customerId: ID!): CustomerSpending
    getTopSellingProducts(limit: Int): [TopProduct]
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
  }

`

export default typeDefs;