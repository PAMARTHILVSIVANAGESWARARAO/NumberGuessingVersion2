# import google.generativeai as genai
# from config import Config

# class AIService:
#     def __init__(self):
#         if Config.GEMINI_API_KEY:
#             genai.configure(api_key=Config.GEMINI_API_KEY)
#             self.model = genai.GenerativeModel('gemini-2.0-flash')
#         else:
#             self.model = None
    
#     def generate_hint(self, last_guess, clues, attempts):
#         if not self.model:
#             return self._fallback_hint(clues, attempts)
        
#         try:
#             prompt = f"""You are a fun and encouraging game assistant for a number guessing game.
            
# Player's last guess: {last_guess}
# Current clues: {clues}
# Number of attempts so far: {attempts}

# Generate a short, fun, and motivational hint (2-3 sentences max) that:
# 1. Encourages the player
# 2. Makes a playful comment about their guess
# 3. Gives a creative hint based on the clues
# 4. Includes an emoji

# Be creative and fun! Don't reveal the answer."""

#             response = self.model.generate_content(prompt)
#             return response.text.strip()
        
#         except Exception as e:
#             return self._fallback_hint(clues, attempts)
    
#     def _fallback_hint(self, clues, attempts):
#         temperature = clues.get('temperature', 'cold')
#         direction = clues.get('direction', 'higher')
        
#         if temperature == 'hot':
#             return f"🔥 You're on fire! Just a tiny bit {direction}! Keep going!"
#         elif temperature == 'warm':
#             return f"☀️ Getting warmer! Try going {direction}. You're close!"
#         else:
#             return f"❄️ Bit cold there! Go {direction} - you can do this!"

import google.generativeai as genai
from config import Config

class AIService:
    def __init__(self):
        if Config.GEMINI_API_KEY:
            genai.configure(api_key=Config.GEMINI_API_KEY)
            self.model = genai.GenerativeModel("gemini-2.0-flash")
        else:
            self.model = None

    def generate_hint(self, last_guess, clues, attempts):
        if not self.model:
            return self._fallback_hint(clues, attempts)

        try:
            text_prompt = (
                "You are a fun and motivating assistant for a number guessing game.\n\n"
                f"Player's last guess: {last_guess}\n"
                f"Clues: {clues}\n"
                f"Attempts so far: {attempts}\n\n"
                "Generate a short, fun, motivational hint (max 2–3 sentences). "
                "Use emojis and be playful. "
                "Do NOT reveal the number."
            )

            payload = {
                "contents": [
                    {
                        "parts": [
                            {"text": text_prompt}
                        ]
                    }
                ]
            }

            response = self.model.generate_content(payload)

            if hasattr(response, "text") and response.text:
                return response.text.strip()
            else:
                return self._fallback_hint(clues, attempts)

        except Exception:
            return self._fallback_hint(clues, attempts)

    def _fallback_hint(self, clues, attempts):
        temperature = clues.get("temperature", "cold")
        direction = clues.get("direction", "higher")

        if temperature == "hot":
            return f"🔥 You're really close! Go slightly {direction}!"
        elif temperature == "warm":
            return f"☀️ Warming up! Try going {direction}!"
        else:
            return f"❄️ Cold guess! Try going {direction}!"
