import { NextResponse } from "next/server";
import { fetchGitHubProfile, fetchGitHubRepositories } from "../../../lib/github";

export async function GET() {
  const username = "dungta1610";
  try {
    const [profile, repos] = await Promise.all([
      fetchGitHubProfile(username),
      fetchGitHubRepositories(username)
    ]);

    return NextResponse.json({
      profile,
      repos
    });
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}
