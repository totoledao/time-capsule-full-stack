# API Documentation

This documentation provides information about the available API endpoints.<br>
[Download the Insomnia.json](https://github.com/totoledao/time-capsule-full-stack/files/13198555/Insomnia_2023-10-28.json)

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ul>  
    <li>
      <a href="#public-memories">Public Memories</a>
      <ul>
        <li><a href="#index">Index</a></li>
        <li><a href="#show">Show</a></li>
      </ul>
    </li>
    <li>
      <a href="#auth">Auth</a>
      <ul>
        <li><a href="#login">Login</a></li>
        <li><a href="#login-mobile">Login mobile</a></li>
      </ul>
    </li>
    <li>
      <a href="#memories">Memories</a>
      <ul>
        <li><a href="#memories-index">Index</a></li>
        <li><a href="#memories-show">Show</a></li>
        <li><a href="#create">Create</a></li>
        <li><a href="#update">Update</a></li>
        <li><a href="#delete">Delete</a></li>
      </ul>
    <li>
      <a href="#upload">Upload</a>
      <ul>
        <li><a href="#upload">upload</a></li>
      </ul>
    </li>
      
  </ul>
</details>

## Public Memories

### Index

**Endpoint:** /public-memories<br>
**Method:** GET<br>
**Description:** Retrieve a list of all public memories.

**Request:**

```http
Headers:
  "Content-Type": "application/json"
```

**Response:**

```ts
[
  {
    id: string,
    coverUrl: string,
    excerpt: string,
    createdAt: string,
  },
];
```

### Show

**Endpoint:** /public-memories/{id}<br>
**Method:** GET<br>
**Description:** Retrieve a specific public memory by ID.

**Request:**

```http
Headers:
  "Content-Type": "application/json"
```

**Response:**

```ts
  {
    "id": string,
    "coverUrl": string,
    "content": string,
    "isPublic": boolean,
    "createdAt": string,
    "userId": string
  }
```

## Authentication

### Login

**Endpoint:** /register<br>
**Method:** POST<br>
**Description:** Log in using the GitHub redirection code on a web browser.

**Request:**

```http
Headers:
  "Content-Type": "application/json"

Body:
  {
    "code": "d7ab21231ddb0def3333"
  }
```

**Response:**

```ts
  {
    "token": string
  }
```

### Login mobile

**Endpoint:** /register-mobile<br>
**Method:** POST<br>
**Description:** Log in using the GitHub redirection code on the mobile app.

**Request:**

```http
Headers:
  "Content-Type": "application/json"

Body:
  {
    "code": "d7ab21231ddb0def3333"
  }
```

**Response:**

```ts
  {
    "token": string
  }
```

## Memories

<h3 id='memories-index'>Index</h3>

**Endpoint:** /memories<br>
**Method:** GET<br>
**Description:** Retrieve a list of all memories of the logged user.

**Request:**

```http
Headers:
  "Content-Type": "application/json"
  "Authorization": "Bearer [Your Access Token]"
```

**Response:**

```ts
[
  {
    id: string,
    coverUrl: string,
    excerpt: string,
    createdAt: string,
  },
];
```

<h3 id='memories-show'>Show</h3>

**Endpoint:** /memories/{id}<br>
**Method:** GET<br>
**Description:** Retrieve a specific memory of the logged user by ID.

**Request:**

```http
Headers:
  "Content-Type": "application/json"
  "Authorization": "Bearer [Your Access Token]"
```

**Response:**

```ts
  {
    "id": string,
    "coverUrl": string,
    "content": string,
    "isPublic": boolean,
    "createdAt": string,
    "userId": string
  }
```

### Create

**Endpoint:** /memories<br>
**Method:** POST<br>
**Description:** Create a new memory.<br>
The memory needs the `isPublic` field and at least one of or both fields `content` and/or `coverUrl`.

**Request:**

```http
Headers:
  "Content-Type": "application/json"
  "Authorization": "Bearer [Your Access Token]"

Body:
  {
    "content": "Test memory description",
    "coverUrl": "http://localhost:3333/uploads/fa48c52d-de48-4b19-ba6e-0139d2d1768d.mp4",
    "isPublic": false
  }
```

**Response:**

```ts
  {
    "id": string,
    "coverUrl": string,
    "content": string,
    "isPublic": boolean,
    "createdAt": string,
    "userId": string
  }
```

### Update

**Endpoint:** /memories/{id}<br>
**Method:** PUT<br>
**Description:** Update a memory of the logged user by ID.

**Request:**

```http
Headers:
  "Content-Type": "application/json"
  "Authorization": "Bearer [Your Access Token]"

Body:
  {
    "content": "Teste img",
    "coverUrl": "https://github.com/totoledao.png",
    "isPublic": false
  }
```

**Response:**

```ts
  {
    "id": string,
    "coverUrl": string,
    "content": string,
    "isPublic": boolean,
    "createdAt": string,
    "userId": string
  }
```

### Delete

**Endpoint:** /memories/{id}<br>
**Method:** DELETE<br>
**Description:** Delete a memory of the logged user by ID.

**Request:**

```http
Headers:
  "Content-Type": "application/json"
  "Authorization": "Bearer [Your Access Token]"
```

**Response:**

```ts
"success";
```

## Upload

### Upload

**Endpoint:** /upload<br>
**Method:** POST<br>
**Description:** Upload a video or image with a maximum size of 5MB.

**Request:**

```http
Headers:
  "Content-Type": "multipart/form-data"
  "Authorization": "Bearer [Your Access Token]"

Body:
  "File": "[Upload File]"
```

**Response:**

```ts
  {
    "success": boolean,
    "error": string | undefined,
    "url": string | undefined
  }
```
