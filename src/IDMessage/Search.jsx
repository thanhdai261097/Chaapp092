 export const  SearchName = (userLogged, name, users) =>{
 
    var listUsers = users.filter(each => (each.displayName.toLowerCase().search(name.toLowerCase()) >= 0))
    console.log(listUsers);
    var listUser = listUsers.filter(each => each.uid !== userLogged.uid)
    
    return listUsers
}