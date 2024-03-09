import { useQuery } from "@tanstack/react-query";
import {
  Button,
  FormItem,
  FormLayoutGroup,
  Input,
  Spinner,
  Div,
} from "@vkontakte/vkui";
import fetchFact from "../api";

export default function GetFact() {
  const query = useQuery({
    queryKey: ["fact"],
    queryFn: fetchFact,
    enabled: false,
  });

  return (
    <FormLayoutGroup>
      <Button
        size="l"
        style={{ display: "block", marginInline: "auto" }}
        onClick={() => query.refetch()}
      >
        Получить факт
      </Button>
      {query.isFetching ? (
        <Div>
          <Spinner />
        </Div>
      ) : (
        <FormItem>
          <Input defaultValue={query.data} />
        </FormItem>
      )}
    </FormLayoutGroup>
  );
}
