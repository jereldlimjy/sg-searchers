import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
    return {
        title: "SG Searchers",
        other: await fetchMetadata(
            new URL(
                "/frames",
                process.env.VERCEL_URL
                    ? `https://{process.env.VERCEL_URL}`
                    : "http://localhost:3000"
            )
        ),
    };
}

export default function Page() {
    return (
        <div className="flex h-full w-full justify-center">
            <h1 className="mt-20">Welcome to SG searchers {":)"}</h1>
        </div>
    );
}
