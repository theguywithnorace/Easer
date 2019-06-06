const initialState = {
    user: {
        idFirebase: undefined,
        idFacebook: undefined,
        name: '',
        nameUpdatedManually: false,
        avatar_picture: require('../Images/User/user.png'),
        myEvents: {},
    }
};

function updateUserProfile (state = initialState , action){
    let nextState;
    let user = state.user;
    switch (action.type) {
        case 'UPDATE_PROFILE':
                if(state.user.idFirebase === undefined)
                    user.idFirebase = action.value.idFirebase;
                if(state.user.idFacebook === undefined)
                    user.idFacebook = action.value.idFacebook;
                if(!state.user.nameUpdatedManually)
                    user.name = action.value.name;
                if(state.user.avatar_picture === undefined)
                    user.avatar_picture = action.value.avatar_picture;
                user.myEvents = action.value.events;

                nextState = {...state, user};
            return nextState || state;

        case 'UPDATE_MY_EVENTS':

                user.myEvents=action.value.events;
                nextState= {...state, user}

            return nextState || state;
        default:
            return state;
    }
}

export default updateUserProfile;




