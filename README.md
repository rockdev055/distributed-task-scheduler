# Design Document: Distributed Task Scheduler

## Table of Contents

1. [Introduction](#introduction)
2. [System Architecture](#system-architecture)
3. [Components](#components)
4. [API Design](#api-design)
5. [Data Flow](#data-flow)
6. [High Availability and Scalability](#high-availability-and-scalability)
7. [Cost-Effectiveness](#cost-effectiveness)
8. [Deployment](#deployment)
9. [Conclusion](#conclusion)

## Introduction

The Distributed Task Scheduler is designed to allow clients to register tasks and specify their execution time. Tasks can be one-time or recurring. The system ensures tasks are executed within 10 seconds of their scheduled time. This document details the design decisions, components, services, and communications within the system, as well as considerations for scalability and cost-effectiveness.

## System Architecture

### Overview

The system is composed of a frontend, backend, and a task management service. The frontend is built using React with Redux for state management and styled-components for responsive UI design. The backend is an Express.js application written in TypeScript, which handles API requests and task management. Docker is used to containerize the frontend and backend for easy deployment and scalability.

### Diagram

## Architecture Diagram

### Frontend

- **React**: Used for building the user interface.
- **Redux**: State management for handling tasks and logs.
- **Axios**: HTTP client for making API requests to the backend.
- **Styled-components**: For responsive and maintainable styling.

### Backend

- **Express.js**: Handles HTTP requests and routing.
- **TypeScript**: Ensures type safety and better maintainability.
- **Task Manager**: Manages the scheduling, updating, and deleting of tasks.

### Docker

- **Docker**: Containerizes the frontend and backend for consistent deployment.
- **Docker Compose**: Orchestrates multi-container Docker applications.

## API Design

### Endpoints

1. **POST /tasks**: Register a new task.
   - Request Body:
     ```json
     {
       "description": "string",
       "time": "string (ISO 8601 format)",
       "recurring": "boolean"
     }
     ```
   - Response Body:
     ```json
     {
       "id": "string",
       "description": "string",
       "time": "string",
       "recurring": "boolean"
     }
     ```

2. **GET /tasks**: Retrieve all scheduled tasks.
   - Response Body:
     ```json
     [
       {
         "id": "string",
         "description": "string",
         "time": "string",
         "recurring": "boolean"
       },
       ...
     ]
     ```

3. **GET /tasks/logs**: Retrieve execution logs.
   - Response Body:
     ```json
     [
       "string",
       ...
     ]
     ```

4. **PUT /tasks/:id**: Update an existing task.
   - Request Body:
     ```json
     {
       "description": "string",
       "time": "string",
       "recurring": "boolean"
     }
     ```
   - Response Body:
     ```json
     {
       "id": "string",
       "description": "string",
       "time": "string",
       "recurring": "boolean"
     }
     ```

5. **DELETE /tasks/:id**: Delete a task.
   - Response: 204 No Content

## Data Flow

1. **Task Creation**:
   - User submits a new task via the frontend form.
   - Redux dispatches an action to add the task.
   - Axios sends a POST request to the backend.
   - Backend stores the task and schedules it for execution.
   - Task is displayed in the frontend task list.

2. **Task Execution**:
   - Backend monitors task schedules.
   - When a task's time is reached, it is executed and logged.
   - Log is updated in the frontend log list.

3. **Task Updating**:
   - User updates a task via the frontend.
   - Redux dispatches an action to update the task.
   - Axios sends a PUT request to the backend.
   - Backend updates the task and reschedules if necessary.
   - Updated task is reflected in the frontend task list.

4. **Task Deletion**:
   - User deletes a task via the frontend.
   - Redux dispatches an action to delete the task.
   - Axios sends a DELETE request to the backend.
   - Backend removes the task.
   - Task is removed from the frontend task list.

## High Availability and Scalability

### High Availability

- **Stateless Services**: Both frontend and backend services are stateless and can be replicated easily.
- **Containerization**: Docker ensures that each service is isolated and can be redeployed without affecting others.

### Scalability

- **Horizontal Scaling**: Multiple instances of the frontend and backend can be deployed behind a load balancer.
- **Task Scheduling**: The task manager can be enhanced to distribute tasks across multiple instances.

### Chokepoints

- **Database**: If the task data storage were to use a database, it could become a bottleneck under high load. Proper indexing and sharding can mitigate this.
- **Task Execution**: The current implementation uses in-memory storage, which limits scalability. A distributed queue system can be introduced for better scalability.

## Cost-Effectiveness

### Containerization

- **Efficient Resource Utilization**: Docker ensures resources are used efficiently by isolating services.
- **Scalable Deployment**: Easily scale services up or down based on demand, reducing unnecessary costs.

### Open Source Technologies

- **No Licensing Costs**: Using open source technologies like React, Redux, Express.js, and Docker eliminates licensing costs.

## Deployment

### Local Development

1. **Build and Run Containers**:
    ```sh
    docker-compose up --build
    ```

2. **Access the Application**:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:3001`

### Production Deployment

- **CI/CD Pipeline**: Set up a CI/CD pipeline to automate the building, testing, and deployment of the Docker containers.
- **Cloud Deployment**: Deploy the Docker containers to a cloud provider (e.g., AWS, GCP, Azure) using managed Kubernetes services.
