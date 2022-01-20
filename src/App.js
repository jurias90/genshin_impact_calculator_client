import React, { useState } from "react";
import styled from "@emotion/styled";
import image from "./assets/backgroundScaled.jpg";
import { SelectedCharacterProvider } from "./context/selectedCharacterContext";
import { Characters } from "./components/Characters";
import { Welcome } from "./components/Welcome";
import { Selection } from "./components/Selection";

const Background = styled.div({
  backgroundImage: `url(${image})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
});

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState([]);

  const updateSelectedCharacters = (action, c) => {
    c = c ?? [];
    let tempArray = [...selectedCharacter];
    if (action === "add" && !tempArray.some((character) => character === c)) {
      tempArray.push(c);
      setSelectedCharacter(tempArray);
    }

    if (action === "delete") {
      setSelectedCharacter(tempArray.filter((character) => character !== c));
    }
    if (action === "deleteAll") {
      setSelectedCharacter(c);
    }
  };

  return (
    <SelectedCharacterProvider value={selectedCharacter}>
      <Background>
        <Welcome />
        <Characters updateSelectedCharacter={updateSelectedCharacters} />
        <Selection updateSelectedCharacter={updateSelectedCharacters} />
      </Background>
    </SelectedCharacterProvider>
  );
}

export default App;
