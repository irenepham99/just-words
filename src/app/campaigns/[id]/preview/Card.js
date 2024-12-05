import { Badge } from "../../../../components/ui/badge";
import { cn } from "../../../../lib/utils";

const Card = ({ recipient, setSelectedRecipient, selected }) => {
  return (
    <div
      onClick={() => setSelectedRecipient(recipient)}
      className={cn(
        "w-full grid grid-cols-1 gap-2 p-6 hover:bg-gray-100",
        selected ? "bg-gray-100" : ""
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
