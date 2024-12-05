# DevTinder APIs

## authRouter
- POST /user/signup
- POST /user/login
- POST /user/logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit

## connectionRequestRouter
- POST /request/send/:status/:userId 
- POST /request/review/:status/:requestId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets you the profiles of other users on platform


Status: ignored, interested, accepeted, rejected