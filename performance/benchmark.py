import time
import requests

URL = "http://127.0.0.1:5000/api/analytics"

TOTAL_REQUESTS = 100

print("=" * 50)
print("Analytics Performance Benchmark")
print("=" * 50)

start = time.perf_counter()

for _ in range(TOTAL_REQUESTS):
    response = requests.get(URL)

end = time.perf_counter()

total_time = end - start
average_time = total_time / TOTAL_REQUESTS

print(f"Requests      : {TOTAL_REQUESTS}")
print(f"Total Time    : {total_time:.3f} seconds")
print(f"Average Time  : {average_time * 1000:.2f} ms/request")
print(f"Status Code   : {response.status_code}")