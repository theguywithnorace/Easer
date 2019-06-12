const initialState = {
    userPictures: [require('../Images/User/plus_icon.png')]
};

function updateUserPictures (state = initialState , action){
    let nextState;
    switch (action.type) {
        case 'ADD_IMAGE':
            let addimage = state.userPictures.splice((state.userPictures.length-1),0,action.value);
                console.log(action.value)
                nextState = {...state, addimage};
            return nextState || state;

        case 'DELETE_IMAGE':

            let images = state.userPictures.splice(action.value,1);

                nextState= {...state, images};

                if(state.userPictures.length === 0){
                    let addPlusImage = require('../Images/User/plus_icon.png')
                    nextState= {...state, addPlusImage};
                }

            return nextState || state;


        default:
            return state;
    }
}

export default updateUserPictures;




