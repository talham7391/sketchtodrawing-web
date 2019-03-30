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
  
`;

export const Banner = styled.div`
  display: flex;
  justify-content: center;
  padding: 60px 0px;
  background: rgb(210,210,210);
  background: linear-gradient(6deg, rgba(210,210,210,1) 0%, rgba(255,255,255,1) 100%);

  @media (min-width: 768px) {
    padding: 90px 0px;
  }
  
  @media (min-width: 1024px) {
    padding: 100px 0px;
  }

  h1 {
    font-family: WhiteAngelica;
    font-size: 50px;
    text-align: center;
    
    @media (min-width: 768px) {
      font-size: 60px;
    }
    
    @media (min-width: 1024px) {
      font-size: 80px;
    }
  }

  h3 {
    font-size: 18px;
    text-align: center;
    font-weight: 100;
    margin-top: 40px;

    @media (min-width: 1024px) {
      font-size: 22px;
      margin-top: 55px;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 0px 20px;
`;

export const MainImage = styled.img`
  width: 100%;
  margin-top: 54px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 20px;

  @media (min-width: 768px) {
    margin-top: 60px;
  }

  @media (min-width: 1024px) {
    margin-top: 66px;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  @media (min-width: 768px) {
    margin-top: 50px;
  }
`;