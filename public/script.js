const API = "/.netlify/functions/notes";

async function loadNotes() {
  const res = await fetch(API);
  const notes = await res.json();
  document.getElementById("list").innerHTML =
    notes.map(n => `<li>${n.text}</li>`).join("");
}

document.getElementById("addBtn").onclick = async () => {
  const text = document.getElementById("noteInput").value;
  await fetch(API, { method: "POST", body: JSON.stringify({ text }) });
  document.getElementById("noteInput").value = "";
  loadNotes();
};

loadNotes();
