import { type ReactNode, useId, useState } from "react";
import { Button } from "./Button";
import { Stack } from "./Stack";

type ExpandableProps = {
  details: ReactNode;
  label: string;
};

export function Expandable({ details, label }: ExpandableProps) {
  const [expanded, setExpanded] = useState(false);
  const detailsId = useId();

  return (
    <Stack gap="medium">
      <div className="ui-expandable__control">
        <Button
          controls={detailsId}
          expanded={expanded}
          label={
            expanded ? `Hide details for ${label}` : `Show details for ${label}`
          }
          onClick={() => setExpanded((current) => !current)}
        >
          Details
        </Button>
      </div>
      <div className="ui-expandable__details" hidden={!expanded} id={detailsId}>
        {details}
      </div>
    </Stack>
  );
}
