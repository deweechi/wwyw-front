import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from "./styles/PaginationStyles";
import { perPage } from "../config";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection(where: { inventoryLevel_gt: 0 }) {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      if (!data.itemsConnection) return <p>No Items to Load, please add items.</p>
      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;

      return (
        <PaginationStyles>
            <Head>
                <title>
                    What Wood You Wish? | Page {page} of {pages}
                </title>
            </Head>
            <Link 
            prefetch 
            href={{
                pathname: 'items',
                query: { page: page-1}
            }}>
            <a className="prev" aria-disabled={page<=1}>&#171; Prev</a>
            </Link>
          <p>
            Viewing page {page} of {pages}
          </p>
          <p>
            {count} total items!
          </p>
          <Link 
            prefetch 
            href={{
                pathname: 'items',
                query: { page: page+1}
            }}>
            <a className="prev" aria-disabled={page>=pages}>Next &#187;</a>
            </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
