import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx: any) => {
    const { state } = ctx.message;
    const { username } = ctx.message.requesterUserData;
    const profileImage = ctx.message.requesterUserData?.profileImage ?? "";

    const ws = JSON.parse(state);

    const foundWords: any[] = Object.values(ws.words).filter(
        (word: any) => word.found === true
    );

    return {
        image: (
            <div tw="flex flex-col w-full h-full bg-red-400 items-center">
                <div tw="flex absolute left-4">
                    <div tw="flex flex-col items-center mt-4">
                        <img src={profileImage} height="120px" width="120px" />
                        <span tw="mt-1 text-3xl text-white">{username}</span>
                    </div>
                </div>

                <span tw="text-gray-700 mt-10 text-7xl">
                    Score: {foundWords.length}
                </span>
                <span tw="mt-4 text-white">Words found:</span>
                {foundWords.map((wordObj, index) => {
                    return (
                        <div tw="flex text-white text-3xl mt-2">
                            {index + 1}. {wordObj.word}
                        </div>
                    );
                })}
            </div>
        ),
        buttons: [
            <Button
                action="tx"
                target="/txdata/publish"
                post_url={"/tx-success"}
            >
                Publish to Leaderboard
            </Button>,
        ],
        state: {},
    };
});
