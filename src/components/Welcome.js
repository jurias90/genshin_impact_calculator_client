import styled from "@emotion/styled";
import { fontSizing } from "../styles/fontSizing";
import { sizing } from "../styles/sizing";

const Container = styled.div({
  height: "30vh",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  alignItems: "center",
  justifyContent: "center",
  color: "#EBF3FF",
});

const WelcomeBanner = styled.p({
  ...fontSizing.t8xl,
  marginBottom: sizing["6"],
  textAlign: "center",
  fontFamily: "signikaB",
  textShadow: "-2px 0 #001229, 0 2px #001229, 2px 0 #001229, 0 -2px #001229",
});

const Description = styled.p({
  ...fontSizing.t6xl,
  textAlign: "center",
  fontFamily: "signikaSB",
  textShadow: "-2px 0 #001229, 0 2px #001229, 2px 0 #001229, 0 -2px #001229",
});

export const Welcome = () => {
  return (
    <Container>
      <div>
        <WelcomeBanner>Welcome to the Genshin Impact Calculator</WelcomeBanner>
        <Description>
          You can calculated amount of the items you need to ascended here.
        </Description>
      </div>
    </Container>
  );
};
