
const setUserId = (id) => ({type: "SETID", id})

const setFriends = (friendList) => ({type: "SETFRIENDS", friendList})

const addFriendAct = (friendId) => ({type: "ADDFRIEND", friendId})

export { setUserId, setFriends, addFriendAct }
