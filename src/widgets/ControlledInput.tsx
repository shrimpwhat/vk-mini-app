import { Input } from "@vkontakte/vkui";
import { UseControllerProps, useController, Control } from "react-hook-form";

type Props = UseControllerProps<Control<{ name: string }, never>>;

export default function ControlledInput(props: Props) {
  const { field } = useController(props);

  return (
    <Input
      placeholder="Введите имя"
      id="name"
      getRef={field.ref}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
    />
  );
}
