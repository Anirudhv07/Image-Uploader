import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { deleteImage } from "../../api/apiConnection/connection";

interface Dialog{
    handleOpenDelete:any,
    openDelete:boolean,
    fileToDelete:string,
    setFiles:any,
    files:any
  }
 
  //DELETE IMAGE CONFIRMATION DIALOG
const DeleteDialog:React.FC<Dialog>=({fileToDelete,openDelete,handleOpenDelete,setFiles,files})=> {
    
    const handleDelete = async () => {

        //FUNCTION TO DELETE IMAGE
        const response = await deleteImage(fileToDelete)
        if (response) {
            const updatedFiles = files.filter((myFiles: { _id: string; }) => myFiles._id != fileToDelete)

            setFiles(updatedFiles)

            handleOpenDelete()
        }
    }
    

  return (
    <>
   
      <Dialog open={openDelete} handler={handleOpenDelete}  placeholder={undefined}>
        <DialogHeader  placeholder={undefined}>Are you sure? </DialogHeader>
        <DialogBody  placeholder={undefined}>
         You want to delete this image
        </DialogBody>
        <DialogFooter  placeholder={undefined}>
          <Button
                      variant="text"
                      color="red"
                      onClick={handleOpenDelete}
                      className="mr-1"  placeholder={undefined}          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}  placeholder={undefined}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteDialog