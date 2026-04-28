const token = "e8e28909-6ba4-4f64-8ce4-e301adfd7a85";

async function actualizar() {
  try {
    const res = await fetch("https://api.tago.io/data?variable=Distance&qty=1", {
      headers: { "Device-Token": token }
    });

    const data = await res.json();

    if (!data.result || data.result.length === 0) return;

    let d = parseFloat(data.result[0].value);
    if (isNaN(d)) d = 0;

    // TEXTO
    document.getElementById("dist").innerText = d.toFixed(1) + " cm";

    // SEMÁFORO
    let rojo = document.getElementById("rojo");
    let amarillo = document.getElementById("amarillo");
    let verde = document.getElementById("verde");

    rojo.style.background = "#333";
    amarillo.style.background = "#333";
    verde.style.background = "#333";

    // BARRA
    let barra = document.getElementById("nivel");
    let porcentaje = Math.min((d / 50) * 100, 100);
    barra.style.width = porcentaje + "%";

    // LÓGICA GENERAL
    if (d <= 5) {
      rojo.style.background = "red";
      barra.style.background = "red";
      document.body.style.background = "#3b0a0a";
    } 
    else if (d <= 20) {
      amarillo.style.background = "orange";
      barra.style.background = "orange";
      document.body.style.background = "#3b2a0a";
    } 
    else {
      verde.style.background = "lime";
      barra.style.background = "lime";
      document.body.style.background = "#0a3b1a";
    }

  } catch (e) {
    console.log("Error:", e);
  }
}

setInterval(actualizar, 1000);
