import React from "react";
import {type GridColDef, DataGrid, GridRowSelectionModel} from "@mui/x-data-grid";
import styles from './style.module.css'
import ToolsBar from "../ToolsBar/ToolsBar.tsx";
import {gatAllUser} from "../../service";
import {AxiosResponse} from "axios";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'mail', headerName: 'Email', width: 130 },
    {
        field: 'dateReg',
        headerName: 'Register',
        type: 'number',
        width: 90,
    },
    {
        field: 'lastLog',
        headerName: 'Last Login',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 160,


    },
    {
        field: 'blocked',
        headerName: 'isBlocked',
        description: 'This colum has boolean value about state user',
        sortable: true,
        width: 120
    },
];

interface IUserDto {
    id: number;
    mail: string;
    password: string;
    name: string;
    stateUser: boolean;
    lastLog: number;
    dataReg: string;
    blocked: boolean;
}

const MainTable = () => {
    const [rows, setRows] = React.useState([])
    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel | number[]>([]);
    const removeUsers = (users: number[]): void =>{
        setRows(rows.filter(item => !users.includes(item?.id)))
    }
    const getAllUsers = async () => {
        try {
            const data: AxiosResponse<IUserDto> = await gatAllUser();

            if (data !== undefined) {
                setRows(data);
            } else {
                console.error('Data from server is undefined.');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    React.useEffect( ()=> {
       getAllUsers()
    }, [rowSelectionModel])


    return(
        <div className={styles.wrap}>
            <ToolsBar selectedValue={rowSelectionModel} handleChange={removeUsers} forUpdate={setRowSelectionModel} />
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
            />
        </div>
    )
}
export default MainTable