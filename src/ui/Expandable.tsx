import { type ReactNode, useId, useState } from "react";
import { Button } from "./Button";
import { Stack } from "./Stack";

type ExpandableProps = {
  details: ReactNode;
  label: string;
  summary: ReactNode;
};

export function Expandable({ details, label, summary }: ExpandableProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <Stack gap="medium">
      {summary}
      <div className="ui-expandable__details" hidden={!expanded} id={detailsId}>
        {details}
      </div>
      <div className="ui-expandable__control">
        <Button
          controls={detailsId}
          expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? `Hide details for ${label}` : `Show details for ${label}`}
        </Button>
      </div>
    </Stack>
  );
}
