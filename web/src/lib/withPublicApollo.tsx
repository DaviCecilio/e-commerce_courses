import { GetServerSidePropsContext, NextPage } from "next"
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"

export type ApolloClientContext = GetServerSidePropsContext

/**
 * HOC => HIGH ORDER COMPONENT
 * Componente que recebe outro componente
 * */

export const withPublicApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    )
  }
}

export function getApolloClient(
  ctx?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) {
  const httpLink = createHttpLink({
    uri: "http://localhost:3332/graphql",
    fetch,
  })

  // Poderia realizar cache em LocalStorage, Redis (Back-end), ...
  const cache = new InMemoryCache().restore(ssrCache ?? {})

  return new ApolloClient({
    link: from([httpLink]),
    cache,
  })
}
