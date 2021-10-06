const $ = id => {
    return document.getElementById(id);
}

window.onload = () => {
    // Empty for now
}

function onSignIn(googleUser) {
    // Token Information
    const id_token = googleUser.getAuthResponse().id_token;
    console.log("Sign In ID Token:", id_token);

    // Send Token to Backend
    fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({token: id_token})
    })
        .then(res => res.json())
        .then(data => {
            if (data == 'success') {
                signOut();

                // NOTE: Redirect to cookie required page here...
                location.assign('banking');
            }
            // console.log(`Signed in as: ${user}`)
        });

    // Profile Information
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
        console.log('User signed out.');
    })
}