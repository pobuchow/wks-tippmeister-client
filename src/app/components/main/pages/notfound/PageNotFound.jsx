import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <div className="page">
    <div className="page-body-md">
      <div className="page-body-label">404 - page not found</div>
      <Link className="link" to="/">back to login page</Link>
    </div>
  </div>
);

export default PageNotFound;
