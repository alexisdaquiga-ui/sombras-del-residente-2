// Lógica principal y reutilizable de la plantilla universal
function ejecutarAccionPrincipal() {
  const subtitle = document.getElementById('app-subtitle');
  subtitle.innerText = "¡Sistema operando al 100% y conectado!";
  subtitle.style.color = "#4ade80";
  
  console.log("Acción ejecutada correctamente desde el núcleo de la app.");
}
