exports.Validacao = (req, res) => {
    const {email, password} = req.body;
    if(email.includes('@') && email.includes('.com')){
        return true;
    }else{
        return false;
    }
}