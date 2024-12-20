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

export default {
  GetCategory,
};
