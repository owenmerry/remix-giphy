import type { LoaderFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";

export const loader: LoaderFunction = async ({ request, context }) => {
  const url = new URL(request.url);
  const term = url.searchParams.get("term");

  const res = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${context.GIPHY_API_KEY}&q=${term}&limit=25&offset=0&rating=g&lang=en`
  );
  const gifs = await res.json();
  console.log("get gifs...", context.GIPHY_API_KEY);

  return json({
    term,
    gifs,
    gifkey: context.GIPHY_API_KEY,
  });
};

export default function ResultsPage() {
  const { term, gifs, gifkey } = useLoaderData<{
    term: string;
    gifkey: string;
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
      <h1>
        Results ({term}) ({gifkey})
      </h1>
      {gifs.data.map((gif) => (
        <span key={gif.id}>
          <iframe src={gif.embed_url} title="gif"></iframe>
        </span>
      ))}
    </div>
  );
}
