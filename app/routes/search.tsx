import { Form } from "@remix-run/react";

export default function SearchPage() {
  return (
    <div>
      <h1>Search</h1>
      <Form action="/results">
        <label>Search</label>
        <input name="term" />
        <button>Search</button>
      </Form>
    </div>
  );
}
