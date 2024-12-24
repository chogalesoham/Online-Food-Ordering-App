import { gql, request } from "graphql-request";
const MASTER_URL = process.env.NEXT_PUBLIC_BACKEDN_API_URL;

const GetCategory = async () => {
  const query = gql`
    query MyQuery {
      categories(first: 100) {
        id
        name
        slug
        icon {
          url
        }
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusiness = async (category) => {
  const query = gql`
    query GetBusiness {
      restaurants(where: { category_some: { slug: "${category}" } } first:100) {
        aboutUs
        address
        banner {
          url
        }
        category {
          name
        }
        id
        name
        restroType
        slug
        workingHours
        review {
        star
        }
      }
    }
  `;

  const variables = { category };

  try {
    const result = await request(MASTER_URL, query, variables);
    return result;
  } catch (error) {
    console.error("Error fetching business data:", error);
    throw error;
  }
};

const GetRestaurantDetails = async (restaurantId) => {
  const query = gql`
    query RestaurantDetails {
      restaurant(where: { id:"${restaurantId}" }) {
        aboutUs
        address
        banner {
          url
        }
        category {
          name
        }
        id
        name
        restroType
        workingHours
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
        review {
        star
        }
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const AddToCart = async (data) => {
  const query = gql`
  mutation AddToCart {
    createUserCart(
      data: {
        email: "${data.email}"
        price: ${data.price}
        productDescription: "${data.description}"
        productImage: "${data.productImage}"
        productName: "${data.productName}"
        restaurant: { connect: { id: "${data?.resId}" } }
      }
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
`;

  const result = await request(MASTER_URL, query);
  return result;
};

const GetUserCart = async (userEmail) => {
  const query = gql`
   query GetUserCard {
  userCarts(where: {email: "${userEmail}"}) {
    id
    price
    productDescription
    productImage
    productName
    restaurant {
    name
    banner {
      url
    }
    id
  }
  }
  
}
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const DeleteFromCart = async (id) => {
  const query = gql`
  mutation DisconnectRestaurantFromCartItem {
    updateUserCart(
      data: { restaurant: { disconnect: true } }
      where: { id: "${id}" }
    ) {
      id
    }
    publishManyUserCarts(to: PUBLISHED) {
      count
    }
  }
`;

  const result = await request(MASTER_URL, query);
  return result;
};

const RemoveCart = async (id) => {
  const query = gql`
    mutation DeleteCartItem {
      deleteUserCart(where: { id: "${id}" }) {
        id
      }
    }
  `;

  const result = await request(MASTER_URL, query);
  return result;
};

const AddNewReview = async (data) => {
  const query = gql`
    mutation AddNewReview {
      createReview(
        data: {
          email: "${data?.email}"
          profileImage: "${data?.profileImage}"
          reviewText: "${data?.reviewText}"
          star: ${data?.star}
          userName: "${data?.userName}"
          restaurant: { connect: { id: "${data?.resId}" } }
        }
      ) {
        id
      }
         publishManyReviews(to: PUBLISHED) {
        count
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const GetRestaurantsReviews = async (id) => {
  const query = gql`
query GetRestaurantReviews {
  reviews(
    where: {restaurant: {id: "${id}"}}
    orderBy: publishedAt_DESC
  ) {
    id
    profileImage
    publishedAt
    reviewText
    star
    userName
  }
}
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const CretaeNewOrder = async (data) => {
  const query = gql`
    mutation CreateNewOrder {
      createOrder(
        data: {
          email: "${data?.email}"
          orderAmount: ${data?.orderAmount}
          restaurantName: "${data?.restaurantName}"
          userName: "${data?.userName}"
          zipCode: "${data?.zipCode}"
          phone: "${data?.phone}"
          address: "${data?.address}"
        }
      ) {
        id
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const UpdateOrderToAddOrderItem = async (name, price, id, email) => {
  const query = gql`
    mutation UpdateOrderWithDetail {
      updateOrder(
        data: {
          orderDetail: {
            create: { OrderItem: { data: { name: "${name}", price: ${price} } } }
          }
        }
        where: { id: "${id}" }
      ) {
        id
      }
         publishManyOrders(to: PUBLISHED) {
        count
      }
    
       deleteManyUserCarts(where: {email: "${email}"}) {
       count
    
     }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

export default {
  GetCategory,
  GetBusiness,
  GetRestaurantDetails,
  AddToCart,
  GetUserCart,
  DeleteFromCart,
  RemoveCart,
  AddNewReview,
  GetRestaurantsReviews,
  CretaeNewOrder,
  UpdateOrderToAddOrderItem,
};
