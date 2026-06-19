def test_register(client):
    res = client.post("/auth/register", json={"email": "test@test.com", "password": "secret123"})
    assert res.status_code == 201
    assert res.json()["email"] == "test@test.com"
    assert "hashed_password" not in res.json()

def test_register_duplicate_email(client):
    client.post("/auth/register", json={"email": "test@test.com", "password": "secret123"})
    res = client.post("/auth/register", json={"email": "test@test.com", "password": "secret123"})
    assert res.status_code == 400

def test_login_success(client):
    client.post("/auth/register", json={"email": "test@test.com", "password": "secret123"})
    res = client.post("/auth/login", data={"username": "test@test.com", "password": "secret123"})
    assert res.status_code == 200
    assert "access_token" in res.json()

def test_login_wrong_password(client):
    client.post("/auth/register", json={"email": "test@test.com", "password": "secret123"})
    res = client.post("/auth/login", data={"username": "test@test.com", "password": "wrong"})
    assert res.status_code == 401

def test_protected_route_without_token(client):
    res = client.get("/applications/")
    assert res.status_code == 401
