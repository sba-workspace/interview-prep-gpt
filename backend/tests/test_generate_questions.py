import requests

job_role = {
    "title": "Frontend Developer",
    "description": "Responsible for building UI using React",
    "skills": ["React", "JavaScript", "CSS"]
}

response = requests.post("http://localhost:8000/interviews/questions", json=job_role)

print("Status Code:", response.status_code)
print("Response JSON:")
print(response.json())

