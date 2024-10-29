# Vertex Homes (Work In Progess)

## Description

This project is a REST API that provides features for users (agents, buyers) to buy and sell properties. With tis API users can ciew property listings, bookmark listings they are interested in and also like property listings. They can also schedule visits with agents to their preferred property listings. Agents are able to list their properties with sufficient details about them. They can also update or delete properties they have listed. 
The API documentation will provide you with an intutive interface to interact with the api before integrating in your project

## System Architecture

## ER Diagram

![Real Estate App ](https://github.com/user-attachments/assets/7af8cf8d-d1af-42e2-b216-5b346f35e98a)

See the [full database specification](https://dbdiagram.io/d/Real-Estate-App-6692577f9939893daed4322c) for details on tables and relationships.

## Features

- User authentication and Authorization (login, register, password reset)
- Add, update, and delete property listings
- Bookmark and like listings
- Review system for agents
- Schedule property viewings
- Search and filter listings based on user preferences

## Tech Stack

- Language: Nodejs
- Framework: Express
- Database: PostgreSql

## Authentication

Authentication is required for most endpoints in the API. To authenticate, include an access token in the Authorization header of your request. The access token can be obtained by logging in to your account or registering a new account.

 
## Usage
Once the app is running, navigate to `http://localhost:3000` (or your specified port) to access the application.

## Contributing
Contributions are welcome. If you'd like to contribute to the project, please feel free to submit a pull request or open an issue.

## License
This project is licensed under the MIT License.
