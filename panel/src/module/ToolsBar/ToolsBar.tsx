import {IconButton, DeleteIcon, Button} from "../../muiLibrary";
import {blockUser, deleteUsers, unBlockUser} from "../../service";
import {Dispatch, SetStateAction} from "react";

interface IOptionsToolBar {
    selectedValue: number[],
    handleChange: (users: number[]) => void,
    forUpdate: Dispatch<SetStateAction<number[]>>
}
const ToolsBar = ({ selectedValue, handleChange, forUpdate }: IOptionsToolBar) => {

    const isCheckMyId = (selectedValue : number[]): void => {
        const myID = Number(localStorage?.getItem('authToken')?.split('!')[0].split(' ')[1])
        if(selectedValue.includes(myID)){
            localStorage.removeItem("authToken")
            window.location.assign('/table')
        }
    }
    const getDelete = async () =>{
        handleChange(selectedValue)
        await deleteUsers(selectedValue).then(()=>{forUpdate([])})
        isCheckMyId(selectedValue)

    }

    const getBlock = async () => {
        await blockUser(selectedValue).then(()=>{forUpdate([])})
        isCheckMyId(selectedValue)
    }
    const getUnBlock = async () => {
        await unBlockUser(selectedValue).then(()=> {forUpdate([])})
    }

    return(
        <div>
            <Button onClick ={getBlock} variant="outlined">Block</Button>
            <Button onClick ={getUnBlock} sx={{ m: 2}} variant="outlined" >UnBlock</Button>
            <IconButton onClick={getDelete} aria-label="delete"  color="primary">
                <DeleteIcon />
            </IconButton>
        </div>
    )
};

export default ToolsBar