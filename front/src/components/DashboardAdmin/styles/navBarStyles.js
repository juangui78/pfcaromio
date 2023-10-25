import styled, {css} from 'styled-components';
import { Link } from "react-router-dom";

const formControl = css`
    background-color: transparent;
    border: 0px;
    padding-left: 1rem;
    padding-right: 1rem;
    color:black;
    font-size: 1rem;
    outline: none;
`;


export const Nav = styled.nav`
    position: fixed;
    top:0px;
    z-index:100;
    border: 0px dashed red;
    color: black;
    background-color: white;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    padding-top: 1rem ;
    box-shadow: rgb(179, 185, 194) 0px 0px 12px 0px;

    div.nav{
        display: flex;
        flex-direction: row;
        width:95%;
        border: 0px dashed green;
        align-items: center;
        gap: 1rem;
        div{
            border: 0px dashed blue;
        }

        div.nav-logo{
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-items: center;
            height: 80px;
            justify-content: space-evenly;
            img.img-logo{
                width: 140px;
            }
            div{
                font-size: large;
                font-weight: bold;
                color: #555;
            }
        }

        div.nav-input-search{
            flex-grow: 4;
            padding:2px 2rem;
            
            div.search{
                border: 0px dashed orange;
                border-radius: 8px;
                background-color: #EEE;
                justify-content: center;
                flex-wrap: nowrap;
                width: 100%;
                display: flex;
                flex-grow: 12;
                
                input {
                    flex-grow: 1;
                    ${formControl};
                }

                button{
                    background-color: transparent;
                    border: 0px solid black;
                    border-radius: 0px 8px 8px 0px; 
                    color: gray;
                    &:hover{
                        color:black;
                    }
                }

                select{
                    ${formControl};
                    font-size: 0.8rem;
                    border-radius: 8px 0px 0px 8px; 
                    background-color: #EEE;
                    border-right: 2px solid white;;
                }
            }

        }

        div.nav-btns{
            flex-grow: 1;
            display:flex ;
            flex-direction: row;
            justify-content: space-evenly;
            row-gap:1rem;

            div.line-div{
                border-left: 2px solid #CCC;
                width: 1px;
                height: 30px;
                margin-top: 0.5rem;
            }
            
        

            div.nav-btn-user-container{

                button{
                    background-color: white;
                    color:gray;
                    gap: 1rem;
                    &:hover{
                        color:green;
                    }
                    span{
                        padding-left: 0.5rem;
                    }
                }
            }
        }
    }

`;