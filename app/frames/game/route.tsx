/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

const getPuzzle = async () => {
    try {
        const response = await fetch(
            process.env.NODE_ENV === "production"
                ? "https://sg-searchers.vercel.app/api/puzzle"
                : "http://localhost:3000/api/puzzle",
            { cache: "no-cache" }
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

export const POST = frames(async (ctx: any) => {
    const ws = await getPuzzle();

    console.log(ws);
    const { username } = ctx.message.requesterUserData;
    const profileImage = ctx.message.requesterUserData?.profileImage ?? "";

    // convert words array into map
    const wordsMap: any = {};

    for (const wordObj of ws.data.words) {
        wordsMap[wordObj.word] = {
            word: wordObj.word,
            path: wordObj.path,
            found: false,
        };
    }

    ws.data.words = wordsMap;

    return {
        image: (
            <div tw="flex h-full w-full bg-red-400 justify-center items-center">
                <div tw="flex flex-col w-1/3 h-full justify-center items-center">
                    <div tw="flex flex-col items-center">
                        <img
                            src={profileImage}
                            height="120px"
                            width="120px"
                            alt="profile image"
                        />
                        <span tw="mt-1 text-3xl text-white">{username}</span>
                    </div>
                </div>
                <div tw="flex w-2/3">
                    <div tw="flex bg-white rounded-lg p-8">
                        <div tw="flex flex-wrap" style={{ width: "500px" }}>
                            {ws.data.grid
                                .flat()
                                .map((cell: string, index: number) => (
                                    <div
                                        key={index}
                                        tw="flex justify-center items-center"
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    >
                                        {cell}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        buttons: [
            <Button action="post" target="/continue">
                Submit
            </Button>,
            <Button action="post" target="/end">
                Give up liao
            </Button>,
        ],
        state: {
            ...ws.data,
        },
        textInput: " Enter word:",
    };
});
