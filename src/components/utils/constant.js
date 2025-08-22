const HTTP_STATUS = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    NOT_ALLOWED: 401,
     NOT_FOUND: 404,
    REQUEST_CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500

}
const emailValidation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,3})$/;
const mobileValidation = /^[6-9]\d{9}$/;
const onlyLetters = /^[A-Za-z\s]+$/;
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export {
    HTTP_STATUS, emailValidation,
    mobileValidation,
    onlyLetters, passwordValidation,
    
}
