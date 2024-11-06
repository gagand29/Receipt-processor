# Receipt Processor

A web service built with Node.js and Express to process receipts and calculate points based on specific rules. This project is part of a take-home exercise for the Backend Engineer role at Fetch.

Presentation: [Receipt Processor Presentation](https://pitch.com/v/receipt-processor--gagan-doddanna---fetch-iakzji) 

---

## Table of Contents
1. [Project Description](#project-description)
2. [API Endpoints](#api-endpoints)
3. [Business Logic](#business-logic)
4. [Tech Stack](#tech-stack)
5. [Setup & Installation](#setup--installation)
6. [Running the Application](#running-the-application)
7. [Testing the API](#testing-the-api)
8. [Future Enhancements](#future-enhancements)
9. [About Me](#about-me)

---

## Project Description

The Receipt Processor API takes in receipt data, calculates points based on predefined rules, and returns a unique ID for the receipt. It provides an additional endpoint to retrieve the points associated with the receipt using the generated ID. All data is stored in memory, and no database is required.

This project also includes a Docker setup for easy execution and testing.

---

## API Endpoints

### 1. **Process Receipts**
- **Path**: `/receipts/process`
- **Method**: `POST`
- **Payload**: Receipt JSON
- **Response**: JSON containing a unique ID for the receipt
- **Description**: Accepts a receipt JSON, calculates points based on business rules, and returns a unique ID.
- **Example Request**:
  ```json
  {
    "retailer": "Walmart",
    "purchaseDate": "2024-11-01",
    "purchaseTime": "13:45",
    "items": [
      { "shortDescription": "Milk", "price": "2.99" },
      { "shortDescription": "Bread", "price": "1.99" }
    ],
    "total": "4.98"
  }
  ```
- **Example Response**:
  ```json
  { "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
  ```

### 2. **Get Points**
- **Path**: `/receipts/{id}/points`
- **Method**: `GET`
- **Response**: JSON containing the number of points awarded
- **Description**: Retrieves the points for a given receipt ID.
- **Example Response**:
  ```json
  { "points": 32 }
  ```

---

## Business Logic

Points are calculated using the following rules:
1. **Retailer Name**: 1 point for each alphanumeric character.
2. **Round Dollar Amount**: 50 points if the total is a whole number.
3. **Multiple of 0.25**: 25 points if the total is a multiple of 0.25.
4. **Item Pairs**: 5 points for every two items.
5. **Description Length**: If an item's description length is a multiple of 3, multiply the item's price by 0.2 and round up.
6. **Odd Day**: 6 points if the purchase day is odd.
7. **Purchase Time**: 10 points if the time is between 2:00 PM and 4:00 PM.

---

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **Docker**: Containerization
- **In-Memory Storage**: For temporary data storage

---

## Setup & Installation

### Prerequisites
- Node.js installed on your system
- Docker (for containerized setup)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/receipt-processor.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd receipt-processor
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

---

## Running the Application

### Using Node.js
1. **Start the server**:
   ```bash
   npm start
   ```
2. The server will run on `http://localhost:3000`.

### Using Docker
1. **Build the Docker image**:
   ```bash
   docker build -t receipt-processor .
   ```
2. **Run the Docker container**:
   ```bash
   docker run -p 7890:3000 receipt-processor
   ```
3. The application will be accessible at `http://localhost:7890`.

---

## Testing the API

1. Use a tool like **Insomnia** or **Postman** to test the endpoints.
2. **POST** to `/receipts/process` with a valid receipt JSON.
3. **GET** from `/receipts/{id}/points` to retrieve the awarded points.

---

## Future Enhancements

- **Persistent Storage**: Integrate with a database like MongoDB or PostgreSQL for data persistence.
- **Enhanced Error Handling**: More robust validation and error handling mechanisms.
- **Performance Improvements**: Optimize the service for larger datasets.

---

## About Me

**Gagan Doddanna**  
- LinkedIn: [Gagan Doddanna](https://www.linkedin.com/in/gagan-doddanna-326988135)  
- Presentation: [Receipt Processor Presentation](https://pitch.com/v/receipt-processor--gagan-doddanna---fetch-iakzji)  
- Email: Gagandoddanna@gmail.com  

Thank you for reviewing this project. If you have any questions or need further clarification, please feel free to reach out!