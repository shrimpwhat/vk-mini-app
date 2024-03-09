import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FormItem,
  FormLayoutGroup,
  Spinner,
  Div,
  Textarea,
} from "@vkontakte/vkui";
import fetchFact from "../api";
import { useEffect, useRef } from "react";

export default function GetFact() {
  const query = useQuery({
    queryKey: ["fact"],
    queryFn: fetchFact,
    enabled: false,
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (query.data && inputRef.current) {
      const index = query.data.indexOf(" ");
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.selectionEnd =
        index !== undefined && index !== -1 ? index : query.data.length;
    }
  }, [query.data]);

  return (
    <FormLayoutGroup>
      <Button
        size="l"
        style={{ display: "block", marginInline: "auto" }}
        onClick={() => query.refetch()}
        disabled={query.isFetching}
      >
        Получить факт
      </Button>
      {query.isFetching ? (
        <Div>
          <Spinner />
        </Div>
      ) : (
        <FormItem>
          <Textarea defaultValue={query.data} getRef={inputRef} />
        </FormItem>
      )}
    </FormLayoutGroup>
  );
}
