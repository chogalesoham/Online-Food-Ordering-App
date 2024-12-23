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

export default {
  GetCategory,
  GetBusiness,
  GetRestaurantDetails,
  AddToCart,
  GetUserCart,
  DeleteFromCart,
  RemoveCart,
};
