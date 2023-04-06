import React from 'react'
import {
	useSelector,
	useDispatch
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
	Box,
	Text,
	Center,
	VStack,
	Heading,
	HStack,
	Button,
	Input,
	ButtonGroup,
	Modal,
  	ModalOverlay,
  	ModalContent,
  	ModalHeader,
  	ModalFooter,
  	ModalBody,
  	ModalCloseButton
} from '@chakra-ui/react'
import { Add,Delete,Edit,Logout } from './../reducers/rootReducer'
import axios from 'axios'

const Header=React.memo(()=>{

	const dispatch=useDispatch()
	const navigateTo=useNavigate()
	const history=useSelector((state)=>state.history)
	const [isOpen,setIsOpen]=React.useState(false)
	
	const logOut=()=>{
		dispatch(Logout())
		navigateTo('/')}
	

	return(
		<Box display='flex' w='100vw' h='10vh' position='sticky' top='10px' 
		 bgGradient='linear(to-r,#F492F0,#A18DCE)'>
		   <ButtonGroup ml='auto' my='auto' mr='10px'>
		      <Button color='#fff' fontSize='sm' 
		       variant='ghost' onClick={logOut}>Logout</Button>
		      <Button  color='#fff' fontSize='sm'
		       variant='ghost' onClick={()=>setIsOpen(true)}>History</Button>
		   </ButtonGroup>
		   <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
			      <ModalOverlay/>
			      <ModalContent>
			         <ModalHeader>History</ModalHeader>
			         <ModalCloseButton/>
			         <ModalBody>
			         { history.map((v,i)=><Text key={i} fontSize={['sm','md']}>{i+1})  {v}</Text>) }
			         </ModalBody>
			      </ModalContent>
			   </Modal>
		</Box>)
})

export default Header
