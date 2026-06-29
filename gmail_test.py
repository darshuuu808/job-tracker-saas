import smtplib

EMAIL = "darshan160406@gmail.com"
APP_PASSWORD = "iugkhtkumgwnwzod"

with smtplib.SMTP("smtp.gmail.com", 587) as server:
    server.starttls()
    server.login(EMAIL, APP_PASSWORD)
    print("Login successful!")