# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose port 5000 for the Flask app
EXPOSE 5000

# Use Gunicorn to serve the Flask app (assuming your app is defined in app.py and the Flask instance is named 'app')
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
