const initialState = {
    userProfile: {
        id: 'hey',
        name: '',
        avatar_picture: 'hey',
        pictures: {},
        myEvents: {},
    }
};

function updateUserProfile (state = initialState , action){
    let nextState;
    switch (action.type) {
        case 'UPDATE_PROFILE':

            //updating functions

            nextState = state;
            return nextState || state;
        default:
            return state;
    }
}

export default updateUserProfile;




