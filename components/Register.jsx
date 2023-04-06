import React from 'react'
import * as Yupp from 'yup'
import {
	Box,
	Text,
	Center,
	VStack,
	Heading
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
	const validationSchema=Yupp.object().shape({
		UserName:Yupp.string().required("Required").min(6)
		.test("UserName","No special characters",(val)=>!/[^\w]+/gi.test(val)),
		Password:Yupp.string().required("Required").min(6),
		Name:Yupp.string().required("Required").min(2).test('Name','Only Characters',
			(val)=>/^[a-z\s]+$/gi.test(val))
	})

	const registerUsers=async(vals)=>{
		
		alert(JSON.stringify(vals))
		await axios.post(`${import.meta.env.VITE_server}/register`,vals)
		.then((res)=>{
			console.log(res.data)
			navigateTo('/')},err=>console.log(err))
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
		       alignItems='center' 
		       h={['70vh','80vh']} w={['40vh','60vh']} bgGradient='linear(to-l, #B0DAFF, #e9e4f0)'>
		         <Heading ml='5px' mb='5px' alignSelf='flex-start' size='lg'>{"Register"}</Heading>
		            <Fields formik={formik} prop={<div>{"hello"}</div>}/>
		      </Box>
		   </Center>
		</Box>)
}



export default Register
