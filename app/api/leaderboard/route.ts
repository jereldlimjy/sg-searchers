import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import lionCitySearchAbi from "../../assets/lionCitySearchAbi.json";

const LION_CITY_SEARCH_CONTRACT_ADDRESS =
    "0x6144E026C9FD451876676a5925EeD220dbC240e0";

export async function GET(
    req: NextRequest,
    res: NextResponse<{ message: string }>
) {
    const provider = new ethers.JsonRpcProvider(
        "https://base-mainnet.g.alchemy.com/v2/L1LmC3DEmPXx_Bj0gHEN_e6ogJpayQ7D" ??
            ""
    );

    const lionCitySearchContract = new ethers.Contract(
        LION_CITY_SEARCH_CONTRACT_ADDRESS,
        lionCitySearchAbi,
        provider
    ) as any;

    const fids = await lionCitySearchContract.getfids();

    let scores = [];

    for (const fid of fids) {
        const score = await lionCitySearchContract.getScore(fid);
        scores.push({ fid: Number(fid), score: Number(score) });
    }

    return NextResponse.json(scores.sort((a, b) => b.score - a.score));
}
