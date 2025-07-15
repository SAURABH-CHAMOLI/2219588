export async function Log(stack, level, pkg, msg) {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzYXVyYWJoY2hhbW9saS4yMjAxMTE4NjZAZ2VodS5hYy5pbiIsImV4cCI6MTc1MjU1OTQwNiwiaWF0IjoxNzUyNTU4NTA2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMjRjNzMxYmQtMzU0MS00ZjU4LWE4N2EtYjgzNmM1YjVhOWFkIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2F1cmFiaCBjaGFtb2xpIiwic3ViIjoiZTY4NzM0ZGQtM2ZkYS00MmI5LWI2Y2QtY2Y1MTkyZGMyNDM4In0sImVtYWlsIjoic2F1cmFiaGNoYW1vbGkuMjIwMTExODY2QGdlaHUuYWMuaW4iLCJuYW1lIjoic2F1cmFiaCBjaGFtb2xpIiwicm9sbE5vIjoiMjIxOTU4OCIsImFjY2Vzc0NvZGUiOiJRQWhEVXIiLCJjbGllbnRJRCI6ImU2ODczNGRkLTNmZGEtNDJiOS1iNmNkLWNmNTE5MmRjMjQzOCIsImNsaWVudFNlY3JldCI6IldmbnFWWERkemd3dUd5WnEifQ.D__4HzRfVcBkmMeXv2ZRn8IZVAuZH5Eik_jFcRV6d0E  `
      },
      body: JSON.stringify({ stack, level, package: pkg, message: msg })
    });

    console.log(`${level.toUpperCase()} - ${pkg}: ${msg}`);
  } catch (e) {
    console.error("Log failed:", e.message);
  }
}
