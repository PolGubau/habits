import Link from "next/link";
import React, { useEffect } from "react";
import LayoutPage from "src/Layouts/Layout";
import styled from "styled-components";
const HeroStyled = styled.main`
  header {
    margin: 20px;
    h1 {
      font-size: 2em;
    }
  }
  section {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    gap: 20px;

    article {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      border-radius: 30px;
      width: 100%;
      max-width: 400px;
      background-color: blue;
      aspect-ratio: 1/1;
      :first-of-type {
        background-color: #ffadf3;
      }
      :nth-of-type(2) {
        background-color: #ade4ff;
      }
    }
  }
`;
const Hero = () => {
  return (
    <LayoutPage>
      <HeroStyled>
        <section>
          <Link href={"./expenses"}>
            <article>
              <h2>Expenses</h2>
            </article>
          </Link>
        </section>
      </HeroStyled>
    </LayoutPage>
  );
};

export default Hero;
