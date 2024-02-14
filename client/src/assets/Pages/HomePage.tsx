
import { useEffect } from 'react'
import { EllipsisVerticalIcon, ArrowDownCircleIcon, TrashIcon, XMarkIcon } from '@heroicons/react/20/solid'

import {
    Card,
    CardHeader,
    Typography,
    Spinner,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { useState } from 'react';

import { MyNavbar } from '../Components/Home/NavBar'
import {  getAllFiles, verifyTheCode } from '../api/apiConnection/connection'
import { useSelector } from 'react-redux';
import DeleteDialog from '../Components/MyUploads/DeleteDialog';


interface UploadData {
    _id: string;
    fileName: string;
    email: string;
};

function HomePage() {
    const [codeLength, setCodeLength] = useState(false)
    const [checkDigits, setCheckDigits] = useState(false)
    const [uniqueCode, setUniqueCode] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [allImageFiles, setAllImageFiles] = useState<UploadData[]>([])
    const [imgId, setImgId] = useState('')
    const [currentFile, setCurrentFile] = useState('')
    const [openDownload, setOpenDownload] = useState(false);
    const [codeStatus, setCodeStatus] = useState('')
    const [codeStatusStyle, setCodeStatusStyle] = useState('')
    const [loading, setLoading] = useState(false)
    const [openDelete, setOpenDelete] = useState(false);
    const [fileToDelete, setFileToDelete] = useState('')
    
    const handleOpenDelete = (fileId: string) => {
        
        setFileToDelete(fileId)
        setOpenDelete(!openDelete);
    }
    const { email } = useSelector((store: any) => store.user)

    const handleOpenDownload = () => setOpenDownload(!openDownload);

    useEffect(() => {
        allFiles()

    }, [])

    //FUNCTION TO GET ALL FILES
    const allFiles = async () => {
        setLoading(true)
        const response = await getAllFiles()

        if (response) {
            setLoading(false)
            setAllImageFiles(response)
        }

    }

    //FUNCTION TO HANDLE DOWNLOAD
    const handleDownload = (file: string, id: string) => {
        setImgId(id)
        setCurrentFile(file)
        handleOpenDownload()
    }

    //FUNCTION TO DOWNLOAD IMAGE
    const handleDownloadImage = async () => {
        try {
            await fetch(`http://localhost:3003/uploads/${currentFile}`)
                .then((response) => response.blob())
                .then((blob) => {
                    const url = window.URL.createObjectURL(new Blob([blob]));
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = currentFile;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                });
            handleOpenDownload()
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };


    //FUNCTION TO HANDLE THE UNIQUE CODE
    const handleVerifyCode = (e: any) => {
        const value = e.target.value
        if (!/^\d*$/.test(value)) {
            setCheckDigits(true)

            e.preventDefault();
        } else {
            setCheckDigits(false)
            if (value.length != 6) {

                setCodeLength(true);
            } else {
                setCodeLength(false);
                setUniqueCode(value);
            }

        }

    }


    //FUNCTION TO VERIFY UNIQUE CODE
    const checkUniqueCode = async () => {
        const response = await verifyTheCode(uniqueCode, imgId)
        if (response.status == true) {
            setCodeStatus(response.message)
            setCodeStatusStyle('text-blue-500')
        } else {
            setCodeStatus(response.message)
            setCodeStatusStyle('text-red-500')

        }
    }



    return (


        <div className='h-screen'>
            <MyNavbar />
            <div className='flex justify-center'>
                <Typography variant='h3' className='text-white' placeholder={undefined} style={{ fontVariant: 'petite-caps' }}
                >Home</Typography>
            </div>

            {loading ?
                <div>
                    <div className='flex justify-center items-center h-screen w-screen fixed'>
                        <Spinner className="h-16 w-16 text-gray-900/50 " />
                    </div>
                </div> :

                <div>
                    {allImageFiles.length !== 0 ?
                        <>


                            <div className='flex m-5 gap-2 flex-wrap'>
                                {allImageFiles.map((allFiles: any) => {
                                    return (

                                        <Card className="w-72 h-72" placeholder={undefined} key={allFiles._id}>
                                            <div className='pt-2'>
                                                <Menu>
                                                    <MenuHandler>


                                                        <Button
                                                            variant="text"
                                                            color="blue-gray"
                                                            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto" placeholder={undefined}                >


                                                            <EllipsisVerticalIcon color="black"
                                                                strokeWidth={2.5}
                                                                className={`h-6 w-6 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                                                    }`}
                                                            />
                                                        </Button>

                                                    </MenuHandler>
                                                    <MenuList placeholder={undefined}>

                                                        <MenuItem className="flex items-center gap-2" placeholder={undefined} onClick={() => handleDownload(allFiles.fileName, allFiles._id)}>
                                                            <ArrowDownCircleIcon className="h-4 w-4" />
                                                            <Typography placeholder={undefined}>
                                                                Download
                                                            </Typography>
                                                        </MenuItem>
                                                        {allFiles.email == email ?

                                                            <MenuItem className="flex items-center gap-2" placeholder={undefined} onClick={() => handleOpenDelete(allFiles._id)}>

                                                                <TrashIcon className="h-4 w-4" color="red" />
                                                                <Typography variant="small" className="font-normal" placeholder={undefined} color="red">
                                                                    Delete
                                                                </Typography>

                                                            </MenuItem> :
                                                            <div></div>
                                                        }


                                                    </MenuList>
                                                </Menu>
                                            </div>
                                            <CardHeader floated={false} className="h-full my-4" placeholder={undefined}>
                                                <img src={`http://localhost:3003/uploads/${allFiles.fileName}`} alt="picture" className="w-full h-full object-cover"
                                                />

                                            </CardHeader>

                                        </Card>

                                    )
                                })}
                            </div>
                        </>
                        :

                        <div>

                            <div className='flex justify-center flex-col items-center h-screen w-screen fixed' >
                                <Typography variant='h3' className='text-amber-200' placeholder={undefined}>No Images</Typography>


                            </div>
                        </div>

                    }
                </div>


            }



            <DeleteDialog fileToDelete={fileToDelete}
                openDelete={openDelete}
                handleOpenDelete={handleOpenDelete}
                setFiles={setAllImageFiles}
                files={allImageFiles}
            />
            <Dialog open={openDownload} handler={handleOpenDownload} placeholder={undefined}>

                <div className="flex justify-end pt-3 pr-3">
                    <XMarkIcon className="h-6 w-6 cursor-pointer" onClick={handleOpenDownload} />
                </div>
                <DialogHeader placeholder={undefined}>

                    Enter the Unique code</DialogHeader>
                <DialogBody placeholder={undefined} >
                    <div className='flex flex-row gap-2'>

                        <Input
                            size="lg"
                            placeholder="Enter here..."
                            className="!border-t-blue-gray-200 focus:!border-green-500 placeholder-opacity-100 "
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }} crossOrigin={undefined}
                            onChange={handleVerifyCode}
                        />

                        <Button placeholder={undefined} className="bg-green-500" onClick={checkUniqueCode}>Check</Button>
                    </div>
                    <div className='flex justify-center items-center flex-col'>
                        {codeStatus == '' ? <div></div> : <div className={`${codeStatusStyle}`}>{codeStatus}</div>}

                        {codeLength ? <p className="my-2 text-red-600">Code should be 6 digits</p> : <div></div>}
                        {checkDigits ? <p className="my-2 text-red-600">Numbers are only allowed</p> : <div></div>}

                    </div>



                </DialogBody>
                <DialogFooter placeholder={undefined}>

                    {codeStatus == 'Unique code is Correct' ?

                        <Button variant="gradient" color="green" onClick={handleDownloadImage} placeholder={undefined}>
                            <span>Download</span>
                        </Button> :
                        <div></div>
                    }
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default HomePage
