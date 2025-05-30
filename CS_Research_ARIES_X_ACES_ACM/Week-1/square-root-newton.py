import math

def func(x):
    return x**2 -3*x + 2

def func_prime(x):
    return 2*x - 3

def newton_method(iterations, initial_guess):
    x = initial_guess
    for i in range(iterations):
        x -= func(x) / func_prime(x)
    
    return x

print(newton_method(100, -4.0))