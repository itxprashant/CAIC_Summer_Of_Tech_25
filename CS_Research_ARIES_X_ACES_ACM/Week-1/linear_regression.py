import numpy as np
import pandas as pd


def forward_pass(X, weights):
    return np.dot(X, weights.T)

def backward_pass(X, y, weights):
    predictions = forward_pass(X, weights.T)
    errors = predictions - y.reshape(-1, 1)
    gradients = np.dot(errors.T, X) / len(y)
    return gradients

def newtons_method(X, y, lambda_=0.01, max_iter=100, tolerance=1e-6, learning_rate=0.1):
    # Initialize parameters (theta)
    theta = np.zeros(X.shape[1])

    for _ in range(max_iter):
        predictions = X.dot(theta)

        # Gradient (first derivative of loss) with regularization
        gradient = -2 * X.T.dot(y - predictions) / len(y) + 2 * lambda_ * theta
        
        # Hessian (second derivative of loss) with regularization
        hessian = 2 * X.T.dot(X) / len(y) + 2 * lambda_ * np.eye(X.shape[1])
        
        # Update rule with learning rate
        theta_new = theta - learning_rate * np.linalg.inv(hessian).dot(gradient)
        
        # Check for convergence
        if np.linalg.norm(theta_new - theta) < tolerance:
            break
        theta = theta_new
        
    return theta

def update_weights(weights, gradients, learning_rate=0.01):
    return weights - learning_rate * gradients

def linearRegression(X: np.array, Y: np.array, lr: float, lambda_: float):
    n_samples, n_features = X.shape
    # weights = np.zeros((n_features, 1))
    weights = np.random.rand(n_features, 1)  # Initialize weights randomly

    weights = newtons_method(X, Y, max_iter=100, tolerance=1e-6 , lambda_=lambda_, learning_rate=lr)

    return weights

# # Example usage:
# print(linearRegression(np.array([[1, 2], [3, 4], [5, 6]]), np.array([1, 2, 3]), 0.01, 0.1))


# # Evaluation of model on a random dataset

# def calculate_loss(weights, X, y):
#     predictions = np.dot(X, weights.T)
#     loss = np.mean((predictions - y.reshape(-1, 1)) ** 2)
#     return loss

# def create_training_data(n, d):
#     X = np.random.rand(n, d)
#     y = np.random.rand(n)
#     return X, y

# data = create_training_data(100, 10) # will be replaced by actual training


# def train_model(X, y, weights, iterations=100, learning_rate=0.01):
#     losses = []
#     for i in range(iterations):
#         gradients = backward_pass(X, y, weights)
#         weights = update_weights(weights, gradients, learning_rate)
#         loss = calculate_loss(weights, X, y)
#         losses.append(loss)
#         if i % 10 == 0:
#             print(f"Iteration {i}, Loss: {loss}")
#     return weights, losses

# weights = np.random.rand(data[0].shape[1], 1)  # Initialize weights randomly

# # train the model
# trained_weights, losses = train_model(data[0], data[1], weights, iterations=100, learning_rate=0.01)
# # create a function to evaluate the model
# def evaluate_model(X, y, weights):
#     predictions = forward_pass(X, weights)
#     loss = calculate_loss(weights.T, X, y)
#     loss = np.mean(loss)
#     print(f"Evaluation Loss: {loss}")
#     return predictions


# # test the linearRegression function
# lr = 0.01
# lambda_ = 0.1 # regularization parameter
# trained_weights = linearRegression(data[0], data[1], lr, lambda_)
# # evaluate the model
# predictions = evaluate_model(data[0], data[1], trained_weights)
# # print the predictions
# print("Predictions:")
# print(predictions)