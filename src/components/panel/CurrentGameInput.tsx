import React from "react";
import { Input, Button } from "semantic-ui-react";

interface CurrentGameInputProps {
  handleInput: (data: string) => void;
}

const CurrentGameInput = (props: CurrentGameInputProps) => {
  const { handleInput } = props;
  return (
    <React.Fragment>
      <Input
        focus
        action={
          <Button
            content="Set Game"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleInput(
                ((e.target as HTMLButtonElement)
                  .previousSibling! as HTMLInputElement).value
              )
            }
          />
        }
        placeholder={"Game"}
      />
    </React.Fragment>
  );
};

export default CurrentGameInput;
