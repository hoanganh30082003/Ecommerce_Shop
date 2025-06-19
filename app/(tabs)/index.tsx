import styled from 'styled-components/native';


const Container = styled.View`
  width: 500px;
  height: 1000px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: papayawhip;
`;

const StyledText = styled.Text`
  font-size: 24px;
  color: palevioletred;
`;

export default function HomeScreen() {
  return (
    <Container>
      <StyledText>Hello styled-components!</StyledText>
    </Container>

  );
}


