# Proof of Concept for TypeScript + express, joi and pg

This repository intends to store a proof of concept of using TypeScript with other libraries (express, joi and pg) in order to learn and use in a webservice project.

It is a webservice API for storing MCQ (Multiple-Choice Question) and contains six routes which follows detailed.

**POST /questions**
````
Body: {
    "name": string,
    "stem": string,
    "topicId": number,
    "alternatives": [
        {
            "content": string,
            "correct": boolean
        },
        ...
    ]
}
````
It must contais exactly one true alternative and at least one false alternative.

**GET /questions**
````
Response: [
    {
        "id": number,
        "name": string,
        "stem": string,
        "topic": string,
        "subject": string,
        "alternatives": [
            {
                "content": string,
                "correct": boolean
            },
            ...
        ]
    },
    ...
]
````

**GET /questions/topic/:topic_id**
````
Response: [
    {
        "id": number,
        "name": string,
        "stem": string,
        "topic": string,
        "subject": string,
        "alternatives": [
            {
                "content": string,
                "correct": boolean
            },
            ...
        ]
    },
    ...
]
````

**PUT /questions/**
````
Body: {
    "id": number,
    "name": string,
    "stem": string,
    "topicId": number
}
````
All fields are required.

**DELETE /questions/id/:question_id**

Delete the specified question and its alternatives.

**GET /topics**
````
Response: [
    {
        "id": number,
        "name": string,
        "subject": {
            "id": number,
            "name": string
    },
    ...
]
````