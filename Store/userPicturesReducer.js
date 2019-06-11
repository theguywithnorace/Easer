const initialState = {
    userPictures: [require('../Images/User/profile_pic.png'),require('../Images/User/profile_pic.png')]
};

function updateUserPictures (state = initialState , action){
    let nextState;
    switch (action.type) {
        case 'ADD_IMAGE':
            let addimage = state.userPictures.push(action.value);
console.log(action.value)
                nextState = {...state, addimage};
            return nextState || state;

        case 'DELETE_IMAGE':

            let images=state.userPictures.splice(action.value,1);

                nextState= {...state, images};

            return nextState || state;


        default:
            return state;
    }
}

export default updateUserPictures;




