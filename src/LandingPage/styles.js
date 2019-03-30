import styled from 'styled-components';

const _ = `
@media (min-width: 375px) {
      
}

@media (min-width: 768px) {
  font-size: 60px;
}

@media (min-width: 1024px) {
  font-size: 80px;
}
`

export const LandingPage = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0px 20px;

  h1 {
    font-family: WhiteAngelica;
    font-size: 50px;
    text-align: center;
    margin-top: 60px;
    
    @media (min-width: 768px) {
      font-size: 60px;
      margin-top: 90px;
    }
    
    @media (min-width: 1024px) {
      font-size: 80px;
      margin-top: 100px;
    }
  }

  h3 {
    font-size: 18px;
    text-align: center;
    font-weight: 100;
    margin-top: 40px;

    @media (min-width: 1024px) {
      font-size: 22px;
      margin-top: 50px;
    }
  }
`;

export const MainImage = styled.img`
  width: 100%;
  margin-top: 40px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);

  @media (min-width: 768px) {
    margin-top: 60px;
  }

  @media (min-width: 1024px) {
    margin-top: 75px;
  }
`;