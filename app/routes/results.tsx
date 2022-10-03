import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const term = url.searchParams.get("term");

  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=[add-your-api-key-here]&q=${term}&limit=25&offset=0&rating=g&lang=en`
  );
  const gifs = await res.json();

  return json({
    term,
    gifs,
  });
};

export default function ResultsPage() {
  const { term, gifs } = useLoaderData<{
    term: string;
    gifs: {
      data: {
        type: string;
        id: string;
        embed_url: string;
      }[];
    };
  }>();

  return (
    <div>
      <h1>Results ({term})</h1>
      {gifs.data.map((gif) => (
        <span key={gif.id}>
          <iframe src={gif.embed_url} title="gif"></iframe>
        </span>
      ))}
    </div>
  );
}
