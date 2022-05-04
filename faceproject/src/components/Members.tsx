import React,{useEffect, useState} from 'react';
import SearchBar from './SearchBar';
import TopBar from './TopBar';
import styled from 'styled-components';
import User from './User';
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
        width: 100%;
        display:flex;
        flex-direction:column;
        text-align:center;
        justify-content: center;
    `,
    CurrentImage : styled.img`
        align-self: center;
    `,
    MemberTable : styled.table`
        table-layout: fixed ;
        margin: 0 auto;
        width: 40% ;
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

    const [currentMember,setCurrentMember] = useState({
        imgLink : "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/1280px-A_black_image.jpg", 
        fullName : "Custom Member", 
        watchlist : "No List"
    });  
    const [searchField,setSearchField] = useState("")
    const [members,setMembers] = useState<{imgLink: string,watchlist: string, fullName: string}[]>([])
    const [membersSearched,setMembersSearched] = useState<{imgLink: string,watchlist: string, fullName: string}[]>([])
    const [membersDynamic,setMembersDynamic] = useState<JSX.Element[] | null>(null)
    
    function updateInput(input : string) {
        const filtered = members.filter(member => {
         return member.fullName.toLowerCase().includes(input.toLowerCase())
        })
        setMembersSearched(filtered);
    }   //search function fullname

    function memberList(membersToTransform: {imgLink: string,watchlist: string, fullName: string}[]){
        let temp: JSX.Element[] = [];
        membersToTransform.forEach((member) => {
            temp.push(<User imgLink={member.imgLink} watchlist={member.watchlist} fullName={member.fullName} />)
        })
        console.log("HERE")
        setMembersDynamic(temp);
    }

    function handleAddMember(){
        //let x = document.querySelector('input:checked').value;
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
                    watchlistId : data[i].watchlistId
                  };
                  memberJSONList.push(cMember); 
                }
                setMembers(memberJSONList);
            }catch (err){
                console.log(err);
            }
            memberList(members);
        }
        
        memberListInit();
    },[]) //useEffect used on initial render which inits the members from the server

    useEffect(() => {
        if(searchField == ""){
            memberList(members)
        }
        else{
            updateInput(searchField)
            memberList(membersSearched)
        }
    }) //useEffect used every re-render
  
    return (
        <StyledMembers.Container>
            <TopBar/>
            <StyledMembers.CurrentImage width="20%" height="20%" src={currentMember.imgLink}/>
            <StyledMembers.MemberInput type="text" id="member-search" onChange={(e) => setSearchField(e.target.value)} name="s"/>
            <StyledMembers.TableDiv>
                <StyledMembers.MemberTable className="table table-hover">
                    <thead>
                        <tr>
                            <StyledMembers.Th>   </StyledMembers.Th>
                            
                            <StyledMembers.Th>Full Name</StyledMembers.Th>
                            <StyledMembers.Th>Watchlist</StyledMembers.Th>
                        </tr>
                    </thead>
                    <tbody>
                        {membersDynamic}
                    </tbody>
                </StyledMembers.MemberTable>
            </StyledMembers.TableDiv>
            <button onClick={handleAddMember}>Add to member</button>
        </StyledMembers.Container>
    );
}
;
export default Members;
