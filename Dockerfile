# ---------- Builder Stage ----------

FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir --user -r requirements.txt


# ---------- Runtime Stage ----------

FROM python:3.11-slim

WORKDIR /app

ENV PATH=/root/.local/bin:$PATH

COPY --from=builder /root/.local /root/.local

COPY . .

EXPOSE 5000

CMD ["sh", "-c", "flask db upgrade && python app.py"]