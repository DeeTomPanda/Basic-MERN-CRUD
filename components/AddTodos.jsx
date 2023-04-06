import React from 'react'
import {
	useSelector,
	useDispatch
} from 'react-redux'
import { 
	HStack,
	Input,
	Button,
	Box
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Add,Delete,Edit,Logout } from './../reducers/rootReducer'
import axios from 'axios'


const AddTodos=React.memo(()=>{

	const navigateTo=useNavigate()
	const [todo,setTodo]=React.useState('')
	const dispatch=useDispatch()
	const UserName=useSelector(state=>state.UserName)

	const submitTodo=()=>{
		if(todo.trim().length!=0){
			const data={UserName,Task:todo.trim(),id:Math.round(Math.random()*1000)}
			axios.post(`${import.meta.env.VITE_server}add`,data)
			.then((res)=>{
				if(res.status>=200 && res.status<300)
				   dispatch(Add(data))
			},(err)=> navigateTo('/'))
		}
	}
	
	return(
		<HStack w={['60vw','40vw']}>
		   <Input fontSize={['xs','md']} value={todo}  onChange={(e)=>setTodo(e.target.value)}
		    borderColor='orange' focusBorderColor='darkblue'/>
		   <Button onClick={submitTodo} variant='ghost'>Add Todo</Button>
		</HStack>)
})

export default AddTodos
