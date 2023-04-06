import React from 'react'
import axios from 'axios'
import * as Yupp from 'yup'
import {
	Box,
	Text,
	Center,
	VStack,
	Heading,
	Input,
	FormControl,
        FormLabel,
	Button
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

const Fields=(  { formik,Child } )=>{

	const navigateTo=useNavigate()
	
	return(
		<form onSubmit={formik.handleSubmit}>
		   <VStack mt={['10px','5px']} justifyContent='center' spacing={['10px','25px']} 
		    h={['45vh','60vh']} w={['30vh','50vh']}>
		    {formik.values.Name!=undefined?( 
		     <FormControl h='15vh'>
		        <FormLabel htmlFor='Name'>Name</FormLabel>
		        <Input  type='text' errorBorderColor='red.500' isRequired name='Name'
		         value={formik.values["Name"]} variant='filled'
		         onChange={(e)=>formik.setFieldValue('Name',e.target.value)}
			 onBlur={formik.handleBlur}/>
		         {
			  (formik.touched['Name'] && formik.errors['Name'])?
				 (<Text fontSize={['xs','sm']} color='red'>
				    {formik.errors.Name}
				  </Text>)
				 :null}
		     </FormControl>):null
		    }
		     
		     
		     <FormControl h='15vh'>
		       <FormLabel htmlFor='UserName'>UserName</FormLabel>
		       <Input errorBorderColor='red.100' isRequired name='UserName'
		        value={formik.values.UserName} variant='filled'
		        onChange={(e)=>formik.setFieldValue('UserName',e.target.value)}
			onBlur={formik.handleBlur}/>
		       {
			formik.touched['UserName'] && formik.errors['UserName']?
			       (<Text fontSize={['xs','sm']} color='red'>
				   {formik.errors.UserName}
				</Text>)
			       :null}
		     </FormControl>
		     <FormControl h='15vh'>
		        <FormLabel htmlFor='Password'>Password</FormLabel>
		        <Input type='password' errorBorderColor='red.500' isRequired name='Password'
		         value={formik.values["Password"]} variant='filled'
		         onChange={(e)=>formik.setFieldValue('Password',e.target.value)}
			 onBlur={formik.handleBlur}/>
		         {
			  (formik.touched['Password'] && formik.errors['Password'])?
				 (<Text fontSize={['xs','sm']} color='red'>
				    {formik.errors.Password}
				  </Text>)
				 :null}
		     </FormControl>
		     <Box alignSelf={['flex-start','center']}>
		        <a href='/register'>
		           {Child?(<Child/>):null}
		        </a>
		     </Box>
		  </VStack>
		  <Button w='inherit' mt='15px' type='submit'>{Child?"SignIn":"Register"}</Button>
	        </form>
		)
}

export default Fields

