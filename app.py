import requests
import numpy as np
import tkinter as tk
from tkinter import ttk
import matplotlib.pyplot as plt
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

# API Configuration
load_dotenv()  # Load .env variables
API_KEY = os.getenv("OPENWEATHER_API_KEY")
BASE_URL = "http://api.openweathermap.org/data/2.5/forecast"

def fetch_weather_data(city):
    params = {"q": city, "appid": API_KEY, "units": "metric"}
    response = requests.get(BASE_URL, params=params)
    data = response.json()
    
    if "list" not in data:
        return None
    
    weather_states = [entry["weather"][0]["main"] for entry in data["list"]]
    temperatures = [entry["main"]["temp"] for entry in data["list"]]
    timestamps = [entry["dt_txt"] for entry in data["list"]]
    return weather_states, temperatures, timestamps

def build_transition_matrix(weather_states):
    unique_states = list(set(weather_states))
    n = len(unique_states)
    transition_matrix = np.zeros((n, n))
    state_index = {state: i for i, state in enumerate(unique_states)}
    
    for i in range(len(weather_states) - 1):
        current_state = weather_states[i]
        next_state = weather_states[i + 1]
        transition_matrix[state_index[current_state]][state_index[next_state]] += 1
    
    for i in range(n):
        row_sum = np.sum(transition_matrix[i])
        if row_sum > 0:
            transition_matrix[i] /= row_sum
    
    return transition_matrix, unique_states

def simulate_weather(transition_matrix, states, days=7):
    state = np.random.choice(states)
    simulation = [state]
    state_index = {state: i for i, state in enumerate(states)}
    
    for _ in range(days - 1):
        current_index = state_index[state]
        next_state = np.random.choice(states, p=transition_matrix[current_index])
        simulation.append(next_state)
        state = next_state
    
    return simulation

def plot_temperature_data(temperatures, timestamps):
    fig, ax = plt.subplots(figsize=(6, 3))
    ax.plot(timestamps, temperatures, marker='o', linestyle='-', color='b')
    ax.set_xticklabels(timestamps, rotation=45, ha='right', fontsize=8)
    ax.set_ylabel("Temperature (°C)")
    ax.set_title("Historical Temperature Data")
    ax.grid()
    return fig

def run_simulation():
    city = city_entry.get()
    weather_data = fetch_weather_data(city)
    
    if weather_data:
        weather_states, temperatures, timestamps = weather_data
        transition_matrix, states = build_transition_matrix(weather_states)
        forecast = simulate_weather(transition_matrix, states, days=int(days_entry.get()))
        result_label.config(text=" -> ".join(forecast))
        
        fig = plot_temperature_data(temperatures, timestamps)
        canvas = FigureCanvasTkAgg(fig, master=frame)
        canvas.get_tk_widget().grid(row=3, column=0, columnspan=3, padx=5, pady=5)
        canvas.draw()
    else:
        result_label.config(text="Failed to fetch data")

root = tk.Tk()
root.title("Weather Simulator")

frame = ttk.Frame(root, padding=10)
frame.grid(row=0, column=0, sticky=(tk.W, tk.E))

city_label = ttk.Label(frame, text="Enter City:")
city_label.grid(row=0, column=0, padx=5, pady=5)

city_entry = ttk.Entry(frame, width=20)
city_entry.grid(row=0, column=1, padx=5, pady=5)

days_label = ttk.Label(frame, text="Days to Simulate:")
days_label.grid(row=1, column=0, padx=5, pady=5)

days_entry = ttk.Entry(frame, width=5)
days_entry.insert(0, "7")
days_entry.grid(row=1, column=1, padx=5, pady=5)

simulate_button = ttk.Button(frame, text="Simulate", command=run_simulation)
simulate_button.grid(row=1, column=2, padx=5, pady=5)

result_label = ttk.Label(frame, text="", wraplength=400)
result_label.grid(row=2, column=0, columnspan=3, padx=5, pady=5)

root.mainloop()
