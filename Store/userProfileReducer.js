const initialState = {
    user: {
        idFirebase: undefined,
        idFacebook: undefined,
        name: '',
        isNameUpdatedManually: false,
        isConnected: false,
        avatar_picture: undefined,
        myFutureEvents: [],
        myPastEvents:[],
        teufeur:undefined,
        lover:undefined,
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
                    user1.isConnected= action.value.isConnected;

                nextState = {...state, user: user1};
            return nextState || state;

        case 'UPDATE_MY_EVENTS':
             let user2 = state.user;

                user2.myFutureEvents = action.value;
                console.log(user2.myFutureEvents)
                console.log(user2)
                nextState= {...state, user: user2}
            return nextState || state;

        case 'DISCONNECT_USER':
            let user3 = state.user;

            user3.isConnected = false;

            nextState= {...state, user: user3}
            console.log(nextState)
            return nextState || state;

        case 'TEUFEUR_STATUS':
            console.log(" in reducer")
            let user4 = state.user;

            user4.teufeur = action.value;
            console.log(user4)
            nextState= {...state, user: user4}
            return nextState || state;

        case 'UPDATE_MY_LOVER_STATUS':
            let user5 = state.user;

            user5.lover = action.value;
            console.log(user5)
            nextState= {...state, user: user5}
            return nextState || state;

        default:
            return state;
    }
}

export default updateUserProfile;




