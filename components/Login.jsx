import React from 'react'
import * as Yupp from 'yup'
import {
	Box,
	Text,
	Center,
	VStack,
	Heading,
	useToast
} from '@chakra-ui/react'
import Fields from './Fields'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { 
	useDispatch,
	useSelector
} from 'react-redux'
import { onSignIn } from './../reducers/rootReducer'


const Login=()=>{

	const toast=useToast()
	const dispatch=useDispatch()
	const navigateTo=useNavigate()

	const validationSchema=Yupp.object().shape({
		UserName:Yupp.string().min(6).required("Required")
			.test("UserName","No special characters",(val)=>!/[^\w]+/gi.test(val)),
		Password:Yupp.string().required("Required").min(6)
	})

	const authenticateUsers=async(vals)=>{

		await axios.post(`${import.meta.env.VITE_server}/signin`,vals)
		.then((res)=>{
			let response=res
			console.log(res)
			if(response.status>=200 && response.status<300)
			{
				dispatch(onSignIn(response.data))
				toast({
					title:'Success',
					duration:2000,
					description:'Logged In Successfully'})
				navigateTo('/home')}			
			console.log(response)},
			err=>{
			console.log(err)
			toast({
				title:'Error',
				duration:5000,
				description:'Invalid credentials'})

		})
	}

	const formik=useFormik({
		initialValues:{
			UserName:'',
			Password:''},
		validationSchema,
		onSubmit:authenticateUsers
	})

	return(
		<Box h='100vh' w='100vw' bgGradient='linear(to-r, #d3cce3, #e9e4f0)'>
		   <Center h='inherit' w='inherit'>
		      <Box display='flex' flexDirection='column' justifyContent='center' borderRadius='md'
		       alignItems='center' 
		       h={['450px','80vh']} minWidth={['300px','60vh']} bgGradient='linear(to-l, #B0DAFF, #e9e4f0)'>
		         <Heading ml='5px' alignSelf='flex-start' size='lg'>{"Login"}</Heading>
		            <Fields formik={formik} 
		             Child={()=><Text m='auto' fontSize={['sm','md']}>
				     {"New User? Register here!"}
			            </Text>}
		            />
		      </Box>
		   </Center>
		</Box>)
}

export default Login
