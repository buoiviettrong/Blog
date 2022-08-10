// Ham tra du lieu that su 

const resolvers = {
    Query: {
        posts: () => [{
                id: 1,
                title: "Post 1",
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            },
            {
                id: 2,
                title: "Post 2",
                content: "Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            }
        ],
        users: () => [{
                id: 1,
                fullName: "John Doe",
                avatar: "http://www.example.com/avatar/john",
                email: "john.doe@example.com",
            },
            {
                id: 2,
                fullName: "Jane Doe",
                avatar: "http://www.example.com/avatar/jane",
                email: "jane.doe@example.com",
            },
            {
                id: 3,
                fullName: "Doe Smith",
                avatar: "http://www.example.com/avatar/doe",
                email: "doe.smith@example.com",
            }
        ]
    }
}

module.exports = resolvers