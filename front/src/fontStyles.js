import { createGlobalStyle } from "styled-components";
import Allura from "./fonts/Allura-Regular.ttf";
import NewPizza from "./fonts/New-Pizza.ttf"

const FontStyles = createGlobalStyle`

    @font-face {
        font-family: 'Allura';
        src: local('Allura'), url(${Allura}) format('truetype');
    }


    @font-face {
        font-family: 'NewPizza';
        src: local('New Pizza'), url(${NewPizza}) format('truetype');
    }
`;

export default FontStyles;