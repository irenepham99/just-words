import { Badge } from "../../../../components/ui/badge";
import { cn } from "../../../../lib/utils";

const Card = ({ recipient, setSelectedRecipient, selected }) => {
  return (
    <div
      onClick={() => setSelectedRecipient(recipient)}
      className={cn(
        " rounded border bg-white w-full grid grid-cols-1 gap-2 my-2 p-6 hover:border-brandBlue hover:border-opacity-50 hover:border-2",
        selected ? "border-2 border-brandBlue border-opacity-50" : ""
      )}
    >
      <div className="font-semibold">{recipient && recipient.name}</div>
      <div className="flex gap-1">
        <Badge variant="secondary" className="bg-orange-100">
          {recipient && recipient.generation}
        </Badge>
        <Badge variant="secondary" className="bg-purple-100">
          {recipient && recipient.status}
        </Badge>
      </div>
      <div className="w-full">{recipient && recipient.info}</div>
    </div>
  );
};

export default Card;
