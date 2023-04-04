import axios from 'axios';
//登录
export const login=(params)=>axios.post("/api/login",params)
//用户名是否重复
export const getUserName=(params)=>axios.get("/api/getUserName",{params})
//注册
export const addUser=(params)=>axios.post("/api/addUser",params)
//修改密码或者权限
export const updateUsers=(params)=>axios.post("/api/updateUsers",params)
//删除用户
export const delUsers=(params)=>axios.get("/api/deleteUser",{params})
//查询当前用户的信息
export const selectUser=(params)=>axios.get("/api/selectUser",{params})
//删除上传图片
export const delThings=(params)=>axios.get("/api/things/delThings",{params})
//上传物品
export const addThings=(params)=>axios.post("/api/things/addThings",params)
//上传问卷
export const addQuestion=(params)=>axios.post("/api/question/addQuestion",params)
//正确、错误回答信息
export const updateUsersAnswer=(params)=>axios.post("/api/updateUsersAnswer",params)
//根据thingsId查询问卷
export const selectQuestionByThingsId=(params)=>axios.get("/api/question/selectQuestionByThingsId",{params})
//获取物品列表
export const selectThings=(params)=>axios.get("/api/things/selectThings",params)
//获取用户名列表
export const getUserList=()=>axios.get("/api/selectAllUsers")
