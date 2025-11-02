import styled, {keyframes, css} from "styled-components";

export const Container = styled.div`
    max-width: 700px;
    background: #010409;
    border-radius: 4px;
    padding: 30px;
    margin: 80px auto;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.01);

    h1{
        font-size: 36px;
        display: flex;
        align-items: center;
        flex-direction: row;
    }

    h1 svg{
        margin-right: 10px;
    }
    `;

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;

    input{
        flex: 1;
        border: 1px solid ${props => (props.error ? '#FF0000' : '#22272E')};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
        color: #0D1117;
    }
    `;

    //animação de loading
    const rotate = keyframes`
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    `;

export const SubmitButton = styled.button.attrs( props => ({
    type: 'submit',
    disabled: props.Loading,
}))`
    background: #0D1117;
    border: 0;
    border-radius: 4px;
    margin-left: 10px;
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s;
    
    &:hover{
        background: #161b22;
    }

    &[disabled]{
        cursor: not-allowed;
        opacity: 0.6;
    }

    ${ props => props.Loading && 
    css `
        svg{
            animation: ${rotate} 2s linear infinite;
        }
    `
    
    }
    `;


export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        padding: 15px ;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-radius: 4px;

        &:nth-child(odd) {
            background-color: transparent; 
        }

        &:nth-child(even) {
            background-color: #0D1117;
        }

        a{
            color: #C9D1D9;
            text-decoration: none;
        }
    }
    
    
    `;


export const DeleteButton = styled.button.attrs({
    type: 'button',
})`
    background: transparent;
    color: #C9D1D9;
    border: 0;
    padding: 8px 7px;
    outline: 0;
    border-radius: 4px;
    cursor: pointer;

`;
