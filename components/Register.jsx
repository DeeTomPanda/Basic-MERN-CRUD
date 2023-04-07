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
import { 
	useDispatch,
	useSelector
} from 'react-redux'
import { useFormik } from 'formik'
import axios from 'axios'
import Fields from './Fields'
import { useNavigate } from "react-router-dom";

const Register=()=>{

	const navigateTo=useNavigate()
	const toast=useToast()

	const validationSchema=Yupp.object().shape({
		UserName:Yupp.string().required("Required").min(6)
		.test("UserName","No special characters",(val)=>!/[^\w]+/gi.test(val)),
		Password:Yupp.string().required("Required").min(6),
		Name:Yupp.string().required("Required").min(2).test('Name','Only Characters',
			(val)=>/^[a-z\s]+$/gi.test(val))
	})

	const registerUsers=async(vals)=>{
		
		axios.post(`${import.meta.env.VITE_server}/register`,vals)
		.then((res)=>{
			if(res.status>=200 && res.status<300){
			   toast({
				   title:"Success",
				   duration:2000,
				   description:"User Registration Successful"})
			   navigateTo('/')}
			else{
			   toast({
				title:"Error",
				duration:2000,
				description:err.message})
			}
		}
		,(err)=>{
			toast({
				title:"Error",
				duration:2000,
				description:err.response.data})
			console.log(err)
		})
	}

	const formik=useFormik({
		initialValues:{
			UserName:'',
			Password:'',
			Name:''},
		validationSchema,
		onSubmit:registerUsers
	})

	return(
		<Box h='100vh' w='100vw' bgGradient='linear(to-r, #d3cce3, #e9e4f0)'>
		   <Center h='inherit' w='inherit'>
		      <Box display='flex' flexDirection='column' justifyContent='center' borderRadius='md'
		       alignItems='center' minHeight={['450px','80vh']} minWidth={['300px','60vh']} 
		       bgGradient='linear(to-l, #B0DAFF, #e9e4f0)'>
		         <Heading ml='5px' mb='5px' alignSelf='flex-start' size='lg'>{"Register"}</Heading>
		            <Fields formik={formik}/>
		      </Box>
		   </Center>
		</Box>)
}



export default Register
