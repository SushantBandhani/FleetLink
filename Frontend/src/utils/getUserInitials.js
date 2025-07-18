export const getInitials=(name)=>{
    if(!name){
        return "";
    }
    let initials="";
    initials+=name.split(" ")[0][0];
    initials+=name.split(" ")[1][0];

    return initials.toUpperCase();
};