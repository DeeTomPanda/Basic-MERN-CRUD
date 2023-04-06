import React from 'react'
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
import {
	useSelector,
	useDispatch
} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Add,Delete,Edit,Logout } from './../reducers/rootReducer'
import axios from 'axios'

import Header from './Header'
import ListTodos from './ListTodos'
import AddTodos from './AddTodos'


const Home=()=>{


	const state=useSelector(state=>state)
	const dispatch=useDispatch()
	const [todo,setTodo]=React.useState('')

	return(
		<Box display='flex' bgGradient='linear(to-tl,#F2F3E2,#B2E5F8,#F4BEEF)' flexDirection='column' 
		 h='100vh' w='100vw' alignItems='center' justifyContent='space-between'>
		   <Header/>
		   <AddTodos/>
		   <ListTodos/>
		</Box>)
}

export default Home
