const sessionIdToUserMap = new Map();

function setUser(id, user){
    sessionIdToUserMap.set(id, user);
}

function getUser(id){
    console.log("GET : ", id , "Has : ", sessionIdToUserMap.has(id));
    return sessionIdToUserMap.get(id);
}

module.exports = {
    setUser,
    getUser
}