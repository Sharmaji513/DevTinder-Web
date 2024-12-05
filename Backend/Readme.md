# DevTinder API

A backend API for a Tinder-like application that allows users to manage profiles, send connection requests, review requests, and view user feeds. 

---

## Table of Contents
- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [Profile Routes](#profile-routes)
  - [Connection Request Routes](#connection-request-routes)
  - [User Routes](#user-routes)

---

## Features
- User authentication and session management.
- Profile management with view and edit functionality.
- Send and review connection requests.
- View connection requests, accepted connections, and user feeds.

---

## API Endpoints

### Auth Routes (`/authRouter`)
#### POST `/signup` 
Description: - Registers a new user.

**Request Example:**
```json
POST /signup
Content-Type: application/json

{
  "firstName": "john",
  "lastname" : "doe",
  "age" : 20,
  "gender" : "male",
  "email": "john.doe@example.com",
  "password": "password123"
}
```
#### POST /login
Description: - Logs in an existing user.

Request:
```json
POST /login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### POST /logout
Description: Logs out the authenticated user.

Response:
```json
{
  "message": "Logout successful."
}
```

## Profile Routes (/profileRouter)

#### GET /profile/view
Description: Retrieves the profile information of the authenticated user.

Response Example:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "age": 20,
  "gender": "male",
  "bio": "Software Engineer",
  "profilePicture": "https://example.com/profile.jpg"
}
```
#### PATCH /profile/edit
Description: Updates the profile details of the authenticated user.

Request Example:
```json
PATCH /profile/edit
Content-Type: application/json

{
  "bio": "Senior Software Engineer",
}

Response Example:
{
  "message": "Profile updated successfully."
}
```

## Connection Request Routes (/connectionRequestRouter)

#### POST /request/send/:status/:userId
Description: Sends a connection request to another user.

Request Example:
```json

POST /request/send/interested/67890

Response Example:
{
  "message": "Connection request sent.",
  "requestId": "67891"
}

POST /request/review/accepted/67891

Response Example:
{
  "message": "Connection request accepted."
}


```

## User Routes (/userRouter)

#### GET /user/requests/received
Description: Retrieves all received connection requests.

Response Example:
```json

[
  {
    "requestId": "67891",
    "sender": {
      "userId": "12345",
      "name": "Alice Doe",
      "profilePicture": "https://example.com/alice.jpg"
    },
    "status": "interested"
  }
]
```

#### GET /user/connections
Description: Retrieves all accepted connections.

Response Example:
```json
[
  {
    "userId": "12345",
    "name": "Alice Doe",
    "profilePicture": "https://example.com/alice.jpg"
  },
  {
    "userId": "12346",
    "name": "Bob Smith",
    "profilePicture": "https://example.com/bob.jpg"
  }
]

```

#### GET /user/feed
Description: Retrieves profiles of other users on the platform for the feed view.

Response Example:
```json
[
  {
    "userId": "67890",
    "name": "Charlie Brown",
    "bio": "Tech Enthusiast",
    "profilePicture": "https://example.com/charlie.jpg"
  },
  {
    "userId": "67891",
    "name": "Diana Prince",
    "bio": "Blockchain Developer",
    "profilePicture": "https://example.com/diana.jpg"
  }
]


```


