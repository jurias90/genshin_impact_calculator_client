import styled from "@emotion/styled";
import { sizing } from "../styles/sizing";
import { fontSizing } from "../styles/fontSizing";
import { useContext, useState } from "react";
import { SelectedCharacterContext } from "../context/selectedCharacterContext";

const Container = styled.div({
  height: "100vh",
  margin: "0 auto",
  maxWidth: "1080px",
});

const CardContainer = styled.div({
  margin: "0",
  display: "flex",
  flexFlow: "column wrap",
  height: "25%",
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

const ItemContainer = styled.div({
  margin: "0",
  display: "flex",
  flexFlow: "column wrap",
  height: "50%",
  overflowX: "scroll",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const Item = styled.div({
  border: "1px solid black",
  width: sizing["56"],
  height: sizing["16"],
  margin: sizing["3"],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#EBF3FF",
});

const ItemDescription = styled.p({
  ...fontSizing.lg,
  fontFamily: "signikaL",
});

export const Selection = ({ updateSelectedCharacter }) => {
  const selectedCharacters = useContext(SelectedCharacterContext);
  const [materials, setMaterials] = useState({});
  const [totalMats, setTotalMats] = useState({});

  const fetchMaterials = () => {
    if (selectedCharacters.length === 0) return;
    let ids = selectedCharacters.map((char) => char.id);
    fetch(
      "https://genshin-impact-calculator.herokuapp.com/characters/ascensions",
      {
        method: "POST",
        body: JSON.stringify({ ids }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        totalMaterials(data.data);
        setMaterials(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const totalMaterials = (data) => {
    let total = {};
    Object.keys(data).forEach((character) => {
      data[character].forEach((level) => {
        Object.keys(level.materials).forEach((material) => {
          if (material in total) {
            total[material] += parseInt(level.materials[material]);
            return;
          }
          total[material] = parseInt(level.materials[material]);
        });
      });
    });
    setTotalMats(total);
  };

  return (
    <Container>
      {selectedCharacters.length === 0 ? null : (
        <>
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
          {Object.keys(materials).length === 0 ||
          Object.keys(totalMats).length === 0 ? null : (
            <>
              <Description>Totals</Description>
              <ItemContainer>
                {Object.keys(totalMats).map((material) => (
                  <Item key={material}>
                    <ItemDescription>
                      {`${material} : ${totalMats[material]}`}{" "}
                    </ItemDescription>
                  </Item>
                ))}
              </ItemContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};
