class ClueService:
    @staticmethod
    def generate_clues(guess, secret_number):
        clues = {}
        
        difference = abs(guess - secret_number)
        
        if guess < secret_number:
            clues['direction'] = 'higher'
        elif guess > secret_number:
            clues['direction'] = 'lower'
        else:
            clues['direction'] = 'correct'
        
        if difference <= 5:
            clues['temperature'] = 'hot'
        elif difference <= 15:
            clues['temperature'] = 'warm'
        else:
            clues['temperature'] = 'cold'
        
        clues['parity'] = 'even' if secret_number % 2 == 0 else 'odd'
        
        secret_tens = secret_number // 10
        clues['digit_range'] = f"{secret_tens}0-{secret_tens}9"
        
        clues['difference'] = difference
        
        return clues
    
    @staticmethod
    def format_clue_message(clues):
        if clues['direction'] == 'correct':
            return "🎉 Correct! You found the number!"
        
        messages = []
        
        if clues['direction'] == 'higher':
            messages.append("📈 Go higher!")
        else:
            messages.append("📉 Go lower!")
        
        temp_emoji = {
            'hot': '🔥',
            'warm': '☀️',
            'cold': '❄️'
        }
        messages.append(f"{temp_emoji[clues['temperature']]} You're {clues['temperature']}!")
        
        messages.append(f"🎲 The number is {clues['parity']}")
        messages.append(f"📍 Range: {clues['digit_range']}")
        
        return ' | '.join(messages)