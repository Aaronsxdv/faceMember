import React,{useEffect, useState} from 'react';
import SearchBar from './SearchBar';
import TopBar from './TopBar';
import styled from 'styled-components';
import User from './User';
const StyledMembers = {
    MemberInput : styled.input`
        align-self: center;
        padding: 10px;
        padding-left: 1.5em;
        background-image: url('https://www.seekpng.com/png/full/920-9209972_magnifying-glass-png-white-search-icon-white-png.png');
        background-repeat: no-repeat;
        background-position: -1.2em;
        outline: 0;
        background-color: #313A46;
        background-size: 1em;
        font-size:22px;
        background-origin: content-box, padding-box;
        border-style: none;
        outline: none;
        width:30%;
        color:rgba(255, 255, 255, .6);
        font-family:Montserrat,sans-serif;
        margin-bottom:1%;
        @media (max-width: 768px){
            font-size:12px;
        }
    `,
    Container : styled.div`
        width: 100%;
        display:flex;
        flex-direction:column;
        text-align:center;
        justify-content: center;
    `,
    CurrentImage : styled.img`
        align-self: center;
        width:20%;
        height:20%;
        padding:2px;
        border: 1px solid black;
        margin-bottom: 2%;
    `,
    MemberTable : styled.table`
        table-layout: fixed ;
        margin: 0 auto;
        width: 70% ;
        column-gap: 9px;
        font-family: Montserrat,sans-serif;
        border-collapse: collapse;
    `,
    TableDiv : styled.div`
        text-align:center;
        justify-content: center;
    `,
    Th : styled.th`
        border-bottom: 1px solid rgba(255, 255, 255, .3);
        font-weight: 200;
        padding-bottom:10px;
        @media (max-width: 768px){
            font-size:12px;
        }
    `,
    AddToMember: styled.button`
        margin-top:3%
        margin-bottom:3%;
        align-self: center;
        background-color: #8EECD8;
        width:fit-content;
        font-family: Montserrat,sans-serif;
        font-weight: bold;
        line-height: 3em;
        border-radius: 6px;
        border:none;
        font-size: 16px;
        padding:5px 3px;
        @media (max-width: 768px){
            font-size:12px;
            padding:3px 1px;
        }
    `,
    AddToMemberIcon : styled.img`
        width:1.2em;
        heigh:1.2em;
        align-self: center;
        margin-right: 0.4em;    
    `,
    Thead : styled.thead`
        margin-bottom:10px;
    `
}


export async function getMembers(url : string) {
    const response = await fetch(url);
    return response.json();
}
 

interface MemberType {
    imgLink: string;
    watchlist: string;
    fullName: string;
}

const Members : React.FC = () => {

    const [currentMember,setCurrentMember] = useState("https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwd29ya2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80");  
    const [searchField,setSearchField] = useState("")
    const [members,setMembers] = useState<{ fullName: string,imgLink: string,watchlist: string, id: number}[]>([])
    const [membersSearched,setMembersSearched] = useState<{imgLink: string,watchlist: string, fullName: string, id: number}[]>([])
    const [membersDynamic,setMembersDynamic] = useState<JSX.Element[] | null>(null)
    const [isInitialRender,setInitialRender] = useState<boolean>(true)
    function search(input : string) {
        const filtered = members.filter(member => {
         return member.fullName.toLowerCase().includes(input.toLowerCase())
        })
        setMembersSearched(filtered);
    }   //search function by fullname

    function memberList(membersToTransform: {imgLink: string,watchlist: string, fullName: string, id: number}[]){
        let temp: JSX.Element[] = [];
        membersToTransform.forEach((member) => {
            temp.push(<User  key={member.id} imgLink={member.imgLink} watchlist={member.watchlist} fullName={member.fullName} />)
        })
        setMembersDynamic(temp)
    }

    function handleAddMember(){
        
        var checkedMember = (document.querySelector('input[name = "radios"]:checked')  as HTMLInputElement).value;
        setCurrentMember(checkedMember)
    }   

    function handleKeyDown() {
        setSearchField((document.getElementById("member-search") as HTMLInputElement).value)
    }
    useEffect(() => {
        const memberListInit = async() => {
            let memberJSONList = [];
            try{
                var data = await getMembers("http://localhost:4000/members");
                let numResults = data.length;
                for(let i=0;i<numResults;i++){
                  let cMember = {
                    imgLink: data[i].imageURL,
                    fullName: data[i].fullName,
                    watchlist: data[i].watchlistName,
                    watchlistId : data[i].watchlistId,
                    id:data[i].id
                  };
                  memberJSONList.push(cMember); 
                }
                setMembers(memberJSONList);
                memberList(memberJSONList)
            }catch (err){
                console.log(err);
            }
        }
        memberListInit();
    },[]) //useEffect used on initial render which inits the members from the server

    useEffect(() => {
        if(searchField == ""){
            memberList(members)
        }
        else{
            search(searchField)
            memberList(membersSearched);
        }
    },[searchField]) //useEffect used on searchField changes

    
  
    return (
        <StyledMembers.Container>
            <TopBar/>
            <StyledMembers.CurrentImage  src={currentMember}/>
            <StyledMembers.MemberInput type="text" id="member-search" onKeyDown={(e) => { if (e.key === 'Backspace') {handleKeyDown()}}} onChange={(e) => setSearchField(e.target.value)} name="s"/>
            <StyledMembers.TableDiv>
                <StyledMembers.MemberTable className="table table-hover">
                    <StyledMembers.Thead>
                        <tr>
                            <StyledMembers.Th>   </StyledMembers.Th>
                            <StyledMembers.Th>FULL NAME</StyledMembers.Th>
                            <StyledMembers.Th>WATCHLIST</StyledMembers.Th>
                        </tr>
                    </StyledMembers.Thead>
                    <tbody>
                        {membersDynamic}
                    </tbody>
                </StyledMembers.MemberTable>
            </StyledMembers.TableDiv>
            <StyledMembers.AddToMember onClick={handleAddMember}><StyledMembers.AddToMemberIcon src="https://pic.onlinewebfonts.com/svg/img_509408.png"/>ADD TO MEMBER</StyledMembers.AddToMember>
        </StyledMembers.Container>
    );
}
;
export default Members;
