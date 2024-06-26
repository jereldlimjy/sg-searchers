import { fetchMetadata } from "frames.js/next";

export async function generateMetadata() {
    return {
        title: "Lion City Search",
        other: await fetchMetadata(
            new URL(
                "/frames",
                process.env.NODE_ENV === "production"
                    ? "https://sg-searchers.vercel.app"
                    : "http://localhost:3000"
            )
        ),
    };
}

const getLeaderboard = async () => {
    try {
        const response = await fetch(
            process.env.NODE_ENV === "production"
                ? "https://sg-searchers.vercel.app/api/leaderboard"
                : "http://localhost:3000/api/leaderboard",
            { cache: "no-store" }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export default async function Page() {
    const leaderboard = await getLeaderboard();

    return (
        <div className="flex flex-col items-center h-full w-full justify-center bg-red-400">
            <img
                src={"/merlion.png"}
                alt="merlion"
                className="mt-5 w-1/2 sm:w-1/4"
            />{" "}
            <div className="text-center text-black">
                <p className="mt-5 text-xl font-bold">Leaderboard</p>{" "}
            </div>
            <table className="border-collapse border border-black mt-5 bg-white text-black text-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-black px-4 py-2">Rank</th>
                        <th className="border border-black px-4 py-2">
                            User FID
                        </th>
                        <th className="border border-black px-4 py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((obj: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td className="border border-black px-4 py-2">
                                    {index + 1}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    {obj.fid}
                                </td>
                                <td className="border border-black px-4 py-2">
                                    {obj.score}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
