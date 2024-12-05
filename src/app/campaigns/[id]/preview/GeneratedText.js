import { Button } from "../../../../components/ui/button";
import { RefreshCw } from "lucide-react";

const GeneratedText = ({ section, regenerateSection }) => {
  return (
    <div className="flex gap-2 p-2 m-2 items-center">
      {section.string}
      <Button
        onClick={() => regenerateSection([section.section_id])}
        variant="outline"
        size="icon"
      >
        <RefreshCw />
      </Button>
    </div>
  );
};

export default GeneratedText;
