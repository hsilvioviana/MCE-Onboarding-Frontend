export const goToLogin = (history) => {

    history.push("/login")
}

export const goToSignup = (history) => {

    history.push("/signup")
}

export const goToResetPassoword = (history) => {

    history.push("/password/reset")
}

export const goToChangePasswordWithCode = (history, email) => {

    history.push(`/password/reset/${email}`)
}

export const goToDashboard = (history) => {

    history.push("/")
}

export const goToUsers = (history) => {

    history.push("/users")
}

export const goToProfile = (history, id) => {

    history.push(`/profile/${id}`)
}

export const goToEditInfo = (history, id) => {

    history.push(`/profile/edit/info/${id}`)
}

export const goToEditPassword = (history, id) => {

    history.push(`/profile/edit/password/${id}`)
}

export const goToLogout = (history) => {

    localStorage.clear();
    history.push("/login")
}

export const goBack = (history) => {

    history.goBack()
}