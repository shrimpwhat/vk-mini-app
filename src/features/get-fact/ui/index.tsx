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

  const outputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (query.data && outputRef.current) {
      const index = query.data.indexOf(" ");
      outputRef.current.focus();
      outputRef.current.selectionStart = outputRef.current.selectionEnd =
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
          <Textarea defaultValue={query.data} getRef={outputRef} />
        </FormItem>
      )}
    </FormLayoutGroup>
  );
}
