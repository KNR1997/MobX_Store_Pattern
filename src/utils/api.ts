export const api = {
  async get(path: string) {
    const res = await fetch(`http://127.0.0.1:8000/api${path}`);
    return res.json();
  },

  async post(path: string, body: any) {
    const res = await fetch(path, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  },

  async delete(path: string) {
    await fetch(path, { method: "DELETE" });
  },
};
