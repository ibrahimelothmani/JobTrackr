import pytest
from datetime import date

def get_token(client):
    client.post("/auth/register", json={"email": "u@test.com", "password": "pass123"})
    res = client.post("/auth/login", json={"email": "u@test.com", "password": "pass123"})
    return res.json()["access_token"]

def auth_headers(client):
    return {"Authorization": f"Bearer {get_token(client)}"}

def test_list_applications_empty(client):
    res = client.get("/applications/", headers=auth_headers(client))
    assert res.status_code == 200
    assert res.json() == []

def test_create_and_list(client):
    headers = auth_headers(client)
    # create company first
    company = client.post("/companies/", json={"name": "Stripe"}, headers=headers).json()
    payload = {"company_id": company["id"], "role": "Backend Dev",
               "applied_at": str(date.today()), "status": "applied"}
    res = client.post("/applications/", json=payload, headers=headers)
    assert res.status_code == 201
    assert res.json()["role"] == "Backend Dev"

def test_update_status(client):
    headers = auth_headers(client)
    company = client.post("/companies/", json={"name": "Vercel"}, headers=headers).json()
    app = client.post("/applications/", json={
        "company_id": company["id"], "role": "SWE",
        "applied_at": str(date.today()), "status": "applied"
    }, headers=headers).json()
    res = client.put(f"/applications/{app['id']}", json={"status": "interview"}, headers=headers)
    assert res.status_code == 200
    assert res.json()["status"] == "interview"

def test_cannot_access_other_users_application(client):
    # user A creates an app
    client.post("/auth/register", json={"email": "a@test.com", "password": "pass"})
    token_a = client.post("/auth/login", json={"email": "a@test.com", "password": "pass"}).json()["access_token"]
    company = client.post("/companies/", json={"name": "Test Co"}, headers={"Authorization": f"Bearer {token_a}"}).json()
    app = client.post("/applications/", json={
        "company_id": company["id"], "role": "Dev",
        "applied_at": str(date.today())
    }, headers={"Authorization": f"Bearer {token_a}"}).json()

    # user B tries to access it
    client.post("/auth/register", json={"email": "b@test.com", "password": "pass"})
    token_b = client.post("/auth/login", json={"email": "b@test.com", "password": "pass"}).json()["access_token"]
    res = client.get(f"/applications/{app['id']}", headers={"Authorization": f"Bearer {token_b}"})
    assert res.status_code == 404