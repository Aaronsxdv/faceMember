import React,{useState} from 'react';
import SearchBar from './SearchBar';
import TopBar from './TopBar';
import styled from 'styled-components';

const StyledMembers = {
    MemberInput : styled.input`
        align-self: center;
        background: url("https://static.thenounproject.com/png/101791-200.png") no-repeat left;
        background-color: #313A46;
        background-size: 20px;
        font-size:20px;
        background-origin: content-box, padding-box;
        padding-left: 22px;
        border-style: none;
        outline: none;
        padding:10px 10px 10px 22px;
        width:20%;
        color:rgba(255, 255, 255, .6);
        font-family:Montserrat,sans-serif;
        &:input:focus {
            color:red;
        }
    `,
    Container : styled.div`
        display:flex;
        flex-direction:column;
        text-align:center;
        justify-content: center;
    `,
    CurrentImage : styled.img`
        align-self: center;
    `
}


export async function getMembers(url : string) {
    const response = await fetch(url);
    return response.json();
}
 
function handleSearchChange(){
    console.log("hello world")
}

const Members : React.FC = () => {
  const [member,setMember] = useState(0);  


  return (
    <StyledMembers.Container>
        <TopBar/>
        <StyledMembers.CurrentImage width="20%" height="20%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1280px-A_black_image.jpg"/>
        <StyledMembers.MemberInput type="text" id="member-search" onChange={handleSearchChange} name="s"/>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>   </th>
                    <th>Full Name</th>
                    <th>Watchlist</th>
                </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                    <input type="radio" name="radios" id="radio1"/>
                    <label htmlFor="radio1">Label 1</label>
                </td>
                <td>Regular</td>
                <td>IrRegular</td>
            </tr>
            <tr>
                <td>
                    <input type="radio" name="radios" id="radio2"/>
                    <label htmlFor="radio2">Label 2</label>
                </td>
                <td>Regular</td>
                <td>IrRegular</td>
            </tr>
            </tbody>
        </table>
    </StyledMembers.Container>
  );
}
;
export default Members;
