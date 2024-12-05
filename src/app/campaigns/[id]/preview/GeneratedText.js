import { Button } from "../../../../components/ui/button";
import { RefreshCw } from "lucide-react";
import { Spinner } from "../../../../components/ui/spinner";

const GeneratedText = ({ section, regenerateSection, loading }) => {
  return (
    <div className="flex gap-2 p-2 m-2 items-center">
      {section && section.string}
      <Button
        onClick={() => regenerateSection([section.section_id])}
        variant="outline"
        size="icon"
      >
        {loading ? (
          <Spinner size="sm" className="bg-black dark:bg-white" />
        ) : (
          <RefreshCw />
        )}
      </Button>
    </div>
  );
};

export default GeneratedText;
