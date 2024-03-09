import {
  Group,
  Header,
  Panel,
  View,
  SplitLayout,
  SplitCol,
  Cell,
} from "@vkontakte/vkui";
import GetFact from "@/features/get-fact";
import PredictAge from "@/features/predict-age";
import { useState } from "react";

export default function HomePage() {
  const [panel, setPanel] = useState("1");

  return (
    <SplitLayout>
      <SplitCol width={200} maxWidth={200} autoSpaced>
        <Panel>
          <Group>
            <Cell onClick={() => setPanel("1")}>Задание 1</Cell>
            <Cell onClick={() => setPanel("2")}>Задание 2</Cell>
          </Group>
        </Panel>
      </SplitCol>

      <SplitCol autoSpaced>
        <View activePanel={panel}>
          <Panel id="1">
            <Group>
              <Header>Задание 1</Header>
              <GetFact />
            </Group>
          </Panel>
          <Panel id="2">
            <Group>
              <Header>Задание 2</Header>
              <PredictAge />
            </Group>
          </Panel>
        </View>
      </SplitCol>
    </SplitLayout>
  );
}
