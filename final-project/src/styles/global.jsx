import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        scroll-behavior: smooth;
        outline: none;
        list-style: none;
    }
    
    html, body, #root {
        min-height: 100%;

    }

    body{
        background-color: #0D1117;
        font-size: 14px;
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button, textarea{
        font-family: Arial, Helvetica, sans-serif;
        color: #C9D1D9;
        font-size: 14px;    
    }


    button{
        cursor: pointer;
    }
`;