import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div data-search-box>
      <h1>Welcome to Search App</h1>
      <Link to="/search">Search</Link>
    </div>
  );
}
