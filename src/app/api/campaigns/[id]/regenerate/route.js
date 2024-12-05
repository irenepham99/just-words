import db from "../../../lib/db";

//need to get back recipient id and section id(s) to be regenerated, campaign id
export async function POST(req, { params }) {
  const body = await req.json();
  const { id } = await params; //campaign_id
  const recipient_id = body.recipient_id;
  const section_ids = body.section_ids;

  const campaign = db.campaigns.find((campaign) => campaign.campaign_id == id);
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

const messageBank = [
  "Find friends who share your love for art, crafts, and creativity.",
  "Build connections as strong as your passion for LEGO.",
  "Write your next chapter with friends who inspire your storytelling.",
  "From the court to the craft table, meet people who match your energy.",
  "Discover a community that loves reading as much as you do.",
  "Team up with eco-conscious friends making a difference together.",
  "Celebrate your passions in an LGBTQ-friendly community.",
  "Find basketball buddies who can discuss novels and environmental causes after the game.",
  "Connect over shared passions like crafting, writing, and standing up for the planet.",
  "Meet friends who love art, books, and building worlds—LEGO or otherwise!",
];
