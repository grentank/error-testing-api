# Error Testing API

A simple API designed for testing erroneous backend requests. With this API, you can send
a parameterized request to the endpoint and receive a response with the specified HTTP
status code.

## Features

- Returns a response with the specified HTTP status code.
- Supported status codes: **400 - 599** (negative statuses only).
- Supports all HTTP methods.
- If a request body is provided (for non-GET methods), the API echoes it back.
- For GET requests, the API echoes the query parameters.
- If no body or query parameters are provided, the API returns the status text associated
  with the status code.

---

## Endpoints

### `GET/POST/PUT/DELETE/PATCH https://test-error.com/api/status/:statusCode`

#### Parameters

- `statusCode` (required): The HTTP status code (must be an integer between 400 and 599).

#### Request

- **Headers**: No special headers are required.
- **Body** (optional):
  - For non-GET methods: If provided, the API will return the same body in the response.
  - For GET methods: The API will return the query parameters in the response.

#### Response

- **Status Code**: As specified in the `:statusCode` parameter.
- **Body**:
  - Echoes the provided request body (for non-GET methods) or query parameters (for GET).
  - If no body or query parameters are provided, returns the HTTP status text
    corresponding to the status code.

---

### Examples

#### 1. GET request with query parameters

```bash
curl -X GET "https://test-error.com/api/status/404?reason=not_found"
```

**Response:**

```
Status: 404 Not Found
Body: {"reason": "not_found"}
```

#### 2. POST request with a JSON body

```bash
curl -X POST https://test-error.com/api/status/500 \
  -H "Content-Type: application/json" \
  -d '{"error": "Something went wrong"}'
```

**Response:**

```
Status: 500 Internal Server Error
Body: {"error": "Something went wrong"}
```

#### 3. PUT request without a body

```bash
curl -X PUT https://test-error.com/api/status/403
```

**Response:**

```
Status: 403 Forbidden
Body: Forbidden
```

---

## Local Setup

To run the API locally:

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system
- [npm](https://www.npmjs.com/) for managing dependencies

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/grentank/error-testing-api.git
   cd error-testing-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your
environment).

### Testing Locally

Use tools like [Postman](https://www.postman.com/) or `curl` to send requests to your
local server:

```bash
curl -X GET http://localhost:3000/api/status/401
```

**Response:**

```
Status: 401 Unauthorized
Body: "Unauthorized"
```

---

## Docker Setup

You can also run the API using Docker. By default, the container exposes port `3000`. To
use a different port, follow the instructions below:

### Steps

1. Build the Docker image:

   ```bash
   docker build -t error-testing-api .
   ```

2. Run the container, specifying your desired port:

   ```bash
   docker run -d -p <your-port>:3000 --name error-testing-api error-testing-api
   ```

   Replace `<your-port>` with the port you want to use (e.g., `8080`).

3. Verify the container is running:

   ```bash
   docker ps
   ```

4. Test the API:
   ```bash
   curl -X GET http://localhost:<your-port>/api/status/400
   ```

### Stopping the Container

To stop the container, run:

```bash
docker stop error-testing-api
```

To remove the container:

```bash
docker rm error-testing-api
```

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
