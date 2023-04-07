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

const ListTodos=React.memo(()=>{

	const dispatch=useDispatch()
	const navigateTo=useNavigate()
	const list=useSelector(state=>state.Todos)
	const UserName=useSelector(state=>state.UserName)
	const [isOpen,setIsOpen]=React.useState(false)
	const [newTodo,setNewTodo]=React.useState({id:'',value:''})
		
	const editTodo=()=>{
		const data={UserName,Task:newTodo.value,id:newTodo.id}
		axios.post(`${import.meta.env.VITE_server}/edit`,data)
		.then((res)=>{
			if(res.status>=200 && res.status<300)
				dispatch(Edit(newTodo))},
			err=>{
				console.log(err)
				navigateTo('/')}
		)

		setNewTodo({id:'',value:''})
		setIsOpen(false)}

	const delTodo=(id)=>{
		const data={UserName,id}
		axios.post(`${import.meta.env.VITE_server}/delete`,data)
		.then((res)=>{
			if(res.status>=200 && res.status<300)
				dispatch(Delete(id))},
			err=>{
				navigateTo('/')
				console.log(err)}
		)}

	
	return(
		<Box h='65vh' mb='10px' w={['90vw','70vw']} overflowY='scroll'>
		{list.map(v=>{
			return(
			<>
			<HStack h={['15vw','10vh']} justifyContent='space-between' bg='#fff' my={['5vw','2vh']}
				p='5px' borderRadius='2xl'>
			   <Text overflowX='scroll' fontSize={['sm','md']}>
				{v.Task}
			   </Text>
			   <ButtonGroup>
			      <Button variant='ghost' size={['xs','sm']} 
			       onClick={()=>{
			       	setNewTodo({id:v.id,value:v.Task})
			       	setIsOpen(true)}
			       }>
			          Edit
			       </Button>
			      <Button variant='ghost' size={['xs','sm']}
			       onClick={()=>delTodo(v.id)}>
			         Delete
			      </Button>
			   </ButtonGroup>
			</HStack>
			   <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
			      <ModalOverlay/>
			      <ModalContent>
			         <ModalHeader>Edit Field</ModalHeader>
			         <ModalCloseButton/>
			         <ModalBody>
			            <Input fontSize={['xs','md']} placeholder={newTodo.value} 
			             onChange={(e)=>setNewTodo({...newTodo,value:e.target.value})}
			            />
			         </ModalBody>
			         <ModalFooter>
			            <Button onClick={editTodo} variant='ghost' size={['xs','sm']}>Submit</Button>
			         </ModalFooter>
			      </ModalContent>
			   </Modal>
			      
			</>)}
		)}
		</Box>)
})

export default ListTodos
