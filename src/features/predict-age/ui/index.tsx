import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchPredictedAge from "../api";
import {
  Button,
  Div,
  FormItem,
  FormLayoutGroup,
  FormStatus,
  Input,
  Spinner,
  Text,
} from "@vkontakte/vkui";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo } from "react";
import * as yup from "yup";
import { transformRef, debounce } from "../lib";

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required("Это поле обязательно")
      .matches(/^[a-zA-Z]+$/, "Имя может состоять только из латинских букв"),
  })
  .required();

export default function PredictAge() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setError,
  } = useForm<{
    name: string;
  }>({
    resolver: yupResolver(schema),
  });

  const name = useWatch({ control, name: "name" });

  const query = useQuery({
    queryKey: ["age", name],
    queryFn: ({ signal }) => fetchPredictedAge(name, signal),
    enabled: false,
  });
  const queryClient = useQueryClient();
  const haveName = useCallback(
    () => queryClient.getQueryData(["age", name]),
    [name]
  );

  const refetch = () => {
    handleChange.cancel();
    query.refetch();
  };

  const handleChange = useMemo(() => debounce(refetch, 3000), []);

  const handleClick = () => {
    if (haveName())
      setError("name", { type: "manual", message: "Введите новое имя" });
    else refetch();
  };

  useEffect(() => {
    handleChange.cancel();
    if (name) {
      handleSubmit(() => {
        if (haveName()) {
          setError("name", { type: "manual", message: "Введите новое имя" });
        } else handleChange();
      })();
    }
  }, [name, setError, haveName]);

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      {errors.name && (
        <Div>
          <FormStatus mode="error">{errors.name.message}</FormStatus>
        </Div>
      )}
      <FormLayoutGroup mode="horizontal">
        <FormItem htmlFor="name">
          <Input
            {...transformRef(
              register("name", {
                setValueAs: (v: string) => v.toLowerCase(),
              })
            )}
            id="name"
            placeholder="Введите имя"
          />
        </FormItem>

        <Button type="submit" size="l" style={{ marginLeft: "10px" }}>
          Узнать возраст
        </Button>
      </FormLayoutGroup>
      {query.isFetching && (
        <Div>
          <Spinner />
        </Div>
      )}
      {query.isSuccess && !query.isFetching && (
        <Div>
          <FormStatus mode="default">
            <Text>Ваш возраст: {query.data}</Text>
          </FormStatus>
        </Div>
      )}
    </form>
  );
}
