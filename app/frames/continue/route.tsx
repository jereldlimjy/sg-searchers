/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

const colourMapping: any = {
    tim: "bg-green-200",
    jereld: "bg-blue-200",
    kiasu: "bg-red-200",
    blur: "bg-yellow-200",
    atas: "bg-purple-200",
    shiok: "bg-pink-200",
    lepak: "bg-indigo-200",
    sabo: "bg-teal-200",
    hawker: "bg-orange-200",
    aiyah: "bg-lime-200",
    ahbeng: "bg-amber-200",
    sotong: "bg-cyan-200",
};

export const POST = frames(async (ctx: any) => {
    const { inputText, state } = ctx.message;
    const { username } = ctx.message.requesterUserData;
    const profileImage = ctx.message.requesterUserData?.profileImage ?? "";

    const ws = JSON.parse(state);

    const getCellColor = (x: number, y: number) => {
        for (const key of Object.keys(ws.words)) {
            if (ws.words[key].found) {
                for (let p of ws.words[key].path) {
                    if (p.x === x && p.y === y) {
                        return colourMapping[key];
                    }
                }
            }
        }
        return "bg-white"; // Default color
    };

    // if input text in word list, mark as found
    if (inputText in ws.words) {
        ws.words[inputText].found = true;
    }

    return {
        image: (
            <div tw="flex w-full h-full bg-red-400 justify-center items-center">
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
                            {ws.grid.map((row: string[], y: number) =>
                                row.map((cell, x) => (
                                    <div
                                        key={`${x}-${y}`}
                                        tw={`flex justify-center items-center ${getCellColor(
                                            x,
                                            y
                                        )}`}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    >
                                        {cell}
                                    </div>
                                ))
                            )}
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
            ...ws,
        },
        textInput: " Enter word:",
    };
});
