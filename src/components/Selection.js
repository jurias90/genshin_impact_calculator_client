import styled from "@emotion/styled";
import { sizing } from "../styles/sizing";
import { fontSizing } from "../styles/fontSizing";
import { useContext, useState } from "react";
import { SelectedCharacterContext } from "../context/selectedCharacterContext";

const Container = styled.div({
  height: "50vh",
  margin: "0 auto",
  maxWidth: "1080px",
});

const CardContainer = styled.div({
  margin: "0",
  display: "flex",
  flexFlow: "column wrap",
  height: "40%",
  overflowX: "scroll",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const Card = styled.div({
  border: "1px solid black",
  width: sizing["32"],
  height: sizing["44"],
  margin: `${sizing["3"]} ${sizing["3"]}`,
  backgroundColor: "#EBF3FF",
  boxShadow: "10px 5px 5px rgba(0,0,0,.5)",
  ":active": {
    boxShadow: "inset 0px 0px 5px rgba(0,0,0,.5)",
  },
});

const Name = styled.div({
  ...fontSizing.xl,
  textAlign: "center",
  fontFamily: "signikaL",
});

const TextContainer = styled.div({
  margin: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Description = styled.p({
  ...fontSizing.t4xl,
  textAlign: "center",
  fontFamily: "signikaSB",
  textShadow: "-2px 0 #001229, 0 2px #001229, 2px 0 #001229, 0 -2px #001229",
  color: "#EBF3FF",
});

const Buttons = styled.div({});

const GetButton = styled.button({
  backgroundColor: "#EBF3FF",
  border: "1px solid black",
  padding: `${sizing[3]} ${sizing[3]}`,
  boxShadow: "10px 5px 5px rgba(0,0,0,.5)",
  ":active": {
    boxShadow: "inset 0px 0px 5px rgba(0,0,0,.5)",
  },
  marginRight: sizing[3],
});

export const Selection = ({ updateSelectedCharacter }) => {
  const selectedCharacters = useContext(SelectedCharacterContext);
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = () => {
    if (selectedCharacters.length === 0) return;
    let ids = selectedCharacters.map((char) => char.id);
    fetch("http://localhost:80/characters/ascensions", {
      method: "POST",
      body: JSON.stringify({ ids }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data.rows);
      });
  };

  return (
    <Container>
      <TextContainer>
        <Description>Selected Characters:</Description>
      </TextContainer>
      <CardContainer>
        {selectedCharacters.map((character) => (
          <Card
            key={character.id}
            onClick={() => updateSelectedCharacter("delete", character)}
          >
            <img src={character.avatarurl} alt={character.name} />
            <Name>{character.name}</Name>
          </Card>
        ))}
      </CardContainer>
      <Buttons>
        <GetButton
          disabled={selectedCharacters.length === 0}
          onClick={() => fetchMaterials()}
        >
          Get Materials!
        </GetButton>
        <GetButton
          onClick={() => updateSelectedCharacter("deleteAll")}
          disabled={selectedCharacters.length === 0}
        >
          Delete All From List
        </GetButton>
      </Buttons>
      {materials.length === 0 ? null : <>Hello darkness my old friend!</>}
    </Container>
  );
};
