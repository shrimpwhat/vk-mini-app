import { useQuery } from "@tanstack/react-query";
import fetchPredictedAge from "../api";
import {
  Button,
  Div,
  FormItem,
  FormLayoutGroup,
  FormStatus,
  Input,
  Text,
} from "@vkontakte/vkui";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Ref, useRef } from "react";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Это поле обязательно")
    .matches(/^[a-zA-Z]+$/, "Имя может состоять только из латинских букв"),
});

const transformRef = (field: { ref: Ref<HTMLInputElement> }) => {
  return { ...field, getRef: field.ref, ref: undefined };
};

export default function PredictAge() {
  const prevName = useRef("");

  const { register, handleSubmit, formState, control, setError } = useForm<{
    name: string;
  }>({
    resolver: yupResolver(schema),
  });
  const name = useWatch({ control, name: "name" });

  const query = useQuery({
    queryKey: ["age", name],
    queryFn: () => fetchPredictedAge(name),
    enabled: false,
  });

  const onSubmit = (data: { name: string }) => {
    if (data.name === prevName.current) {
      setError("name", { message: "Вы уже узнали свой возраст" });
      return;
    }
    prevName.current = data.name;
    query.refetch();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formState.errors.name && (
        <Div>
          <FormStatus mode="error">{formState.errors.name.message}</FormStatus>
        </Div>
      )}
      <FormLayoutGroup mode="horizontal">
        <FormItem htmlFor="name1">
          <Input
            {...transformRef(register("name"))}
            placeholder="Введите имя"
          />
        </FormItem>

        <Button type="submit" size="l" style={{ marginLeft: "10px" }}>
          Узнать возраст
        </Button>
      </FormLayoutGroup>
      {query.isSuccess && (
        <Div>
          <FormStatus mode="default">
            <Text>Ваш возраст: {query.data}</Text>
          </FormStatus>
        </Div>
      )}
    </form>
  );
}
