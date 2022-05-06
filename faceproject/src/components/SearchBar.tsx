import styled from 'styled-components';

const MemberInput = styled.input`
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
`

const SearchBar = () => (
    <form action="/" method="get">
        <MemberInput
            type="text"
            id="member-search"
            name="s" 
        />
    </form>
);

export default SearchBar;
