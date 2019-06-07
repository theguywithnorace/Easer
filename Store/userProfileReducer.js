const initialState = {
    user: {
        idFirebase: undefined,
        idFacebook: undefined,
        name: '',
        isNameUpdatedManually: false,
        isConnected: false,
        avatar_picture: undefined,
        myEvents: [],
    }
};

function updateUserProfile (state = initialState , action){
    let nextState;
    switch (action.type) {
        case 'UPDATE_PROFILE':
             let user1 = state.user;

                if(state.user.idFirebase === undefined)
                    user1.idFirebase = action.value.idFirebase;
                if(state.user.idFacebook === undefined)
                    user1.idFacebook = action.value.idFacebook;
                if(!state.user.isNameUpdatedManually)
                    user1.name = action.value.name;
                if(state.user.avatar_picture === undefined)
                    user1.avatar_picture = action.value.avatar_picture;
                if(user1.idFirebase !== undefined && user1.idFacebook !== undefined && user1.name !== undefined)
                    user1.isConnected= true;

                nextState = {...state, user: user1};
            return nextState || state;

        case 'UPDATE_MY_EVENTS':
             let user2 = state.user;

                user2.myEvents = action.value;
                console.log(user2.myEvents)
                console.log(user2)
                nextState= {...state, user: user2}
                console.log(nextState)
            return nextState || state;
        default:
            return state;
    }
}

export default updateUserProfile;




