import styled from 'styled-components';

export const NavBar = styled.nav`
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
        width: 100%;
        border: 0px dashed green;
        div{
            border: 0px dashed blue;
        }

        div.nav-logo{
            flex-grow: 1;
            display: flex;
            align-items: center;
            justify-items: center;
            height: 80px;
            img.img-logo{
                width: 180px;
            }
            a{
                width: 110%;
                display: flex;
                justify-content: center;
            }
        }

        div.nav-input-search{
            flex-grow: 4;
            padding:2px 2rem;
            
            search{
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
                    background-color: transparent;
                    border: 0;
                    padding-left: 1rem;
                    padding-right: 1rem;
                    color:black;
                    font-size: 1rem;
                    outline: none;
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
            }

            div.filters{
                display: flex;
                flex-direction:row;
                justify-content: space-between;
                align-items:center;
                
                div.last{
                    display: flex;
                    justify-content:center;
                    align-items: center;
                    flex-grow: inherit;
                    font-size: small;
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
            
            div.buttonCreate{
                padding-top: 0.3rem;
                display: flex;
                align-items: flex-start;
                a{
                    border: none;
                    background-color: var(--orange);
                    color: white;
                    padding-left: 0.5rem;
                    padding-right: 0.5rem;
                    padding-top: 0.3rem;
                    padding-bottom: 0.3rem;
                    border-radius: 5px;
                    &:hover{
                        color:black;
                    }
                }
            }

            div.nav-btn-user-container{
               // padding-top: 0.5rem;

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

    dialog{
        position: fixed;
        animation: linear 0.2s down;
        box-shadow: #CCC;
        border: 1px solid gray;
        border-radius: 8px;
        background-color: white;
        color: black;

        form > section > header {
            font-size: 1.2em;
            font-weight: 500;
            padding-bottom:0.5rem ;
            border-bottom: 1px solid gray;
            display: flex;
            justify-content: space-between;
            span.btnClose{
                cursor: pointer;
            }
        }

        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        @keyframes down {
            0% {
                transform: translateY(-20rem);
                //position:relative;  top: -20rem; 
            }
            100% {
                transform: translateY(0);
                 //position:relative;  top: 0rem; 
            }
        }
    }
`;

export const AlertContainer = styled.div`
  z-index: 10000;
`;

export const FilterByBtn = styled.button`
    background-color: transparent;
    color:  ${(props) => props.disabled ? '#DDD': 'black'};
    border: none;
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 3rem;
    border: 0px solid;
`;

/* export const DropDownMenu = styled.div`
    background-color: white;
    color: black;
    border: none;
    display: flex;
    align-items: center;
    gap: 1rem;
`; */

export const OrderByBtn = styled.div`
    .sec-center {
        position: relative;
        max-width: 100%;
        text-align: center;
        z-index: 200;
        align-items: center;
        gap: 1rem;
    }

    [type="checkbox"]:checked,
    [type="checkbox"]:not(:checked){
        position: absolute;
        left: -9999px;
        opacity: 0;
        pointer-events: none;
    }

    .dropdown:checked + label,
    .dropdown:not(:checked) + label{
        border: 0px solid;
        position: relative;
        font-weight: 500;
        line-height: 2;
        height: 3rem;
        transition: all 200ms linear;
        border-radius: 8px;
        padding: 0em 1.2em;
        display: -webkit-inline-flex;
        display: -ms-inline-flexbox;
        display: inline-flex;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        -moz-justify-content: center;
        -ms-justify-content: center;
        justify-content: center;
        -ms-flex-pack: center;
        text-align: center;
        background-color: transparent;
        cursor: pointer;
        color:  ${(props) => props.disabled ? 'black': '#DDD'};

    }

    .dropdown:checked + label:before,
    .dropdown:not(:checked) + label:before{
        position: fixed;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        z-index: -1;
        cursor: auto;
        pointer-events: none;
    }
    .dropdown:checked + label:before{
        pointer-events: auto;
    }
    .dropdown:not(:checked) + label .uil {
        font-size: 24px;
        margin-left: 10px;
        transition: transform 200ms linear;
    }
    .dropdown:checked + label .uil {
        transform: rotate(180deg);
        font-size: 24px;
        margin-left: 10px;
        transition: transform 200ms linear;
    }
    .section-dropdown {
        position: absolute;
        padding: 5px;
        background-color: #fff;
        top: 70px;
        left: 0;
        width: 120%;
        border-radius: 8px;
        display: block;
        box-shadow: 0 14px 35px 0 rgba(9,9,12,0.4);
        z-index: 20;
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px);
        transition: all 200ms linear;
    }

    .dropdown:checked ~ .section-dropdown{
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }
    .section-dropdown:before {
        position: absolute;
        top: -20px;
        left: 0;
        width: 100%;
        height: 20px;
        content: '';
        display: block;
        z-index: 21;
    }
    .section-dropdown:after {
        position: absolute;
        top: -7px;
        left: 30px;
        width: 0; 
        height: 0; 
        border-left: 8px solid transparent;
        border-right: 8px solid transparent; 
        border-bottom: 8px solid #FFF;
        content: '';
        display: block;
        z-index: 22;
        transition: all 200ms linear;
    }

    a {
        position: relative;
        color: gray;
        transition: all 200ms linear;
        font-weight: 400;
        border-radius: 2px;
        padding: 10px 0;
        padding-left: 20px;
        padding-right: 15px;
        margin: 2px 0;
        text-align: left;
        text-decoration: none;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        align-items: center;
        justify-content: space-between;
            -ms-flex-pack: distribute;
    }

    a:hover {
        color: black;
        background-color: #ffeba7;
    }

    .dropdown-sub:checked + label,
    .dropdown-sub:not(:checked) + label{
        position: relative;
        color: gray;
        transition: all 200ms linear;
        font-weight: 400;
     
        border-radius: 2px;
        padding: 10px 0;
        padding-left: 20px;
        padding-right: 15px;
        text-align: left;
        text-decoration: none;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -moz-align-items: center;
        -ms-align-items: center;
        align-items: center;
        justify-content: space-between;
            -ms-flex-pack: distribute;
            cursor: pointer;
        }

    .dropdown-sub:checked + label:hover,
    .dropdown-sub:not(:checked) + label:hover{
        color: black;
        background-color: #ffeba7;
    }


    .section-dropdown-sub {
        position: relative;
        display: block;
        width: 80%;
        pointer-events: none;
        opacity: 0;
        max-height: 0;
        padding: 10px;
        padding-left: 20px;
        padding-right: 3px;
        overflow: hidden;
        transition: all 200ms linear;
    }
    .dropdown-sub:checked ~ .section-dropdown-sub{
        pointer-events: auto;
        opacity: 1;
        max-height: 999px;
    }
    .section-dropdown-sub a {
        font-size: 14px;
    }
`;

export const FilterSection = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FilterModal = styled.dialog`
    menu{
     display: flex ;
     z-index: 10;
     justify-content: space-around;
    /*  margin-block-start:0;
     margin-block-end:0; */
     padding-inline-start: 0;
    }
    button.dialogBtn {
        background-color: red;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }
    
      button.dialogBtn:hover {
        background-color: #750202;
      }
      
      button.filterBtn {
        background-color: #808080; 
        color: white; 
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }
    
      button.filterBtn:hover {
        background-color: #555555; 
      }
`;

export const FilterItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    padding-top: 0.4rem;
    padding-bottom: 0.5rem;
    color: gray;
    label{
        padding-bottom:0.25rem ;
    }

    input{
        padding: 0.5rem;
        font-size: 1rem;
        background-color: #EEE;
        border:none;
        color: black;
        border-radius: 8px;

        &:focus{
            outline: 1px solid gray;
            background-color: #ffeba7;
        }
    }

    button{
        background-color: transparent;
        color: gray;
        font-weight: normal;
        border: 1px solid gray;
        &:hover{
            background-color: #ffeba7;
            color:black;
            border-color: #ffeba7;
        }
    }
`;
