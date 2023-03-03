import { Button, Card, Divider, InputNumber, Row } from "antd";
import { useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Container from "../components/Container";
import { getRandomItemFromArray, shuffleArray } from "../utils/arrayTools";
import places from "../data/places";

function HomeView() {
  const [playersCount, setPlayersCount] = useState(5);
  const [spiesCount, setSpiesCount] = useState(1);
  const [game, setGame] = useState(false);

  const onPlayersInputChange = (value: number | null) => {
    if (value == null) return;
    setPlayersCount(value);
  };
  const onPlayersSpiesChange = (value: number | null) => {
    if (value == null) return;
    setSpiesCount(value);
  };

  const getLocation = (): string => {
    const usedLocations: Array<string> = JSON.parse(localStorage.getItem('usedLocations') as string) || []    
    const allowedLocations = Array.isArray(usedLocations) ? [...places.filter((n) => !usedLocations.includes(n))] : places;

    const currentLocation: string = getRandomItemFromArray(allowedLocations);

    localStorage.setItem('usedLocations', JSON.stringify([...usedLocations, currentLocation]))

    return currentLocation
  };

  const startGameClick = () => {
    // Generate players
    const normal = new Array(playersCount - spiesCount).fill("normal");
    const spies = new Array(spiesCount).fill("spy");
    const players = shuffleArray([...normal, ...spies]);
    console.log(playersCount, spiesCount, players);

    // Get Location
    const location = getLocation()
    console.log({location})

    setGame(true);
  }

  return (
    <Container>
    {!game && <Card
        style={{ width: 300 }}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Divider>Number of players</Divider>
        <Row justify={"center"}>
          <InputNumber
            size="large"
            min={1}
            max={100}
            defaultValue={5}
            onChange={onPlayersInputChange}
          />
        </Row>

        <Divider>Number of spies</Divider>
        <Row justify={"center"}>
          <InputNumber
            size="large"
            min={1}
            max={100}
            defaultValue={1}
            onChange={onPlayersSpiesChange}
          />
        </Row>

        <Divider></Divider>
        <Button type="primary" block onClick={startGameClick}>
          Start Game
        </Button>
       
      </Card>}
      {/* {!game && (
        <CardContainer>
          <Title>Spy Game</Title>
          <InputContainer>
            <InputLabel>Number of players</InputLabel>
            <Input value={players} onChange={handlePlayersInput} />
          </InputContainer>
          <InputContainer>
            <InputLabel>Number of spies</InputLabel>
            <Input value={spies} onChange={handleSpiesInput} />
          </InputContainer>
          <Button onClick={startShuffleCards}>Start a game</Button>
        </CardContainer>
      )}
      {game && cards.length !== currentCard - 1 && (
        <CardContainer>
          {!openedCard ? (
            <Title onClick={showCard}>Press to open card</Title>
          ) : (
            <Title onClick={closeCard}>Press to close card</Title>
          )}
          {openedCard && <Title>{cards[currentCard]}</Title>}
        </CardContainer>
      )}
     */}
    </Container>
  );
}

export default HomeView;
