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
      restaurants(where: { category_some: { slug: "${category}" } }) {
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

export default {
  GetCategory,
  GetBusiness,
};
