import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const userDetails=createSlice({
	name:'userDetails',
	initialState:{
		Name:'',
		UserName:'',
		LoggedIn:false,
		Todos:[],
		token:'',
		history:[]},
	reducers:{
		onSignIn(state,action){
			const { UserName,Name,Todos,token }=action.payload
			state.UserName=UserName
			state.Name=Name
			state.Todos=Todos
			state.LoggedIn=true
			state.token=token
			console.log(state.token)
		},
		Logout(state,action){
			state.LoggedIn=false
			state.token=''
		},
		Edit(state,action){
			const { id,value }=action.payload
			if(value.trim().length!=0){
				let index=state.Todos.findIndex((v)=>v.id===id)
				state.Todos[index]={ id,Task:value.trim() }
				state.history.unshift(`Edited Task id ${id} to ${value.trim()}`)
			}
		},
		Delete(state,action){
			const id =action.payload
			state.Todos=state.Todos.filter((v)=>{
					if(v.id!=id)
						return v})
			state.history.unshift(`Deleted Task id ${id}`)
		},
		Add(state,action){
			state.Todos=[...state.Todos,action.payload]
			state.history.unshift(`Added Task --> ${action.payload.Task}`)
		}
	}
})

export const { onSignIn,Logout,History,Edit,Delete,Add }=userDetails.actions
export default userDetails.reducer
