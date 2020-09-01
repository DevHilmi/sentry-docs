import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";

import SmartLink from "./smartLink";
import { sortPages } from "~src/utils";

const query = graphql`
  query PageGridQuery {
    allSitePage {
      nodes {
        path
        context {
          description
          title
          sidebar_order
        }
      }
    }
  }
`;

type Node = {
  path: string;
  context: {
    title?: string;
    description?: string;
  };
};

export default (): JSX.Element => {
  const data = useStaticQuery(query);
  const location = useLocation();

  const currentPath = location.pathname;
  const currentPathLen = currentPath.length;

  let matches = sortPages(
    data.allSitePage.nodes.filter(
      n =>
        n.context.title &&
        n.path !== currentPath &&
        n.path.indexOf(currentPath) === 0
    )
  );

  return (
    <ul>
      {matches.map(n => (
        <li key={n.path} style={{ marginBottom: "1rem" }}>
          <h4 style={{ marginBottom: 0 }}>
            <SmartLink to={n.path}>{n.context.title}</SmartLink>
          </h4>
          {n.context.description ?? <p>{n.context.description}</p>}
        </li>
      ))}
    </ul>
  );
};
