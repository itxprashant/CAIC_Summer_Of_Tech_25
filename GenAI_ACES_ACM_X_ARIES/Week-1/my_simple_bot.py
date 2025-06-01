import os
from google import genai
from dotenv import load_dotenv
from groq import Groq

def run_chat_agent(groq_api_key=None, gemini_api_key=None):
    """
    Simulates a chatbot agent using a while loop and LLM API calls.

    Your implementation should:
    - Continuously prompt the user for input.
    - Use either Groq or Gemini API to respond.
    - Allow the user to type 'exit' or 'quit' to end the conversation.

    Optional:
    - Add validation before making the API call.
    - Simulate multiple agents by calling different LLMs with distinct system prompts.
    - Route the user query through two agents (e.g., responder and critic).

    Hint:
    Use `input()` to capture user queries, and wrap your API calls inside functions like:
    `call_groq(prompt)` or `call_gemini(prompt, system_prompt=None)`
    """
    while True:
        user_input = input("You: ")
        if user_input.lower() in ['exit', 'quit']:
            print("Exiting chat. Goodbye!")
            break
        
        # Example of calling a Groq or Gemini API
        response = useGroqCritic(user_input, groq_api_key, gemini_api_key)
        
        print(f"Bot: {response}")

def getGeminiResponse(prompt, gemini_api_key):
    """
    Calls the Gemini API with the given prompt and returns the response.

    Args:
        promt (str): The input prompt for the Gemini API.

    Returns:
        str: The response from the Gemini API.
    """

    client = genai.Client(api_key=f"{gemini_api_key}")

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=f"{prompt}"
    )

    return response.text

def useGroqCritic(prompt, groq_api_key, gemini_api_key):
    """
    Calls the Groq API with the given prompt and returns the response.

    Args:
        promt (str): The input prompt for the Groq API.

    Returns:
        str: The response from the Groq API.
    """
    # Placeholder for Groq API call
    # Implement Groq API call logic here

    context = """
    You are a corrector agent that evaluates the response of the Gemini agent and provides a better response.
    Your task is to analyze the response and provide a better response.
    You should focus on the quality, relevance, and clarity of the response.
    Don't give any explanation, just provide the improved response.
    Remember, you are a responder agent, not a critic agent.
    """
    response = getGeminiResponse(prompt, gemini_api_key)
    
    client = Groq(
        api_key=f"{groq_api_key}"
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"{context}\n\nUser: {prompt}\n\nGemini Response: {response}\n\nCritic:",
            }
        ],
        model="llama3-8b-8192",
    )
    return chat_completion.choices[0].message.content


if __name__=="__main__":
    # api_key = input("Enter your Gemini API key: ")

    load_dotenv()
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    groq_api_key = os.getenv("GROQ_API_KEY")
    if not (gemini_api_key and groq_api_key):
        raise ValueError("API key is required. Set the GEMINI_API_KEY and GROQ_API_KEY environment variable.")

    run_chat_agent(groq_api_key, gemini_api_key)
    