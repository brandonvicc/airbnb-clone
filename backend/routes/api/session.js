const router = require('express').Router();

const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// logs in user
router.post('/', asyncHandler( async (req,res, next)=>{
    const { credential , password } = req.body;
    const user = await User.login({ credential, password });
    if(!user) {
        const err = new Error('Login Failed')
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.']
        return next(err)
    }
    await setTokenCookie(res,user);
    return res.json({
        user
    })
}))

//deletes user session || logout user
router.delete(
    '/',
    (_req,res) =>{
        res.clearCookie('token');
        return res.json({message: 'success'})
    }
)

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json({
            user: user.toSafeObject()
            });
        } else return res.json({});
    }
);

module.exports = router;