function sendRequest() {
  const phone = document.getElementById("phone").value.trim();
  const pseudo = document.getElementById("pseudo").value.trim();
  if (phone.length < 10 || !pseudo) {
    alert("Remplissez correctement les champs.");
    return;
  }

  fetch("/api/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, pseudo })
  }).then(() => {
    window.location.href = "/code.html";
  });
}
