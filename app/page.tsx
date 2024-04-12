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
        <div className="flex flex-col items-center h-full w-full justify-center bg-red-400">
            <img src={"/merlion.png"} alt="Merlion" className="mt-5 w-1/2 sm:w-1/4" /> {/* Resize the image */}
            <div className="text-center text-black">
                <p className="mt-5 text-xl font-bold">Leaderboard</p> {/* Make the text bold with font-bold */}
            </div>
            <table className="border-collapse border border-black mt-5 bg-white text-black text-lg"> {/* Adjust font size with text-lg */}
                <thead>
                    <tr className="bg-gray-200"> {/* Add custom class for the row containing headers */}
                        <th className="border border-black px-4 py-2">Rank</th>
                        <th className="border border-black px-4 py-2">User</th>
                        <th className="border border-black px-4 py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-black px-4 py-2">1</td>
                        <td className="border border-black px-4 py-2">Timothy</td>
                        <td className="border border-black px-4 py-2">10</td>
                    </tr>
                    {/* Add other rows here */}
                </tbody>
            </table>
        </div>
    );
}