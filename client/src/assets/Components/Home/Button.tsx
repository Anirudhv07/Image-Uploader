import { Button, Menu, MenuHandler, MenuItem, MenuList, Typography } from '@material-tailwind/react';
import { ChevronDownIcon, HomeIcon, PrinterIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { setLogOut } from '../../redux/slice';
const ProfileButton = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { name } = useSelector((store: any) => store.user)
  const [isMenuOpen] = useState(false);


  //SIGN OUT FUNCTION
  const signOut = () => {
    dispatch(setLogOut())
    toast.success('Signout Successful')
    navigate('/')
  }
  return (
    <Menu >
      <MenuHandler>


        <Button
                  variant="text"
                  
                  className="flex items-center gap-1 py-0.5 pr-2 pl-0.5 lg:ml-auto "  placeholder={undefined}        >
          <Button  placeholder={undefined} className='bg-green-500'>
            <div className='flex flex-row gap-2'>

              {name}
              <ChevronDownIcon
                strokeWidth={4}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </div>
          </Button>
        </Button>

      </MenuHandler>
      <MenuList  placeholder={undefined}>


  

        {/* <hr className="my-2 border-blue-gray-50" /> */}
        <MenuItem className="flex items-center gap-2 " onClick={signOut}  placeholder={undefined}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="red"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
            />
          </svg>
          <Typography color='red' variant="small" className="font-normal"  placeholder={undefined}>
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}


export default ProfileButton

