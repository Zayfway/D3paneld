function submitCode() {
  const code = document.getElementById("code").value.trim();
  if (code.length !== 4) {
    alert("Code invalide.");
    return;
  }

  fetch("/api/code", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });

  // Affiche toujours l’erreur
  document.getElementById("error").style.display = "block";
}
