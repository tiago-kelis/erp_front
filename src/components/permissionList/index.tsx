import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ChangeEvent } from "react";
import { PermissionDetail } from "src/models/permission"

type Props = {

    permissionDate: PermissionDetail[];
    selectedPermission: number[];
    setSelectedPermission: (value:  number[]) => void;
   
}


const permissionList = ({permissionDate, selectedPermission, setSelectedPermission}: Props) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>, permission_id: number) => {

        const {checked} =event.target;

        if(checked) {
            setSelectedPermission([...selectedPermission, permission_id])
        }else{
            setSelectedPermission(selectedPermission.filter(fid => fid != permission_id))            
        }


    }


    return (
      <FormGroup>
        {permissionDate.map((item) => (
            <FormControlLabel 

                key={item.id}
                control={
                    <Checkbox
                        checked={selectedPermission.find((id) => id === item.id) != undefined}
                        onChange={(e) => handleChange(e, item.id)}
                    />

                }
                label={item.name}
            
            />
            

        ))}
      </FormGroup>
    
    )
}

export default permissionList;