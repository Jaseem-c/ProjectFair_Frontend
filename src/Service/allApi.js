import { commonApi } from "./CommonApi"
import { serverUrl } from "./serverUrl"

// api to add registration details
export const registerApi= async (reqBody)=>{
    return await commonApi("POST",`${serverUrl}/register`,reqBody,"")
}
// api to add login details
export const loginApi=async(reqBody)=>{
    return await commonApi("POST",`${serverUrl}/login`,reqBody,"")
}
// api to add project details
export const addProjectApi=async(reqbody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/add-projects`,reqbody,reqHeader)
}

// api to get home projects
export const getHomeProjectsApi=async()=>{
    return await commonApi("GET",`${serverUrl}/home-projects`,"","")
}
// api to get all projects
export const getAllProjectsApi=async(searchkey)=>{
    // query paramter syntax:baseurl?key=value
    return await commonApi("GET",`${serverUrl}/all-projects?search=${searchkey}`,"","")
}
// to get userprojects
export const getUserProjectsApi=async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/user-projects`,"",reqHeader)
}

// to delete user project
export const deleteUserProjectApi=async(id)=>{
    return await commonApi("DELETE",`${serverUrl}/delete-userproject/${id}`,{},"")
}
// api to edit user project
export const editUserProjectApi=async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/edit-userproject/${id}`,reqBody,reqHeader)
}
// api to update profile
export const updateProfileApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${serverUrl}/update-profile`,reqBody,reqHeader)
}