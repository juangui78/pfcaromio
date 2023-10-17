import styled from 'styled-components';
import { Link } from 'react-router-dom';

import pizza1 from '../../assets/images/p1.jpg'
import pizza2 from '../../assets/images/p2.jpg'
import pizza3 from '../../assets/images/p3.jpg'
import pizza4 from '../../assets/images/p4.jpg'
import pizza5 from '../../assets/images/p5.jpg'
import pizza6 from '../../assets/images/p6.jpg'

export const BackgroundContainer = styled.div`
 
 animation: change 30s infinite;

 @keyframes change {
    0% { background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${pizza1});}
    20% { background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${pizza2});}
    40% { background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${pizza3});}
    60% { background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${pizza4});}
    80% { background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${pizza5});}
    100% { background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${pizza6});}
}

    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${pizza2});
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    top:0;
    left:0;
    width: 100%;
    height: 110vh;
    overflow-y: hidden;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1{
        color: white;
        font-size: 80pt;
        font-family: NewPizza;
        line-height: 1;
        margin: 0;
        padding-top: 1rem;
        padding-bottom: 1rem;
    }
    h2{
        color: white;
        font-size: 36pt;
        line-height: 1;
        margin-bottom: 0;
    }
    span.text{
        color: white;
        font-size: x-large;
        padding-bottom: 2rem;
    }
    span.l-line{
      width: 150px;
      padding: 2rem;
      height: 70px;

    }
    span.r-line{
      width: 150px;
      padding: 2rem;
      height: 70px;
    }
    div{
        display: flex;
    }
    body {
        overflow: hidden;
    }
 
`;

export const Button = styled(Link)`
    border: solid 1px white;
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0.2);
    padding:0.75rem;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    color:white;
    &:hover{
        background-color: rgba(85, 45, 25, 0.5);
        color:white;


    }
`;


