import { gql, GraphQLClient } from 'graphql-request';

export default async function getData() {
    const query = gql`
        query {
            allProducts {
                id
                title
                titlePt
                description
                descriptionPt
                price
                rating
                picturewebp {
                    url
                }
                picture {
                    url
                }
                onsale
            }
        }
    `;

    const endpoint = 'https://graphql.datocms.com/';
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer f46ee2ea99fe2c706e118c9d0afd30',
        },
    });
    const products = await graphQLClient.request(query);
    return products;
}
