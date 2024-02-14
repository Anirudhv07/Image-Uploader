import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

import {
    Card,
    Input,
    Typography,
} from "@material-tailwind/react";
import { useState } from 'react'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { checkCode, uploadImage } from "../../api/apiConnection/connection";

interface Dialog{
    handleOpen:()=>void,
    open:boolean,
    setAllMyUploads:any,
    allMyUploads:any
  }

const AddDialog:React.FC<Dialog>=({handleOpen,open,setAllMyUploads,allMyUploads})=> {
 
    const { email } = useSelector((store: any) => store.user)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePresent,setImagePresent] = useState(false)
    const [imageFileURL, setImageFileURL] = useState('')
    const [uniqueCode, setUniqueCode]=useState(0)
    const [codeLength,setCodeLength]=useState(false)
    const [checkDigits,setCheckDigits]=useState(false)
    const [isUnique,setIsUnique]=useState('')
    const [isUniqueStyle,setIsUniqueStyle]=useState('')

  

    //FUNCTION TO GET IMAGE FROM INPUT FORM
    const handleImage = (e: any) => {
        const file = e.target.files[0]
        

        if (file.type == 'image/webp' || file.type == 'image/jpeg') {
            setImagePresent(true)
            setImageFile(file)
            const fileURL = URL.createObjectURL(file);
            setImageFileURL(fileURL)
        } else {

            toast.error('Please select an Image')
        }

    }

    
    const handleUniqueCode = (e:any) => {
        let value = e.target.value;
        setIsUnique('')
        // Check if the entered value contains non-digit characters
        if (!/^\d*$/.test(value)) {
            setCheckDigits(true)
            
    
            // Prevent further input by preventing default behavior
            e.preventDefault();
        } else {
            setCheckDigits(false)
            // Check if the length of the value exceeds 6
            if (value.length != 6) {

                setCodeLength(true);
            } else {
                setCodeLength(false);
                setUniqueCode(value);
            }
    
            // Update the state with the new value
        }
    }
    

    //FUNCTION TO UPLOAD IMAGE
    const handleUploadImage = async (event: { preventDefault: () => void; }) => {
        event?.preventDefault()

        if(imagePresent){

            if(isUnique=='Code is Unique'){

                if(!codeLength && !checkDigits){
                    const response = await uploadImage(imageFile, email,uniqueCode)
                    
                    setAllMyUploads([response,...allMyUploads])
                    setUniqueCode(0)
                    setImagePresent(false)
                    handleOpen()
                 
                }else{
                    
                }
            }else{

            }

        }else{
            toast.error('Please select an Image')
        }
       

    }

    const checkUniqueCode=async()=>{
        const response= await checkCode(uniqueCode)
        if(response){
            setIsUnique('Code already exist')
            setIsUniqueStyle('text-red-500');
        }else{
            setIsUnique('Code is Unique')
            setIsUniqueStyle('text-blue-500');

        }
    }

  return (
    <>
      <Dialog open={open} handler={handleOpen}  placeholder={undefined}>
        <DialogBody  placeholder={undefined} className="items-center pb-10">
            <div className="flex justify-end">
            <XMarkIcon className="h-6 w-6 cursor-pointer"  onClick={handleOpen}/>
            </div>
            <div className=" rounded-md w-fill  bg-white input_custom_style" >

                <Typography variant="h4" color="green" placeholder={undefined}>
                    Image Uploader
                </Typography>
                <Typography color="gray" className="mt-1 font-normal" placeholder={undefined}>
                    Upload your Image
                </Typography>
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 flex flex-col item-center" onSubmit={handleUploadImage} encType="multipart/form-data">
                    <div className="mb-1 flex flex-col  gap-6">
                        {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
              
            </Typography> */}
                        <Input
                            size="lg"
                            type="file"
                            placeholder="Add PDF"
                            className=" !border-t-blue-gray-200 focus:!border-green-500"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }} crossOrigin={undefined}
                            onChange={handleImage} />

                    </div>
                    {imageFileURL ? <img
                        src={imageFileURL}
                        alt="Selected Image"
                        className="my-4 mx-auto"
                        style={{ maxWidth: '200px', maxHeight: '200px' }} // Set max width and height
                    />
                        : <div className="py-2"></div>}

                        <div className="flex flex-row gap-2">

                    <Input
                        size="lg"
                        placeholder="Enter a 6 digit Unique code"
                        className="!border-t-blue-gray-200 focus:!border-green-500 placeholder-opacity-100 "
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }} crossOrigin={undefined}
                        onChange={handleUniqueCode}/>

                        <Button placeholder={undefined} onClick={checkUniqueCode}>Check</Button>
                        </div>

                    {isUnique==''?<div></div>:<div className={`${isUniqueStyle}`}>{isUnique}</div>}
                     {codeLength?<p className="my-2 text-red-600">Code should be 6 digits</p>:<div></div>}   
                     {checkDigits?<p className="my-2 text-red-600">Numbers are only allowed</p>:<div></div>}

                    <Button className="mt-6 bg-green-500" type="submit" fullWidth placeholder={undefined}
                      disabled={codeLength || checkDigits || isUnique=='Code already exist'}>
                        Upload
                    </Button>

                </form>
            </div>
            {/* {pdfFile !== null && < DialogBox handleOpen={handleOpen} open={open} pdfFile={pdfFile} />} */}
        </DialogBody>
      </Dialog>
    </>
  );
}

export default AddDialog