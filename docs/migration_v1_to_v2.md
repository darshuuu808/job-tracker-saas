# Migration Guide

## API Versioning

Old API

```
/api/v1/applications
```

New API

```
/api/v2/applications
```

---

## Summary Response

v2 supports:

```
GET /api/v2/applications?format=summary
```

Example

```json
{
    "total": 37,
    "applications": [
        {
            "id": 1,
            "company": "Google",
            "status": "Applied"
        }
    ]
}
```

---

## Deprecation

API v1 now returns:

- Deprecation
- Sunset
- Link

Clients should migrate to v2 before the sunset date.