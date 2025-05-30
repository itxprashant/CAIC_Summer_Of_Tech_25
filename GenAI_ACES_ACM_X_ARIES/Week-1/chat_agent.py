from google import genai

def run_chat_agent(api_key=None):
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
        response = getGeminiResponse(user_input, api_key)
        
        print(f"Bot: {response}")

def getGeminiResponse(prompt, api_key):
    """
    Calls the Gemini API with the given prompt and returns the response.

    Args:
        promt (str): The input prompt for the Gemini API.

    Returns:
        str: The response from the Gemini API.
    """

    client = genai.Client(api_key=f"{api_key}")

    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=f"{prompt}"
    )

    return response.text


if __name__=="__main__":
    api_key = input("Enter your Gemini API key: ")
    run_chat_agent(api_key)
    