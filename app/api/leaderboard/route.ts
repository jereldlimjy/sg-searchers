import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import lionCitySearchAbi from "../../assets/lionCitySearchAbi.json";
import * as dotenv from "dotenv";

dotenv.config();

const LION_CITY_SEARCH_CONTRACT_ADDRESS =
    "0x6144E026C9FD451876676a5925EeD220dbC240e0";

export async function GET(
    req: NextRequest,
    res: NextResponse<{ message: string }>
) {
    const provider = new ethers.JsonRpcProvider(process.env.BASE_RPC_URL ?? "");

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

    return NextResponse.json(scores.sort((a, b) => a.score - b.score));
}
