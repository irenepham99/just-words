import db from "../../lib/db";

export async function GET(req, { params }) {
  const { id } = await params;

  console.log("CAMPAIGNS", db);

  const campaign = db.campaigns.find((c) => c.campaign_id == Number(id));

  if (!campaign) {
    return new Response(JSON.stringify({ error: "Campaign not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(campaign), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
