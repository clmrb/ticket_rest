define({ "api": [
  {
    "type": "post",
    "url": "/auth",
    "title": "Get a JWT",
    "name": "GetUser",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mail",
            "description": "<p>User mail</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JWT</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Ok:",
          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.XbPfbIHMI6arZ3Y922BhjWgQzWXcXNrz0ogtVhfEd2o\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Non autorisé:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n  \"message\": \"invalid credentials\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/auth.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/ticket/:id/comment",
    "title": "Add a comment to a ticket",
    "name": "AddComment",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Ticket Id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Comment text</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "comment added:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"text\": \"blabla1\",\n    \"createdAt\": \"2021-08-06T13:13:10.682Z\",\n    \"updatedAt\": null\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "createdAt",
            "description": "<p>DateTime when comment was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>DateTime when comment was updated</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "ticket not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"ticket '5' not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/comments.js",
    "groupTitle": "Comments"
  },
  {
    "type": "delete",
    "url": "/comment/:id",
    "title": "Delete a comment",
    "name": "DeleteComment",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Comment Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "comment deleted:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"text\": \"blabla1\",\n    \"createdAt\": \"2021-08-06T13:13:10.682Z\",\n    \"updatedAt\": \"2021-08-07T10:11:12.064Z\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "createdAt",
            "description": "<p>DateTime when comment was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>DateTime when comment was updated</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "comment not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"comment '5' not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/comments.js",
    "groupTitle": "Comments"
  },
  {
    "type": "get",
    "url": "/ticket/:id/comments",
    "title": "Get comments of a ticket",
    "name": "GetComments",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Ticket Id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "-",
            "description": "<p>List of comments</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "-.id",
            "description": "<p>Id of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.text",
            "description": "<p>Text of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "-.createdAt",
            "description": "<p>DateTime when comment was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "-.updatedAt",
            "description": "<p>DateTime when comment was updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "comments found:",
          "content": "HTTP/1.1 200 OK\n[\n     {\n         \"id\": 1,\n         \"text\": \"blabla1\",\n         \"createdAt\": \"2021-08-06T13:13:10.682Z\",\n         \"updatedAt\": null\n     },\n     {\n         \"id\": 2,\n         \"text\": \"blabla1\",\n         \"createdAt\": \"2021-08-06T13:13:10.682Z\",\n         \"updatedAt\": \"2021-08-07T12:25:07.054Z\"\n     }\n]",
          "type": "json"
        },
        {
          "title": "no comments:",
          "content": "HTTP/1.1 200 OK\n[]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "ticket not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"ticket '5' not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/comments.js",
    "groupTitle": "Comments"
  },
  {
    "type": "put",
    "url": "/comment/:id",
    "title": "Update a comment",
    "name": "UpdateComment",
    "group": "Comments",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Comment Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "comment updated:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"text\": \"blabla1\",\n    \"createdAt\": \"2021-08-06T13:13:10.682Z\",\n    \"updatedAt\": \"2021-08-07T10:11:12.064Z\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text of the comment</p>"
          },
          {
            "group": "Success 200",
            "type": "DateTime",
            "optional": false,
            "field": "createdAt",
            "description": "<p>DateTime when comment was created</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>DateTime when comment was updated</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "comment not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"comment '5' not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/comments.js",
    "groupTitle": "Comments"
  },
  {
    "type": "post",
    "url": "/ticket/:id",
    "title": "Add a ticket",
    "name": "AddTicket",
    "group": "Tickets",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Ticket title</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Ticket description</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Ticket status</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "ticket added:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"title\": \"ticket title\",\n    \"description\": \"ticket desc\",\n    \"status\": \"wip\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the ticket (todo, wip, done)</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/tickets.js",
    "groupTitle": "Tickets"
  },
  {
    "type": "get",
    "url": "/ticket/:id",
    "title": "Get a ticket",
    "name": "GetTicket",
    "group": "Tickets",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Ticket Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "ticket found:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"title\": \"ticket title\",\n    \"description\": \"ticket desc\",\n    \"status\": \"wip\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the ticket (todo, wip, done)</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "ticket not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"ticket '5' not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/tickets.js",
    "groupTitle": "Tickets"
  },
  {
    "type": "put",
    "url": "/ticket/:id",
    "title": "Update a ticket",
    "name": "UpdateTicket",
    "group": "Tickets",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Ticket Id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "ticket updated:",
          "content": "HTTP/1.1 200 OK\n{\n    \"id\": 1,\n    \"title\": \"ticket title\",\n    \"description\": \"ticket desc\",\n    \"status\": \"wip\"\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description of the ticket</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Status of the ticket (todo, wip, done)</p>"
          }
        ]
      }
    },
    "error": {
      "examples": [
        {
          "title": "ticket not found:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"ticket '5' not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/routes/tickets.js",
    "groupTitle": "Tickets"
  }
] });
