// /app/api/convert/route.js
import { NextResponse } from "next/server";
export async function POST(req) {
  const body = await req.json();
  const { videoId } = body;
  console.log(videoId, "This Is URL");
  if (!videoId) {
    return NextResponse.json(
      { message: "Please enter video URl", error: true },
      { status: 400 }
    );
  }
  try {
    const response = await fetch(
      `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();
    console.log("final link", data);

    if (data.status === "ok") {
      return NextResponse.json(
        {
          message: "success",
          error: false,
          song_title: data.title,
          final: data.link,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ final: data, error: true }, { status: 203 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: true, message: "Server error" },
      { status: 500 }
    );
  }
}
