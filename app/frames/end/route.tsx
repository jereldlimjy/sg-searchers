/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx: any) => {
    const { state } = ctx.message;
    const { username } = ctx.message.requesterUserData;
    const profileImage = ctx.message.requesterUserData?.profileImage ?? "";

    if (ctx.message?.transactionId) {
        return {
            image: (
                <div tw="flex flex-col w-full h-full bg-red-400 items-center">
                    <span tw="text-green-800 mt-20">
                        Successfully submitted your score!
                    </span>
                    <span tw="text-white text-4xl mt-10">
                        Hope you enjoyed our game! {":)"}
                    </span>
                    <span tw="text-white text-4xl mt-10">
                        To learn more Singlish words, click on the button below!
                    </span>

                    <span tw="text-3xl mt-20">
                        Created by: @jereld and @datikoyeo
                    </span>
                </div>
            ),
            buttons: [
                <Button
                    action="link"
                    target={
                        process.env.NODE_ENV === "production"
                            ? "https://sg-searchers.vercel.app"
                            : process.env.NODE_ENV === "development"
                            ? "https://sg-searchers-dev.vercel.app"
                            : "http://localhost:3000"
                    }
                >
                    View Leaderboard
                </Button>,
                <Button action="post" target="/game">
                    Play Again!
                </Button>,
                <Button
                    action="link"
                    target="https://thehoneycombers.com/singapore/singlish-101/"
                >
                    Learn More
                </Button>,
            ],
        };
    } else {
        const ws = JSON.parse(state);

        const foundWords: any[] = Object.values(ws.words).filter(
            (word: any) => word.found === true
        );

        return {
            image: (
                <div tw="flex flex-col w-full h-full bg-red-400 items-center">
                    <div tw="flex absolute left-4">
                        <div tw="flex flex-col items-center mt-4">
                            <img
                                src={profileImage}
                                height="120px"
                                width="120px"
                            />
                            <span tw="mt-1 text-3xl text-white">
                                {username}
                            </span>
                        </div>
                    </div>

                    <span tw="text-gray-700 mt-10 mb-5 text-7xl">
                        Score: {foundWords.length}
                    </span>
                    <span tw="mt-4 text-white mt-4">Words found:</span>
                    <div
                        tw={`flex flex-wrap w-2/3 ${
                            foundWords.length <= 2 && "justify-center"
                        }`}
                    >
                        {foundWords.map((wordObj, index) => {
                            return (
                                <div
                                    key={index}
                                    tw="flex text-white text-3xl mt-2 p-2 w-1/3 justify-center"
                                >
                                    {index + 1}. {wordObj.word}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ),
            buttons: [
                <Button action="tx" target="/txdata/publish" post_url={"/end"}>
                    Publish to Leaderboard
                </Button>,
                <Button action="post" target="/game">
                    Try Again
                </Button>,
            ],
            state: {
                score: foundWords.length,
            },
        };
    }
});
