import { useQuery } from "@tanstack/react-query";
import fetchPredictedAge from "../api";
import { Button, FormItem, FormLayoutGroup } from "@vkontakte/vkui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledInput from "@/widgets/ControlledInput";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z]+$/, "Имя может состоять только из латинских букв")
    .required(),
});

export default function PredictAge() {
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
  });

  const query = useQuery({
    queryKey: ["age"],
    queryFn: () => fetchPredictedAge,
    enabled: false,
  });

  return (
    <FormLayoutGroup mode="horizontal">
      <FormItem htmlFor="name">
        <ControlledInput />
      </FormItem>

      <Button type="submit" size="l" style={{ marginLeft: "10px" }}>
        Узнать возраст
      </Button>
    </FormLayoutGroup>
  );
}
