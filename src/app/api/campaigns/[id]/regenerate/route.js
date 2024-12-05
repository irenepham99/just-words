import db, { messageBank } from "../../../lib/db";

export async function POST(req, { params }) {
  const body = await req.json();
  const { id: campaign_id } = await params;
  const recipient_id = body.recipient_id;
  const section_ids = body.section_ids;

  const campaign = db.campaigns.find(
    (campaign) => campaign.campaign_id == campaign_id
  );
  const recipient = campaign.emails.find(
    (recipient) => recipient.id == recipient_id
  );

  recipient.email.forEach((section) => {
    console.log(section_ids, section.section_id);
    if (section_ids.includes(section.section_id)) {
      section.string =
        messageBank[Math.floor(Math.random() * messageBank.length)];
    }
  });
  console.log(recipient);

  return new Response(JSON.stringify(campaign), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
