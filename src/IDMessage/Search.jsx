 export function SearchName(userLogged, name, users){
 
    var listUser = users.filter(each => each.uid !== userLogged.uid)
    console.log(listUser)
    var listUsers = listUser.filter(each => each.displayName.toLowerCase().search(name.toLowerCase()) !== -1 )
  
    return listUsers
}