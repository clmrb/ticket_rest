<a name="top"></a>
# ticket_rest v1.0.0



# Table of contents

- [Auth](#Auth)
  - [Get a JWT](#Get-a-JWT)
- [Comments](#Comments)
  - [Add a comment to a ticket](#Add-a-comment-to-a-ticket)
  - [Delete a comment](#Delete-a-comment)
  - [Get comments of a ticket](#Get-comments-of-a-ticket)
  - [Update a comment](#Update-a-comment)
- [Tickets](#Tickets)
  - [Add a ticket](#Add-a-ticket)
  - [Get a ticket](#Get-a-ticket)
  - [Update a ticket](#Update-a-ticket)

___


# <a name='Auth'></a> Auth

## <a name='Get-a-JWT'></a> Get a JWT
[Back to top](#top)

```
POST /auth
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| mail | `String` | <p>User mail</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>JWT</p> |

### Success response example

#### Success response example - `Ok:`

```json
HTTP/1.1 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o"
}
```

### Error response example

#### Error response example - `Non autorisé:`

```json
HTTP/1.1 401 Unauthorized
{
  "message": "invalid credentials"
}
```

# <a name='Comments'></a> Comments

## <a name='Add-a-comment-to-a-ticket'></a> Add a comment to a ticket
[Back to top](#top)

```
POST /ticket/:id/comment
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Ticket Id</p> |
| text | `String` | <p>Comment text</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Id of the comment</p> |
| text | `String` | <p>Text of the comment</p> |
| createdAt | `DateTime` | <p>DateTime when comment was created</p> |
| updatedAt | `String` | <p>DateTime when comment was updated</p> |

### Success response example

#### Success response example - `comment added:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "text": "blabla1",
    "createdAt": "2021-08-06T13:13:10.682Z",
    "updatedAt": null
}
```

### Error response example

#### Error response example - `ticket not found:`

```json
HTTP/1.1 404 Not Found
{
  "message": "ticket '5' not found"
}
```

## <a name='Delete-a-comment'></a> Delete a comment
[Back to top](#top)

```
DELETE /comment/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Comment Id</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Id of the comment</p> |
| text | `String` | <p>Text of the comment</p> |
| createdAt | `DateTime` | <p>DateTime when comment was created</p> |
| updatedAt | `String` | <p>DateTime when comment was updated</p> |

### Success response example

#### Success response example - `comment deleted:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "text": "blabla1",
    "createdAt": "2021-08-06T13:13:10.682Z",
    "updatedAt": "2021-08-07T10:11:12.064Z"
}
```

### Error response example

#### Error response example - `comment not found:`

```json
HTTP/1.1 404 Not Found
{
  "message": "comment '5' not found"
}
```

## <a name='Get-comments-of-a-ticket'></a> Get comments of a ticket
[Back to top](#top)

```
GET /ticket/:id/comments
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Ticket Id</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| - | `Object[]` | <p>List of comments</p> |
| -.id | `Number` | <p>Id of the comment</p> |
| -.text | `String` | <p>Text of the comment</p> |
| -.createdAt | `DateTime` | <p>DateTime when comment was created</p> |
| -.updatedAt | `String` | <p>DateTime when comment was updated</p> |

### Success response example

#### Success response example - `comments found:`

```json
HTTP/1.1 200 OK
[
     {
         "id": 1,
         "text": "blabla1",
         "createdAt": "2021-08-06T13:13:10.682Z",
         "updatedAt": null
     },
     {
         "id": 2,
         "text": "blabla1",
         "createdAt": "2021-08-06T13:13:10.682Z",
         "updatedAt": "2021-08-07T12:25:07.054Z"
     }
]
```

#### Success response example - `no comments:`

```json
HTTP/1.1 200 OK
[]
```

### Error response example

#### Error response example - `ticket not found:`

```json
HTTP/1.1 404 Not Found
{
  "message": "ticket '5' not found"
}
```

## <a name='Update-a-comment'></a> Update a comment
[Back to top](#top)

```
PUT /comment/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Comment Id</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Id of the comment</p> |
| text | `String` | <p>Text of the comment</p> |
| createdAt | `DateTime` | <p>DateTime when comment was created</p> |
| updatedAt | `String` | <p>DateTime when comment was updated</p> |

### Success response example

#### Success response example - `comment updated:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "text": "blabla1",
    "createdAt": "2021-08-06T13:13:10.682Z",
    "updatedAt": "2021-08-07T10:11:12.064Z"
}
```

### Error response example

#### Error response example - `comment not found:`

```json
HTTP/1.1 404 Not Found
{
  "message": "comment '5' not found"
}
```

# <a name='Tickets'></a> Tickets

## <a name='Add-a-ticket'></a> Add a ticket
[Back to top](#top)

```
POST /ticket/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| title | `String` | <p>Ticket title</p> |
| description | `String` | <p>Ticket description</p> |
| status | `String` | <p>Ticket status</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Id of the ticket</p> |
| title | `String` | <p>Title of the ticket</p> |
| description | `String` | <p>description of the ticket</p> |
| status | `String` | <p>Status of the ticket (todo, wip, done)</p> |

### Success response example

#### Success response example - `ticket added:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "title": "ticket title",
    "description": "ticket desc",
    "status": "wip"
}
```

## <a name='Get-a-ticket'></a> Get a ticket
[Back to top](#top)

```
GET /ticket/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Ticket Id</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Id of the ticket</p> |
| title | `String` | <p>Title of the ticket</p> |
| description | `String` | <p>description of the ticket</p> |
| status | `String` | <p>Status of the ticket (todo, wip, done)</p> |

### Success response example

#### Success response example - `ticket found:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "title": "ticket title",
    "description": "ticket desc",
    "status": "wip"
}
```

### Error response example

#### Error response example - `ticket not found:`

```json
HTTP/1.1 404 Not Found
{
  "message": "ticket '5' not found"
}
```

## <a name='Update-a-ticket'></a> Update a ticket
[Back to top](#top)

```
PUT /ticket/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Ticket Id</p> |

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `Number` | <p>Id of the ticket</p> |
| title | `String` | <p>Title of the ticket</p> |
| description | `String` | <p>description of the ticket</p> |
| status | `String` | <p>Status of the ticket (todo, wip, done)</p> |

### Success response example

#### Success response example - `ticket updated:`

```json
HTTP/1.1 200 OK
{
    "id": 1,
    "title": "ticket title",
    "description": "ticket desc",
    "status": "wip"
}
```

### Error response example

#### Error response example - `ticket not found:`

```json
HTTP/1.1 404 Not Found
{
  "message": "ticket '5' not found"
}
```

