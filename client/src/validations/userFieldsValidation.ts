export const validateEmail = (email : string):string =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
}

export const validatePassword = (password: string) =>{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password) ? "" : "Use 8+ chars: a-z, A-Z, 0-9, @#$%&!";
}