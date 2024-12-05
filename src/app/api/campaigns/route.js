import db, { recipients } from "../lib/db";

export async function POST(req) {
  const body = await req.json();
  const newCampaign = {
    campaign_id: db.campaigns.length,
    emails: recipients,
    ...body,
  };
  db.campaigns.push(newCampaign);
  console.log(db.campaigns.length, "campaigns.length");
  return new Response(JSON.stringify(newCampaign), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
